# Complete MongoDB Setup Guide: Offline Local MongoDB and Online MongoDB Atlas

This guide provides two complete versions of the same MVC ATM backend:

1. **Offline Version** — uses local MongoDB on your computer.
2. **Online Version** — uses MongoDB Atlas cloud database.

The code structure is the same for both versions. The main difference is the MongoDB connection string in the `.env` file and the connection messages in `app.js` and `seed.js`.

---

# PART A: OFFLINE VERSION — USING LOCAL MONGODB

Use this version when you want the system to run using MongoDB installed on your own computer.

---

## A1. Offline Folder Structure

### Auth Service

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

### Account Service

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

# A2. OFFLINE AUTH SERVICE COMPLETE CODE

---

## File: `auth-service/.env`

```env
PORT=4001
MONGO_URI=mongodb://localhost:27017/atmdb
```

### Explanation

This connects the Auth Service to a local MongoDB database called `atmdb`.

---

## File: `auth-service/package.json`

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

## File: `auth-service/src/models/User.js`

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

---

## File: `auth-service/src/controllers/authController.js`

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

---

## File: `auth-service/src/routes/authRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

module.exports = router;
```

---

## File: `auth-service/src/app.js`

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
  .then(() => {
    console.log("✅ Auth Service connected to local MongoDB");
  })
  .catch((err) => {
    console.error("❌ Auth Service local MongoDB error:", err.message);
  });

app.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "running",
    database: "Local MongoDB"
  });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});
```

---

## File: `auth-service/src/seed.js`

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to local MongoDB for Auth seeding");

    await User.deleteMany({});

    await User.create({
      username: "student1",
      pin: "1234",
      accountNumber: "ACC001"
    });

    console.log("✅ Auth users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed auth users:", error.message);
    process.exit(1);
  }
};

seedUsers();
```

---

# A3. OFFLINE ACCOUNT SERVICE COMPLETE CODE

---

## File: `account-service/.env`

```env
PORT=4002
MONGO_URI=mongodb://localhost:27017/atmdb
```

### Explanation

This connects the Account Service to the same local MongoDB database called `atmdb`.

---

## File: `account-service/package.json`

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

## File: `account-service/src/models/Account.js`

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

## File: `account-service/src/controllers/accountController.js`

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

## File: `account-service/src/routes/accountRoutes.js`

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

## File: `account-service/src/app.js`

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
  .then(() => {
    console.log("✅ Account Service connected to local MongoDB");
  })
  .catch((err) => {
    console.error("❌ Account Service local MongoDB error:", err.message);
  });

app.get("/health", (req, res) => {
  res.json({
    service: "account-service",
    status: "running",
    database: "Local MongoDB"
  });
});

app.use("/api/account", accountRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🚀 Account Service running on port ${PORT}`);
});
```

---

## File: `account-service/src/seed.js`

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Account = require("./models/Account");

dotenv.config();

const seedAccounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to local MongoDB for Account seeding");

    await Account.deleteMany({});

    await Account.create({
      accountNumber: "ACC001",
      name: "Student One",
      balance: 1000
    });

    console.log("✅ Accounts seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed accounts:", error.message);
    process.exit(1);
  }
};

seedAccounts();
```

---

# A4. OFFLINE SETUP STEPS WITH CHECK GATES

---

## Check Gate A1: Start Local MongoDB

Run:

```bash
mongod
```

If you use MongoDB Compass, make sure MongoDB is running locally.

Expected local database address:

```text
mongodb://localhost:27017/atmdb
```

✅ Pass this gate if MongoDB is running locally.

---

## Check Gate A2: Install Auth Service Dependencies

```bash
cd auth-service
npm install
```

✅ Pass this gate if `node_modules` is created and there are no major errors.

---

## Check Gate A3: Seed Auth Data

```bash
npm run seed
```

Expected:

```text
✅ Connected to local MongoDB for Auth seeding
✅ Auth users seeded successfully
```

✅ Pass this gate if the user is added to local MongoDB.

---

## Check Gate A4: Start Auth Service

```bash
npm start
```

Expected:

```text
✅ Auth Service connected to local MongoDB
🚀 Auth Service running on port 4001
```

✅ Pass this gate if Auth Service is running.

---

## Check Gate A5: Install Account Service Dependencies

Open another terminal:

