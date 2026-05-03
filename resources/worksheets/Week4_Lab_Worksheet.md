# 📘 Week 4 Lab Worksheet — API Gateway + Full Backend Integration
## 🚪 Single Entry Point for the ATM System

---

# 🎯 Objective

By the end of Week 4, you will:

- build the API Gateway
- make the gateway the only backend entry point
- forward login requests to Auth Service
- forward balance requests to Account Service
- make deposit call both Account Service and Transaction Service
- make withdraw call both Account Service and Transaction Service

---

# ✅ Success Criteria

You have successfully completed Week 4 if:

- API Gateway runs on port 4000
- login works through the gateway
- balance works through the gateway
- deposit works through the gateway
- withdraw works through the gateway
- transactions can be retrieved through the gateway
- frontend or client no longer needs to call services directly

---

# 🧠 Week 4 Architecture

```text
Client
  ↓
API Gateway
  ├── Auth Service
  ├── Account Service
  └── Transaction Service
```

---

# 📁 Required Folder Structure

```text
api-gateway/
├── .env
├── package.json
└── src/
    ├── app.js
    ├── controllers/
    │   └── gatewayController.js
    └── routes/
        └── gatewayRoutes.js
```

---

# 🟦 Task 1 — Prepare API Gateway

Go to the gateway folder:

```bash
cd api-gateway
mkdir -p src/controllers src/routes
```

## Create `.env`

### File: `api-gateway/.env`

```env
PORT=4000
AUTH_SERVICE_URL=http://localhost:4001
ACCOUNT_SERVICE_URL=http://localhost:4002
TRANSACTION_SERVICE_URL=http://localhost:4003
```

---

## Update `package.json`

### File: `api-gateway/package.json`

```json
{
  "name": "api-gateway",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node src/app.js"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  }
}
```

---

# 🟦 Task 2 — Create Gateway Controller

### File: `api-gateway/src/controllers/gatewayController.js`

```javascript
const axios = require("axios");

exports.login = async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/login`,
      req.body
    );

    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Gateway login failed",
      error: error.response?.data || error.message
    });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.ACCOUNT_SERVICE_URL}/api/account/balance/${req.params.accountNumber}`
    );

    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Gateway balance failed",
      error: error.response?.data || error.message
    });
  }
};

exports.deposit = async (req, res) => {
  try {
    const balanceResponse = await axios.post(
      `${process.env.ACCOUNT_SERVICE_URL}/api/account/deposit`,
      req.body
    );

    await axios.post(
      `${process.env.TRANSACTION_SERVICE_URL}/api/transactions`,
      {
        accountNumber: req.body.accountNumber,
        type: "deposit",
        amount: req.body.amount
      }
    );

    return res.json(balanceResponse.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Gateway deposit failed",
      error: error.response?.data || error.message
    });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const balanceResponse = await axios.post(
      `${process.env.ACCOUNT_SERVICE_URL}/api/account/withdraw`,
      req.body
    );

    await axios.post(
      `${process.env.TRANSACTION_SERVICE_URL}/api/transactions`,
      {
        accountNumber: req.body.accountNumber,
        type: "withdraw",
        amount: req.body.amount
      }
    );

    return res.json(balanceResponse.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Gateway withdraw failed",
      error: error.response?.data || error.message
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TRANSACTION_SERVICE_URL}/api/transactions/${req.params.accountNumber}`
    );

    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Gateway transactions failed",
      error: error.response?.data || error.message
    });
  }
};
```

### What this does
- forwards requests to the correct service
- coordinates deposit and withdraw across two services
- returns downstream errors clearly

---

# 🟦 Task 3 — Create Gateway Routes

### File: `api-gateway/src/routes/gatewayRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const gatewayController = require("../controllers/gatewayController");

router.post("/login", gatewayController.login);
router.get("/balance/:accountNumber", gatewayController.getBalance);
router.post("/deposit", gatewayController.deposit);
router.post("/withdraw", gatewayController.withdraw);
router.get("/transactions/:accountNumber", gatewayController.getTransactions);

module.exports = router;
```

---

# 🟦 Task 4 — Create Gateway App

### File: `api-gateway/src/app.js`

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const gatewayRoutes = require("./routes/gatewayRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    service: "api-gateway",
    status: "running"
  });
});

app.use("/api", gatewayRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 API Gateway running on port ${process.env.PORT}`);
});
```

---

# 🟦 Task 5 — Start All Backend Services

Open separate terminals and start:

## Auth Service
```bash
cd auth-service
npm start
```

## Account Service
```bash
cd account-service
npm start
```

## Transaction Service
```bash
cd transaction-service
npm start
```

## API Gateway
```bash
cd api-gateway
npm start
```

### ✔ Checkpoint
- [ ] Auth Service running
- [ ] Account Service running
- [ ] Transaction Service running
- [ ] API Gateway running

---

# 🟦 Task 6 — Test All Gateway Endpoints

From now on, test through the API Gateway.

## 1. Login through gateway
```http
POST http://localhost:4000/api/login
Content-Type: application/json
```

### Body
```json
{
  "username": "student1",
  "pin": "1234"
}
```

---

## 2. Balance through gateway
```http
GET http://localhost:4000/api/balance/ACC001
```

---

## 3. Deposit through gateway
```http
POST http://localhost:4000/api/deposit
Content-Type: application/json
```

### Body
```json
{
  "accountNumber": "ACC001",
  "amount": 200
}
```

Expected:
- balance increases
- new deposit transaction is created

---

## 4. Withdraw through gateway
```http
POST http://localhost:4000/api/withdraw
Content-Type: application/json
```

### Body
```json
{
  "accountNumber": "ACC001",
  "amount": 100
}
```

Expected:
- balance decreases
- new withdrawal transaction is created

---

## 5. Transaction history through gateway
```http
GET http://localhost:4000/api/transactions/ACC001
```

Expected:
- transaction list returned from Transaction Service through the gateway

### ✔ Checkpoint
- [ ] Login works through gateway
- [ ] Balance works through gateway
- [ ] Deposit works through gateway
- [ ] Withdraw works through gateway
- [ ] Transaction history works through gateway

---

# 🧪 Reflection Questions

1. Why is an API Gateway useful in a microservices system?
2. Why does deposit need to call two services?
3. Why should clients use the gateway instead of calling services directly?
4. What happens if one downstream service fails?

---

# 🚧 Milestone Gateway (Must Pass)

Before moving to Week 5:

- [ ] API Gateway uses routes and controller structure
- [ ] Gateway forwards login correctly
- [ ] Gateway forwards balance correctly
- [ ] Gateway deposit updates balance and writes transaction
- [ ] Gateway withdraw updates balance and writes transaction
- [ ] Gateway retrieves transaction history
- [ ] No direct service calls are needed from the client
- [ ] Code committed to Git

---

# 🎯 Final Note

Week 4 is complete when the gateway becomes the single backend entry point.
