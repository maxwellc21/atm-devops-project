# 📘 Week 7 Lab Worksheet — Kubernetes + Final Demo
## ☸️ Deploy the ATM system and demonstrate the full project

---

# 🎯 Objective

By the end of Week 7, you will:

- create Kubernetes manifests
- deploy backend services to Kubernetes
- expose the API Gateway
- verify pods and services
- complete the final demonstration

---

# ✅ Success Criteria

You have successfully completed Week 7 if:

- Kubernetes manifests are created
- pods start successfully
- services are reachable
- API Gateway is exposed
- the full ATM system can be demonstrated
- the team can explain the architecture and DevOps flow

---

# 🧠 Week 7 Kubernetes View

```text
Kubernetes Cluster
  ├── Auth Service Pod
  ├── Account Service Pod
  ├── Transaction Service Pod
  ├── API Gateway Pod
  └── MongoDB Pod / external DB
```

---

# 📁 Suggested Kubernetes Files

```text
k8s/
├── auth-deployment.yaml
├── account-deployment.yaml
├── transaction-deployment.yaml
├── gateway-deployment.yaml
└── mongodb-deployment.yaml
```

---

# 🟦 Task 1 — Create Auth Service manifest

### File: `k8s/auth-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
        - name: auth-service
          image: yourdockerhubusername/auth-service:latest
          ports:
            - containerPort: 4001
          env:
            - name: PORT
              value: "4001"
            - name: MONGO_URI
              value: "mongodb://mongodb:27017/atmdb"
---
apiVersion: v1
kind: Service
metadata:
  name: auth-service
spec:
  selector:
    app: auth-service
  ports:
    - port: 4001
      targetPort: 4001
```

---

# 🟦 Task 2 — Create Account Service manifest

### File: `k8s/account-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: account-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: account-service
  template:
    metadata:
      labels:
        app: account-service
    spec:
      containers:
        - name: account-service
          image: yourdockerhubusername/account-service:latest
          ports:
            - containerPort: 4002
          env:
            - name: PORT
              value: "4002"
            - name: MONGO_URI
              value: "mongodb://mongodb:27017/atmdb"
---
apiVersion: v1
kind: Service
metadata:
  name: account-service
spec:
  selector:
    app: account-service
  ports:
    - port: 4002
      targetPort: 4002
```

---

# 🟦 Task 3 — Create Transaction Service manifest

### File: `k8s/transaction-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: transaction-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: transaction-service
  template:
    metadata:
      labels:
        app: transaction-service
    spec:
      containers:
        - name: transaction-service
          image: yourdockerhubusername/transaction-service:latest
          ports:
            - containerPort: 4003
          env:
            - name: PORT
              value: "4003"
            - name: MONGO_URI
              value: "mongodb://mongodb:27017/atmdb"
---
apiVersion: v1
kind: Service
metadata:
  name: transaction-service
spec:
  selector:
    app: transaction-service
  ports:
    - port: 4003
      targetPort: 4003
```

---

# 🟦 Task 4 — Create API Gateway manifest

### File: `k8s/gateway-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
spec:
  replicas: 1
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
        - name: api-gateway
          image: yourdockerhubusername/api-gateway:latest
          ports:
            - containerPort: 4000
          env:
            - name: PORT
              value: "4000"
            - name: AUTH_SERVICE_URL
              value: "http://auth-service:4001"
            - name: ACCOUNT_SERVICE_URL
              value: "http://account-service:4002"
            - name: TRANSACTION_SERVICE_URL
              value: "http://transaction-service:4003"
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
spec:
  selector:
    app: api-gateway
  type: NodePort
  ports:
    - port: 4000
      targetPort: 4000
      nodePort: 30080
```

---

# 🟦 Task 5 — Optional MongoDB manifest

### File: `k8s/mongodb-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo:6
          ports:
            - containerPort: 27017
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb
spec:
  selector:
    app: mongodb
  ports:
    - port: 27017
      targetPort: 27017
```

---

# 🟦 Task 6 — Apply manifests

From the project root:

```bash
kubectl apply -f k8s/
```

### ✔ Checkpoint
- [ ] Manifests applied successfully

---

# 🟦 Task 7 — Verify Kubernetes resources

Check pods:

```bash
kubectl get pods
```

Check services:

```bash
kubectl get services
```

Describe a pod if needed:

```bash
kubectl describe pod <pod-name>
```

View logs if needed:

```bash
kubectl logs <pod-name>
```

### ✔ Checkpoint
- [ ] Pods running
- [ ] Services created
- [ ] API Gateway exposed

---

# 🟦 Task 8 — Final Demonstration

Your team must demonstrate:

1. system startup
2. login with seeded user
3. balance retrieval
4. deposit
5. updated balance
6. withdraw
7. updated balance
8. transaction history
9. Docker containers or images
10. GitLab CI/CD pipeline
11. Kubernetes deployment or validated manifests

### Demo test credentials
- username: `student1`
- pin: `1234`
- accountNumber: `ACC001`

---

# 🧪 Reflection Questions

1. What is the difference between Docker Compose and Kubernetes?
2. Why do we use Deployments and Services in Kubernetes?
3. What does `nodePort` do for the API Gateway?
4. Why is Kubernetes useful for microservices?

---

# 🚧 Final Milestone Gateway (Course Completion)

To pass the course, the team must show:

- [ ] Week 1 structure and running services complete
- [ ] Week 2 MVC and MongoDB complete
- [ ] Week 3 transaction tracking complete
- [ ] Week 4 API Gateway integration complete
- [ ] Week 5 frontend complete
- [ ] Week 6 Docker and CI/CD complete
- [ ] Week 7 Kubernetes or deployment-ready manifests complete
- [ ] Final demo successful
- [ ] Team can explain the architecture and workflow

---

# 🎯 Final Note

The course is complete when the ATM system works end to end and the team can demonstrate both the software and the DevOps process.