```bash
cd account-service
npm install
```

✅ Pass this gate if dependencies install successfully.

---

## Check Gate A6: Seed Account Data

```bash
npm run seed
```

Expected:

```text
✅ Connected to local MongoDB for Account seeding
✅ Accounts seeded successfully
```

✅ Pass this gate if the account is added to local MongoDB.

---

## Check Gate A7: Start Account Service

```bash
npm start
```

Expected:

```text
✅ Account Service connected to local MongoDB
🚀 Account Service running on port 4002
```

✅ Pass this gate if Account Service is running.

---

## Check Gate A8: Test Offline Endpoints

### Auth health

```http
GET http://localhost:4001/health
```

Expected:

```json
{
  "service": "auth-service",
  "status": "running",
  "database": "Local MongoDB"
}
```

### Account health

```http
GET http://localhost:4002/health
```

Expected:

```json
{
  "service": "account-service",
  "status": "running",
  "database": "Local MongoDB"
}
```

### Login

```http
POST http://localhost:4001/api/auth/login
```

Body:

```json
{
  "username": "student1",
  "pin": "1234"
}
```

Expected:

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

### Balance

```http
GET http://localhost:4002/api/account/balance/ACC001
```

Expected:

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

# PART B: ONLINE VERSION — USING MONGODB ATLAS

Use this version when you want the system to connect to MongoDB Atlas online database.

---

# B1. ONLINE AUTH SERVICE COMPLETE CODE

---

## File: `auth-service/.env`

```env
PORT=4001
MONGO_URI=mongodb+srv://maxiecletus_db_user:YOUR_PASSWORD@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

### Important

Replace:

```text
YOUR_PASSWORD
```

with your real MongoDB Atlas database password.

Example:

```env
PORT=4001
MONGO_URI=mongodb+srv://maxiecletus_db_user:yourRealPassword@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

---

## File: `auth-service/package.json`

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

## File: `auth-service/src/models/User.js`

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

---

## File: `auth-service/src/controllers/authController.js`

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

---

## File: `auth-service/src/routes/authRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

module.exports = router;
```

---

## File: `auth-service/src/app.js`

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
  .then(() => {
    console.log("✅ Auth Service connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ Auth Service MongoDB Atlas connection error:", err.message);
  });

app.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "running",
    database: "MongoDB Atlas"
  });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});
```

---

## File: `auth-service/src/seed.js`

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB Atlas for Auth seeding");

    await User.deleteMany({});

    await User.create({
      username: "student1",
      pin: "1234",
      accountNumber: "ACC001"
    });

    console.log("✅ Auth users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed auth users:", error.message);
    process.exit(1);
  }
};

seedUsers();
```

---

# B2. ONLINE ACCOUNT SERVICE COMPLETE CODE

---

## File: `account-service/.env`

```env
PORT=4002
MONGO_URI=mongodb+srv://maxiecletus_db_user:YOUR_PASSWORD@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

---

## File: `account-service/package.json`

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

## File: `account-service/src/models/Account.js`

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

## File: `account-service/src/controllers/accountController.js`

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

## File: `account-service/src/routes/accountRoutes.js`

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

## File: `account-service/src/app.js`

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
  .then(() => {
    console.log("✅ Account Service connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ Account Service MongoDB Atlas connection error:", err.message);
  });

app.get("/health", (req, res) => {
  res.json({
    service: "account-service",
    status: "running",
    database: "MongoDB Atlas"
  });
});

