# 📘 Week 2 Lab Worksheet — MVC + MongoDB + ATM Core Logic
## 🔐 Auth Service + 💰 Account Service

---

# 🎯 Objective

By the end of Week 2, you will:

- connect services to MongoDB
- implement MVC structure
- build login
- build balance retrieval
- build deposit
- build withdraw
- seed test data

---

# ✅ Success Criteria

You have successfully completed Week 2 if:

- MongoDB is running
- Auth Service connects to MongoDB
- Account Service connects to MongoDB
- login works for a seeded user
- balance endpoint returns account data
- deposit updates the balance in MongoDB
- withdraw updates the balance in MongoDB
- invalid login is rejected
- insufficient funds are rejected

---

# 🧠 Week 2 Architecture

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Model
  ↓
MongoDB
```

---

# 📁 Required Folder Structure

## Auth Service
```text
auth-service/
├── .env
├── package.json
└── src/
    ├── app.js
    ├── controllers/
    │   └── authController.js
    ├── models/
    │   └── User.js
    ├── routes/
    │   └── authRoutes.js
    └── seed.js
```

## Account Service
```text
account-service/
├── .env
├── package.json
└── src/
    ├── app.js
    ├── controllers/
    │   └── accountController.js
    ├── models/
    │   └── Account.js
    ├── routes/
    │   └── accountRoutes.js
    └── seed.js
```

---

# 🟦 Task 1 — Start MongoDB

Run MongoDB locally:

```bash
mongod
```

If you use MongoDB Compass or Atlas, make sure you have a working connection string.

### ✔ Checkpoint
- [ ] MongoDB is running
- [ ] Port 27017 is available, or Atlas string is ready

---

# 🟦 Task 2 — Auth Service MVC

Go to the auth service:

```bash
cd auth-service
mkdir -p src/models src/controllers src/routes
```

## Create `.env`

### File: `auth-service/.env`

```env
PORT=4001
MONGO_URI=mongodb://localhost:27017/atmdb
```

### What this does
- `PORT=4001` tells the service which port to use
- `MONGO_URI=...` tells Mongoose how to connect to MongoDB

---

## Update `package.json`

### File: `auth-service/package.json`

```json
{
  "name": "auth-service",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node src/app.js",
    "seed": "node src/seed.js"
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

## Create User model

### File: `auth-service/src/models/User.js`

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    pin: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
```

### What this does
- creates a schema for users
- stores `username`, `pin`, and `accountNumber`
- adds `createdAt` and `updatedAt` automatically through `timestamps`

---

## Create Auth controller

### File: `auth-service/src/controllers/authController.js`

```javascript
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, pin } = req.body;

    if (!username || !pin) {
      return res.status(400).json({
        success: false,
        message: "Username and PIN are required"
      });
    }

    const user = await User.findOne({ username, pin });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or PIN"
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        accountNumber: user.accountNumber
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message
    });
  }
};
```

### What this does
- reads `username` and `pin` from request body
- validates missing fields
- checks if the user exists in MongoDB
- returns success or failure

---

## Create Auth routes

### File: `auth-service/src/routes/authRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

module.exports = router;
```

### What this does
- creates `/login` route
- forwards request to the login controller

---

## Create Auth app

### File: `auth-service/src/app.js`

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Auth Service connected to MongoDB"))
  .catch((err) => console.error("❌ Auth Service MongoDB error:", err));

app.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "running"
  });
});

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Auth Service running on port ${process.env.PORT}`);
});
```

---

## Seed Auth data

### File: `auth-service/src/seed.js`

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});

    await User.create({
      username: "student1",
      pin: "1234",
      accountNumber: "ACC001"
    });

    console.log("✅ Auth users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed auth users:", error);
    process.exit(1);
  }
};

seedUsers();
```

---

# 🟦 Task 3 — Account Service MVC

Go to the account service:

```bash
cd ../account-service
mkdir -p src/models src/controllers src/routes
```

## Create `.env`

### File: `account-service/.env`

```env
PORT=4002
MONGO_URI=mongodb://localhost:27017/atmdb
```

---

## Update `package.json`

### File: `account-service/package.json`

```json
{
  "name": "account-service",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node src/app.js",
    "seed": "node src/seed.js"
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

## Create Account model

### File: `account-service/src/models/Account.js`

```javascript
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Account", accountSchema);
```

---

## Create Account controller

### File: `account-service/src/controllers/accountController.js`

```javascript
const Account = require("../models/Account");

