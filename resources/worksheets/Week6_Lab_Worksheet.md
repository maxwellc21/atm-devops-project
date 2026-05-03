# 📘 Week 6 Lab Worksheet — Docker + GitLab CI/CD
## 🐳 Containerize and automate the ATM system

---

# 🎯 Objective

By the end of Week 6, you will:

- create Dockerfiles for every service
- create a docker-compose file
- run the full application in containers
- create a GitLab CI/CD pipeline
- build Docker images automatically
- push images to Docker Hub

---

# ✅ Success Criteria

You have successfully completed Week 6 if:

- all services build as Docker images
- `docker compose up --build` works
- the app runs through containers
- GitLab pipeline passes
- Docker images are ready to push or successfully pushed

---

# 🧠 Week 6 DevOps Flow

```text
Code Push
   ↓
Install
   ↓
Build
   ↓
Docker Build
   ↓
Docker Push
```

---

# 🟦 Task 1 — Create Dockerfiles

## Auth Service

### File: `auth-service/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["node", "src/app.js"]
```

---

## Account Service

### File: `account-service/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4002
CMD ["node", "src/app.js"]
```

---

## Transaction Service

### File: `transaction-service/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4003
CMD ["node", "src/app.js"]
```

---

## API Gateway

### File: `api-gateway/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "src/app.js"]
```

---

## Frontend

### File: `frontend/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

### ✔ Checkpoint
- [ ] Dockerfile created for every service

---

# 🟦 Task 2 — Create docker-compose

### File: `docker-compose.yml`

```yaml
services:
  mongodb:
    image: mongo:6
    container_name: mongodb
    ports:
      - "27017:27017"

  auth-service:
    build: ./auth-service
    container_name: auth-service
    ports:
      - "4001:4001"
    environment:
      - PORT=4001
      - MONGO_URI=mongodb://mongodb:27017/atmdb
    depends_on:
      - mongodb

  account-service:
    build: ./account-service
    container_name: account-service
    ports:
      - "4002:4002"
    environment:
      - PORT=4002
      - MONGO_URI=mongodb://mongodb:27017/atmdb
    depends_on:
      - mongodb

  transaction-service:
    build: ./transaction-service
    container_name: transaction-service
    ports:
      - "4003:4003"
    environment:
      - PORT=4003
      - MONGO_URI=mongodb://mongodb:27017/atmdb
    depends_on:
      - mongodb

  api-gateway:
    build: ./api-gateway
    container_name: api-gateway
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - AUTH_SERVICE_URL=http://auth-service:4001
      - ACCOUNT_SERVICE_URL=http://account-service:4002
      - TRANSACTION_SERVICE_URL=http://transaction-service:4003
    depends_on:
      - auth-service
      - account-service
      - transaction-service

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "5173:5173"
    depends_on:
      - api-gateway
```

### What this does
- starts MongoDB
- builds all backend services
- builds the frontend
- lets services talk to each other by service name

---

# 🟦 Task 3 — Run Docker Compose

From the project root:

```bash
docker compose up --build
```

### ✔ Checkpoint
- [ ] All containers build
- [ ] All containers start
- [ ] App works in browser

---

# 🟦 Task 4 — Create GitLab CI/CD file

### File: `.gitlab-ci.yml`

```yaml
stages:
  - install
  - build
  - docker
  - push

variables:
  DOCKER_DRIVER: overlay2

install_backend:
  stage: install
  image: node:18
  script:
    - cd auth-service && npm install
    - cd ../account-service && npm install
    - cd ../transaction-service && npm install
    - cd ../api-gateway && npm install

install_frontend:
  stage: install
  image: node:18
  script:
    - cd frontend && npm install

build_frontend:
  stage: build
  image: node:18
  script:
    - cd frontend
    - npm install
    - npm run build

docker_build:
  stage: docker
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t $DOCKER_USERNAME/auth-service ./auth-service
    - docker build -t $DOCKER_USERNAME/account-service ./account-service
    - docker build -t $DOCKER_USERNAME/transaction-service ./transaction-service
    - docker build -t $DOCKER_USERNAME/api-gateway ./api-gateway
    - docker build -t $DOCKER_USERNAME/frontend ./frontend

docker_push:
  stage: push
  image: docker:24
  services:
    - docker:24-dind
  script:
    - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
    - docker push $DOCKER_USERNAME/auth-service
    - docker push $DOCKER_USERNAME/account-service
    - docker push $DOCKER_USERNAME/transaction-service
    - docker push $DOCKER_USERNAME/api-gateway
    - docker push $DOCKER_USERNAME/frontend
```

---

# 🟦 Task 5 — Configure GitLab Variables

In GitLab project settings, add:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

### ✔ Checkpoint
- [ ] Variables added in GitLab

---

# 🟦 Task 6 — Push and Verify Pipeline

Commit and push your code.

```bash
git add .
git commit -m "Week 6 Docker and CI/CD setup"
git push
```

Check GitLab pipeline.

### ✔ Checkpoint
- [ ] Install stage passes
- [ ] Build stage passes
- [ ] Docker build stage passes
- [ ] Docker push stage passes or is ready to pass with valid credentials

---

# 🧪 Reflection Questions

1. What is the difference between an image and a container?
2. Why do services use names like `auth-service` inside Docker Compose?
3. Why are CI/CD variables used for Docker credentials?
4. What benefits do containers bring to this project?

---

# 🚧 Milestone Gateway (Must Pass)

Before moving to Week 7:

- [ ] Dockerfiles created for all services
- [ ] docker-compose created
- [ ] Containers run correctly
- [ ] App works in Docker
- [ ] GitLab pipeline created
- [ ] Pipeline stages run correctly
- [ ] Code committed to Git

---

# 🎯 Final Note

Week 6 is complete when the ATM system runs inside containers and the build process is automated through GitLab CI/CD.
