# DevOpsFundamental_MCSPC101
A full-stack DevOps project implementing an ATM microservices system using React, Node.js (MVC), MongoDB, Docker, GitLab CI/CD, and Kubernetes. Built as a 7-week hands-on course focusing on real-world deployment and automation.

# 💳 DevOps Course

## 🚀 7-Week Project-Based Course

### 🏦 ATM Microservices Application

------------------------------------------------------------------------

## 📌 Course Purpose

This is a **hands-on DevOps course** where students build a complete ATM
system from scratch.

No exams. No theory-only learning.\
👉 You pass by **building and demonstrating a working system**.

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   ⚛️ React (Frontend)\
-   🟢 Node.js + Express (Backend)\
-   🍃 MongoDB (Database)\
-   🧩 MVC Architecture\
-   🐙 GitHub (Version Control)\
-   🔁 GitLab CI/CD (Automation)\
-   🐳 Docker (Containerization)\
-   📦 Docker Hub (Image Storage)\
-   ☸️ Kubernetes (Deployment)

------------------------------------------------------------------------

## ✅ Pass Requirement

You pass if you can:

-   ✔️ Structure the project correctly\
-   ✔️ Build microservices\
-   ✔️ Implement MVC\
-   ✔️ Integrate frontend + backend + DB\
-   ✔️ Run locally\
-   ✔️ Dockerize services\
-   ✔️ Implement CI/CD\
-   ✔️ Deploy on Kubernetes\
-   ✔️ Demonstrate working system

> 🎯 Focus: **Completion, not marks**

------------------------------------------------------------------------

## 🏗️ Architecture

![Architecture](https://miro.medium.com/v2/resize:fit:1400/1*Y2g3e8DqRLVQjaxAgq6MqQ.png)

------------------------------------------------------------------------

## 📅 Week-by-Week Plan

### 🧱 Week 1 --- Setup & DevOps Basics

-   DevOps overview\
-   Install tools (Git, Node, Docker)\
-   Create GitHub repo\
-   Project structure

------------------------------------------------------------------------

### 🔐 Week 2 --- Backend (MVC)

-   Auth Service\
-   Account Service\
-   MVC structure

------------------------------------------------------------------------

### 💸 Week 3 --- Transactions & Frontend

-   Transaction Service\
-   MongoDB integration\
-   React UI\
-   Connect frontend

------------------------------------------------------------------------

### 🔗 Week 4 --- Integration

-   API Gateway\
-   Connect all services\
-   End-to-end testing

------------------------------------------------------------------------

### 🐳 Week 5 --- Docker

-   Dockerfiles\
-   Build images\
-   docker-compose setup

------------------------------------------------------------------------

### 🔁 Week 6 --- CI/CD

-   GitLab pipeline\
-   Build & deploy automation\
-   Push to Docker Hub

------------------------------------------------------------------------

### ☸️ Week 7 --- Kubernetes

-   Deployments & Services\
-   Run in cluster\
-   Final demo

------------------------------------------------------------------------

## 🎓 Outcome

By the end, you will have:

-   💼 Real-world DevOps project\
-   ⚙️ Fully automated pipeline\
-   🌐 Deployable microservices system

------------------------------------------------------------------------

## 🚀 Final Note

This course is designed to make you **job-ready**

------------------------------------------------------------------------

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

