# 📘 Week 3 Lab Worksheet — Transaction Service + Full Data Tracking
## 📊 Record every deposit and withdrawal

---

# 🎯 Objective

By the end of Week 3, you will:

- create the Transaction Service
- store all deposits and withdrawals in MongoDB
- retrieve transaction history
- sort transactions newest first
- test the Transaction Service directly

---

# ✅ Success Criteria

You have successfully completed Week 3 if:

- Transaction Service runs on port 4003
- transactions can be created
- transaction history can be retrieved
- history is sorted newest first
- all records are stored in MongoDB

---

# 🧠 Week 3 Data Flow

```text
Deposit or Withdraw
   ↓
Create Transaction Record
   ↓
Save to MongoDB
   ↓
Retrieve Transaction History
```

---

# 📁 Required Folder Structure

```text
transaction-service/
├── .env
├── package.json
└── src/
    ├── app.js
    ├── controllers/
    │   └── transactionController.js
    ├── models/
    │   └── Transaction.js
    └── routes/
        └── transactionRoutes.js
```

---

# 🟦 Task 1 — Create Transaction Service MVC

Go to the transaction service:

```bash
cd transaction-service
mkdir -p src/models src/controllers src/routes
```

## Create `.env`

### File: `transaction-service/.env`

```env
PORT=4003
MONGO_URI=mongodb://localhost:27017/atmdb
```

---

## Update `package.json`

### File: `transaction-service/package.json`

```json
{
  "name": "transaction-service",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node src/app.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.5.1"
  }
}
```

---

## Create Transaction model

### File: `transaction-service/src/models/Transaction.js`

```javascript
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ["deposit", "withdraw"]
    },
    amount: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
```

### What this does
- stores account number
- stores whether the transaction is `deposit` or `withdraw`
- stores the amount
- stores a timestamp

---

## Create Transaction controller

### File: `transaction-service/src/controllers/transactionController.js`

```javascript
const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { accountNumber, type, amount } = req.body;

    if (!accountNumber || !type || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Account number, type, and amount are required"
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a number greater than 0"
      });
    }

    const transaction = await Transaction.create({
      accountNumber,
      type,
      amount: numericAmount
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message
    });
  }
};

exports.getTransactionsByAccount = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const transactions = await Transaction.find({ accountNumber }).sort({
      timestamp: -1
    });

    return res.json({
      success: true,
      count: transactions.length,
      transactions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve transactions",
      error: error.message
    });
  }
};
```

---

## Create Transaction routes

### File: `transaction-service/src/routes/transactionRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/:accountNumber", transactionController.getTransactionsByAccount);

module.exports = router;
```

---

## Create Transaction app

### File: `transaction-service/src/app.js`

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Transaction Service connected to MongoDB"))
  .catch((err) => console.error("❌ Transaction Service MongoDB error:", err));

app.get("/health", (req, res) => {
  res.json({
    service: "transaction-service",
    status: "running"
  });
});

app.use("/api/transactions", transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Transaction Service running on port ${process.env.PORT}`);
});
```

---

# 🟦 Task 2 — Start Transaction Service

```bash
cd transaction-service
npm start
```

### ✔ Checkpoint
- [ ] Transaction Service is running on port 4003
- [ ] `/health` works

---

# 🟦 Task 3 — Test Transaction Creation

## Request
```http
POST http://localhost:4003/api/transactions
Content-Type: application/json
```

## Body
```json
{
  "accountNumber": "ACC001",
  "type": "deposit",
  "amount": 250
}
```

## Expected result
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "transaction": {
    "accountNumber": "ACC001",
    "type": "deposit",
    "amount": 250
  }
}
```

### ✔ Checkpoint
- [ ] Transaction created successfully
- [ ] Record exists in MongoDB

---

# 🟦 Task 4 — Test Transaction History

## Request
```http
GET http://localhost:4003/api/transactions/ACC001
```

## Expected result
A list of transactions sorted by newest first.

### ✔ Checkpoint
- [ ] History endpoint works
- [ ] Transactions are sorted descending by timestamp

---

# 🟦 Task 5 — Create Sample Data

Create several sample transactions by repeating POST requests:

### Deposit
```json
{
  "accountNumber": "ACC001",
  "type": "deposit",
  "amount": 100
}
```

### Withdraw
```json
{
  "accountNumber": "ACC001",
  "type": "withdraw",
  "amount": 50
}
```

### Deposit
```json
{
  "accountNumber": "ACC001",
  "type": "deposit",
  "amount": 300
}
```

Then re-test history.

---

# 🧪 Reflection Questions

1. Why should transactions be stored separately from account balance?
2. Why is transaction history sorted newest first?
3. Why is the `type` field restricted to `deposit` and `withdraw`?
4. What is the difference between current balance and transaction history?

---

# 🚧 Milestone Gateway (Must Pass)

Before moving to Week 4:

- [ ] Transaction Service uses MVC
- [ ] Transaction model is created
- [ ] Transaction creation works
- [ ] Transaction history retrieval works
- [ ] Transactions are stored in MongoDB
- [ ] Results are sorted newest first
- [ ] Code committed to Git

---

# 🎯 Final Note

Week 3 is complete when the system can store and retrieve a full transaction history.