exports.getBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    return res.json({
      success: true,
      account: {
        accountNumber: account.accountNumber,
        name: account.name,
        balance: account.balance
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get balance",
      error: error.message
    });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Account number and amount are required"
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a number greater than 0"
      });
    }

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    account.balance += numericAmount;
    await account.save();

    return res.json({
      success: true,
      message: "Deposit successful",
      account: {
        accountNumber: account.accountNumber,
        balance: account.balance
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Deposit failed",
      error: error.message
    });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Account number and amount are required"
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a number greater than 0"
      });
    }

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    if (account.balance < numericAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient funds"
      });
    }

    account.balance -= numericAmount;
    await account.save();

    return res.json({
      success: true,
      message: "Withdrawal successful",
      account: {
        accountNumber: account.accountNumber,
        balance: account.balance
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Withdrawal failed",
      error: error.message
    });
  }
};
```

---

## Create Account routes

### File: `account-service/src/routes/accountRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/balance/:accountNumber", accountController.getBalance);
router.post("/deposit", accountController.deposit);
router.post("/withdraw", accountController.withdraw);

module.exports = router;
```

---

## Create Account app

### File: `account-service/src/app.js`

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/accountRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Account Service connected to MongoDB"))
  .catch((err) => console.error("❌ Account Service MongoDB error:", err));

app.get("/health", (req, res) => {
  res.json({
    service: "account-service",
    status: "running"
  });
});

app.use("/api/account", accountRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Account Service running on port ${process.env.PORT}`);
});
```

---

## Seed Account data

### File: `account-service/src/seed.js`

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Account = require("./models/Account");

dotenv.config();

const seedAccounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Account.deleteMany({});

    await Account.create({
      accountNumber: "ACC001",
      name: "Student One",
      balance: 1000
    });

    console.log("✅ Accounts seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed accounts:", error);
    process.exit(1);
  }
};

seedAccounts();
```

---

# 🟦 Task 4 — Seed the Database

Open a terminal in each service and run:

## Auth Service
```bash
cd auth-service
npm run seed
```

## Account Service
```bash
cd ../account-service
npm run seed
```

### ✔ Checkpoint
- [ ] Auth seed ran successfully
- [ ] Account seed ran successfully

---

# 🟦 Task 5 — Start Services

## Terminal 1 — Auth Service
```bash
cd auth-service
npm start
```

## Terminal 2 — Account Service
```bash
cd account-service
npm start
```

### ✔ Checkpoint
- [ ] Auth Service running on port 4001
- [ ] Account Service running on port 4002

---

# 🟦 Task 6 — Test Endpoints

Use Postman, Insomnia, or browser where relevant.

## 1. Health checks
- `http://localhost:4001/health`
- `http://localhost:4002/health`

## 2. Login
### Request
```http
POST http://localhost:4001/api/auth/login
Content-Type: application/json
```

### Body
```json
{
  "username": "student1",
  "pin": "1234"
}
```

### Expected result
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "student1",
    "accountNumber": "ACC001"
  }
}
```

---

## 3. Get balance
### Request
```http
GET http://localhost:4002/api/account/balance/ACC001
```

### Expected result
```json
{
  "success": true,
  "account": {
    "accountNumber": "ACC001",
    "name": "Student One",
    "balance": 1000
  }
}
```

---

## 4. Deposit
### Request
```http
POST http://localhost:4002/api/account/deposit
Content-Type: application/json
```

### Body
```json
{
  "accountNumber": "ACC001",
  "amount": 200
}
```

### Expected result
Balance becomes `1200`.

---

## 5. Withdraw
### Request
```http
POST http://localhost:4002/api/account/withdraw
Content-Type: application/json
```

### Body
```json
{
  "accountNumber": "ACC001",
  "amount": 100
}
```

### Expected result
Balance becomes `1100`.

---

## 6. Invalid withdrawal
### Body
```json
{
  "accountNumber": "ACC001",
  "amount": 999999
}
```

### Expected result
```json
{
  "success": false,
  "message": "Insufficient funds"
}
```

---

# 🧪 Reflection Questions

1. What is the difference between a model and a controller?
2. Why do we use `await` with Mongoose queries?
3. Why should deposit and withdraw validate the amount?
4. Why is it important that the account number is unique?
5. What does data persistence mean?

---

# 🚧 Milestone Gateway (Must Pass)

Before moving to Week 3:

- [ ] MongoDB is running
- [ ] Auth Service uses MVC
- [ ] Account Service uses MVC
- [ ] Login works
- [ ] Get balance works
- [ ] Deposit works
- [ ] Withdraw works
- [ ] Invalid login is rejected
- [ ] Insufficient funds are rejected
- [ ] Seed data is loaded
- [ ] Code committed to Git

---

# 🎯 Final Note

If all tests pass, Week 2 is complete.

You now have the first real ATM backend logic running with MVC and MongoDB.
