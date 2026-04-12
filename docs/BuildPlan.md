# 🚀 ATM DevOps Project Build Plan  
## 7-Week Project-Based Course  
**React + Microservices (MVC) + CI/CD + Docker + Kubernetes**

---

# 🎯 1. Course Philosophy

> ❗ No exams. No tests. No assignments.  
> ✅ You pass by building a working system.

---

## ✅ PASS REQUIREMENT

Students must successfully:

- 🧱 build full ATM system  
- 🔀 use microservices architecture  
- 🧩 implement MVC properly  
- 🔗 integrate frontend + backend + DB  
- 🐳 run system using Docker  
- 🔄 implement CI/CD pipeline  
- ☸️ prepare Kubernetes deployment  
- 🎤 demonstrate final working system  

---

# 🏗️ 2. System Architecture

```text
Frontend (React)
       ↓
API Gateway
       ↓
---------------------------------
| Auth | Account | Transaction |
---------------------------------
       ↓
MongoDB
```

---

# 🧠 3. Core Concept: MVC

```text
Routes → Controller → Model → Database
```

- **Model** → Data structure  
- **Controller** → Logic  
- **Routes** → API endpoints  
- **App** → Server setup  

---

# 🧰 4. Tech Stack

## 🖥️ Frontend
- React ⚛️  
- Vite ⚡  
- Axios 🌐  

## 🧠 Backend
- Node.js 🟢  
- Express 🚂  
- MVC 🧩  

## 🗄️ Database
- MongoDB 🍃  

## ⚙️ DevOps
- Git 🧾  
- GitHub 🐙  
- GitLab CI/CD 🔄  
- Docker 🐳  
- Docker Hub 📦  
- Kubernetes ☸️  

---

# 📁 5. Project Structure

```bash
atm-devops-project/
│
├── frontend/ ⚛️
├── api-gateway/ 🚪
├── auth-service/ 🔐
├── account-service/ 💰
├── transaction-service/ 📊
│
├── docker-compose.yml 🐳
├── k8s/ ☸️
├── docs/ 📄
├── .gitlab-ci.yml 🔄
└── README.md
```

---

# 👥 6. Team Roles

- 🧑‍💼 Project Manager  
- 🎨 Frontend Developer  
- 🔐 Auth Developer  
- 💰 Account Developer  
- 📊 Transaction Developer  
- ⚙️ DevOps Engineer  

---

# 🗺️ 7. Milestone Map

| Week | Milestone |
|------|----------|
| 1️⃣ | All services run |
| 2️⃣ | Auth + Account (MVC) |
| 3️⃣ | Transactions + MongoDB |
| 4️⃣ | API Gateway integration |
| 5️⃣ | Full frontend working |
| 6️⃣ | Docker + CI/CD |
| 7️⃣ | Kubernetes + Final Demo |

---

# 🟦 WEEK 1 — Setup & Foundation

## 🎯 Goal
All services start successfully

## 🧱 Build
- folder structure  
- Git repo  
- base servers  
- frontend app  

## ✅ Success State
- all services run  
- `/health` works  
- frontend loads  

## 🚧 Milestone Gateway
✔ services start  
✔ no crashes  
✔ repo created  

---

# 🟦 WEEK 2 — Auth + Account (MVC)

## 🎯 Goal
Build real backend logic

## 🔐 Auth Service
- login endpoint  

## 💰 Account Service
- balance  
- deposit  
- withdraw  

## 🧠 Concept

```text
Request → Route → Controller → Model → DB
```

## ✅ Success State
- login works  
- balance works  
- deposit works  
- withdraw works  

## 🚧 Milestone Gateway
✔ MVC structure  
✔ MongoDB connected  
✔ data persists  

---

# 🟦 WEEK 3 — Transactions + Database

## 🎯 Goal
Track all money movements

## 📊 Build
- transaction schema  
- create transaction  
- get history  

## 🧠 Concept

```text
Deposit → Save Transaction → Retrieve History
```

## ✅ Success State
- transactions saved  
- history visible  
- sorted newest first  

## 🚧 Milestone Gateway
✔ transaction records correct  
✔ DB working  
✔ API working  

---

# 🟦 WEEK 4 — API Gateway

## 🎯 Goal
Single entry point

## 🚪 Gateway Handles
- login  
- balance  
- deposit  
- withdraw  
- transactions  

## 🧠 Flow

```text
Frontend → Gateway → Services → DB
```

## ✅ Success State
- all calls go through gateway  
- deposit triggers transaction record  

## 🚧 Milestone Gateway
✔ no direct service calls  
✔ full backend integration  

---

# 🟦 WEEK 5 — Frontend (Full ATM UI)

## 🎯 Goal
Complete user experience

## 🖥️ Pages
- Login  
- Dashboard  

## 🔧 Features
- login  
- balance display  
- deposit  
- withdraw  
- transactions  

## ✅ Success State
- full ATM flow works in browser  

## 🚧 Milestone Gateway
✔ UI connected to backend  
✔ updates reflect instantly  

---

# 🟦 WEEK 6 — Docker + CI/CD

## 🎯 Goal
Automate and containerize

## 🐳 Docker
- Dockerfiles  
- docker-compose  

## 🔄 CI/CD Pipeline

```text
Code Push → Install → Test → Build → Docker Build → Push
```

## ✅ Success State
- docker-compose works  
- pipeline passes  

## 🚧 Milestone Gateway
✔ containers run  
✔ images built  
✔ CI/CD success  

---

# 🟦 WEEK 7 — Kubernetes + Final Demo

## 🎯 Goal
Production-ready system

## ☸️ Build
- deployments  
- services  

## 🎤 Final Demo

Students must show:

1. login 🔐  
2. balance 💰  
3. deposit ➕  
4. withdraw ➖  
5. transactions 📊  
6. Docker 🐳  
7. CI/CD 🔄  
8. Kubernetes ☸️  

## ✅ Success State
- full system works  
- deployment ready  

## 🚧 Final Gateway
✔ full working app  
✔ DevOps pipeline complete  
✔ team can explain system  

---

# 🧪 Final Checklist

✔ MVC used  
✔ Microservices working  
✔ Gateway used  
✔ MongoDB connected  
✔ Frontend working  
✔ Docker working  
✔ CI/CD working  
✔ Kubernetes ready  

---

# 🎯 Final Message

> Build it. Run it. Show it.  
> That is how you pass this course.