app.use("/api/account", accountRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🚀 Account Service running on port ${PORT}`);
});
```

---

## File: `account-service/src/seed.js`

```javascript
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Account = require("./models/Account");

dotenv.config();

const seedAccounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB Atlas for Account seeding");

    await Account.deleteMany({});

    await Account.create({
      accountNumber: "ACC001",
      name: "Student One",
      balance: 1000
    });

    console.log("✅ Accounts seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed accounts:", error.message);
    process.exit(1);
  }
};

seedAccounts();
```

---

# B3. ONLINE SETUP STEPS WITH CHECK GATES

---

## Check Gate B1: Prepare MongoDB Atlas

In MongoDB Atlas:

1. Create or open your cluster.
2. Create a database user.
3. Allow your IP address in Network Access.
4. Copy the connection string.
5. Replace `YOUR_PASSWORD` in your `.env` files.
6. Make sure the database name is included:

```text
/myatm
```

✅ Pass this gate if your Atlas URI is ready.

---

## Check Gate B2: Install Auth Service Dependencies

```bash
cd auth-service
npm install
```

✅ Pass this gate if installation completes.

---

## Check Gate B3: Seed Auth Data Online

```bash
npm run seed
```

Expected:

```text
✅ Connected to MongoDB Atlas for Auth seeding
✅ Auth users seeded successfully
```

✅ Pass this gate if the user appears in MongoDB Atlas.

---

## Check Gate B4: Start Auth Service Online

```bash
npm start
```

Expected:

```text
✅ Auth Service connected to MongoDB Atlas
🚀 Auth Service running on port 4001
```

✅ Pass this gate if Auth Service is running.

---

## Check Gate B5: Install Account Service Dependencies

Open another terminal:

```bash
cd account-service
npm install
```

✅ Pass this gate if installation completes.

---

## Check Gate B6: Seed Account Data Online

```bash
npm run seed
```

Expected:

```text
✅ Connected to MongoDB Atlas for Account seeding
✅ Accounts seeded successfully
```

✅ Pass this gate if the account appears in MongoDB Atlas.

---

## Check Gate B7: Start Account Service Online

```bash
npm start
```

Expected:

```text
✅ Account Service connected to MongoDB Atlas
🚀 Account Service running on port 4002
```

✅ Pass this gate if Account Service is running.

---

## Check Gate B8: Test Online Endpoints

### Auth health

```http
GET http://localhost:4001/health
```

Expected:

```json
{
  "service": "auth-service",
  "status": "running",
  "database": "MongoDB Atlas"
}
```

### Account health

```http
GET http://localhost:4002/health
```

Expected:

```json
{
  "service": "account-service",
  "status": "running",
  "database": "MongoDB Atlas"
}
```

### Login

```http
POST http://localhost:4001/api/auth/login
```

Body:

```json
{
  "username": "student1",
  "pin": "1234"
}
```

Expected:

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

### Balance

```http
GET http://localhost:4002/api/account/balance/ACC001
```

Expected:

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

# PART C: MAIN DIFFERENCE BETWEEN OFFLINE AND ONLINE

---

## Offline MongoDB URI

```env
MONGO_URI=mongodb://localhost:27017/atmdb
```

Use this when MongoDB is installed and running on your computer.

---

## Online MongoDB Atlas URI

```env
MONGO_URI=mongodb+srv://maxiecletus_db_user:YOUR_PASSWORD@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

Use this when connecting to MongoDB Atlas cloud database.

---

# PART D: IMPORTANT NOTES

---

## Do not commit `.env` to GitHub

Create a `.gitignore` file in both services:

```gitignore
node_modules
.env
```

---

## If online connection fails, check these:

1. Your password is correct.
2. Your Atlas user has database access.
3. Your IP address is allowed in MongoDB Atlas Network Access.
4. The database name is included in the URI.
5. You have internet connection.
6. You installed dependencies using:

```bash
npm install
```

---

# PART E: FINAL CHECKLIST

---

## Offline Version Checklist

- [ ] MongoDB is installed locally
- [ ] `mongod` is running
- [ ] Auth `.env` uses `mongodb://localhost:27017/atmdb`
- [ ] Account `.env` uses `mongodb://localhost:27017/atmdb`
- [ ] Auth seed works
- [ ] Account seed works
- [ ] Auth Service starts
- [ ] Account Service starts
- [ ] Login works
- [ ] Balance works
- [ ] Deposit works
- [ ] Withdraw works

---

## Online Version Checklist

- [ ] MongoDB Atlas cluster is ready
- [ ] Database user is created
- [ ] IP address is allowed
- [ ] Auth `.env` uses Atlas URI
- [ ] Account `.env` uses Atlas URI
- [ ] Auth seed works online
- [ ] Account seed works online
- [ ] Auth Service starts
- [ ] Account Service starts
- [ ] Login works
- [ ] Balance works
- [ ] Deposit works
- [ ] Withdraw works

---

# FINAL NOTE

The controllers, models, routes, and API endpoints are the same for both offline and online versions.

The main file that changes is:

```text
.env
```

Offline uses:

```text
mongodb://localhost:27017/atmdb
```

Online uses:

```text
mongodb+srv://...
```
