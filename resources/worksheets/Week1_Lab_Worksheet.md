# 📘 Week 1 Lab Worksheet  
## ATM DevOps Project — Student Guide  

---

# 🎯 Objective

By the end of this lab, you will:

- Create the full project structure  
- Initialize Git  
- Build 4 backend services  
- Build the API Gateway  
- Create a React frontend  
- Run all services successfully  

---

# 🧠 Learning Outcomes

By completing this lab, you should understand:

- What a microservices architecture looks like  
- How multiple services run independently  
- Basic Express server setup  
- How frontend and backend are separated  

---

# 📋 Pre-Lab Checklist

Before you begin, ensure you have:

- [ ] Node.js installed (`node -v`)  
- [ ] npm installed (`npm -v`)  
- [ ] Git installed (`git --version`)  
- [ ] VS Code or any IDE  

---

# 🟦 Task 1 — Create Project

### Instructions

Run:

```bash
mkdir atm-devops-project
cd atm-devops-project
```

### ✔ Checkpoint

- [ ] Folder created  
- [ ] Inside project folder  

---

# 🟦 Task 2 — Initialize Git

```bash
git init
```

### ✔ Checkpoint

- [ ] Git initialized  
- [ ] `.git` folder created  

---

# 🟦 Task 3 — Create Structure

```bash
mkdir frontend api-gateway auth-service account-service transaction-service docs k8s
```

### ✔ Checkpoint

- [ ] All folders created  

---

# 🟦 Task 4 — Create `.gitignore`

Create file:

```gitignore
node_modules/
.env
dist/
build/
coverage/
```

### ✔ Checkpoint

- [ ] `.gitignore` exists  

---

# 🟦 Task 5 — Auth Service

### Setup

```bash
cd auth-service
npm init -y
npm install express cors dotenv mongoose
mkdir src
```

### Create file: `src/app.js`

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "auth-service", status: "running" });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
```

### ✔ Checkpoint

- [ ] Service starts  
- [ ] `/health` works  

---

# 🟦 Task 6 — Account Service

```bash
cd ../account-service
npm init -y
npm install express cors dotenv mongoose
mkdir src
```

### Create file: `src/app.js`

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4002;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "account-service", status: "running" });
});

app.listen(PORT, () => {
  console.log(`Account service running on port ${PORT}`);
});
```

### ✔ Checkpoint

- [ ] Service starts  
- [ ] `/health` works  

---

# 🟦 Task 7 — Transaction Service

```bash
cd ../transaction-service
npm init -y
npm install express cors dotenv mongoose
mkdir src
```

### Create file: `src/app.js`

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4003;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "transaction-service", status: "running" });
});

app.listen(PORT, () => {
  console.log(`Transaction service running on port ${PORT}`);
});
```

### ✔ Checkpoint

- [ ] Service starts  
- [ ] `/health` works  

---

# 🟦 Task 8 — API Gateway

```bash
cd ../api-gateway
npm init -y
npm install express cors dotenv axios
mkdir src
```

### Create file: `src/app.js`

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "api-gateway", status: "running" });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
```

### ✔ Checkpoint

- [ ] Gateway runs  
- [ ] `/health` works  

---

# 🟦 Task 9 — Frontend

```bash
cd ../frontend
npm create vite@latest . -- --template react
npm install
```

### Edit `src/App.jsx`

```jsx
function App() {
  return (
    <div>
      <h1>ATM DevOps Project</h1>
      <p>Week 1 running successfully</p>
    </div>
  );
}

export default App;
```

### ✔ Checkpoint

- [ ] Frontend starts  
- [ ] Page loads in browser  

---

# 🟦 Task 10 — Run Everything

Open separate terminals and run:

```bash
npm start
```

Frontend:

```bash
npm run dev
```

---

# 🌐 Task 11 — Test Endpoints

Test:

- http://localhost:4001/health  
- http://localhost:4002/health  
- http://localhost:4003/health  
- http://localhost:4000/health  

### ✔ Checkpoint

- [ ] All endpoints return JSON  

---

# 🧪 Reflection Questions

Answer these:

1. What is a microservice?  
2. Why do we separate services instead of one big server?  
3. What does `/health` endpoint help with?  
4. What is the role of the API Gateway?  

---

# 🚧 Milestone Gateway (Must Pass)

Before moving to Week 2:

- [ ] All services run  
- [ ] No errors  
- [ ] All `/health` endpoints work  
- [ ] Frontend loads  
- [ ] Code committed to Git  

---

# 🎯 Final Note

If your system runs successfully — you pass Week 1.

If not — fix it before moving forward.
