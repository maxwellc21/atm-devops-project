# 📘 Week 5 Lab Worksheet — Frontend + Full ATM User Interface
## ⚛️ React + Axios + Routing

---

# 🎯 Objective

By the end of Week 5, you will:

- build the React frontend
- create a login page
- create a dashboard page
- call the API Gateway
- display balance
- deposit from the UI
- withdraw from the UI
- display transaction history

---

# ✅ Success Criteria

You have successfully completed Week 5 if:

- frontend runs on port 5173
- login works in the browser
- dashboard loads account data
- balance is displayed
- deposit works from the UI
- withdraw works from the UI
- transaction history updates in the browser

---

# 🧠 Week 5 Frontend Flow

```text
Browser UI
   ↓
Axios request
   ↓
API Gateway
   ↓
Backend Services
   ↓
MongoDB
```

---

# 📁 Required Folder Structure

```text
frontend/
├── package.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   └── TransactionList.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   └── services/
│       └── api.js
```

---

# 🟦 Task 1 — Install Frontend Packages

Go to the frontend folder:

```bash
cd frontend
npm install axios react-router-dom
```

### ✔ Checkpoint
- [ ] Axios installed
- [ ] React Router installed

---

# 🟦 Task 2 — Create API service

### File: `frontend/src/services/api.js`

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

export default api;
```

### What this does
- creates one shared Axios instance
- points all requests to the API Gateway

---

# 🟦 Task 3 — Create Transaction List component

### File: `frontend/src/components/TransactionList.jsx`

```jsx
function TransactionList({ transactions }) {
  return (
    <div>
      <h3>📊 Transaction History</h3>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((txn) => (
            <li key={txn._id}>
              <strong>{txn.type.toUpperCase()}</strong> — K{txn.amount} —{" "}
              {new Date(txn.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
```

---

# 🟦 Task 4 — Create Login page

### File: `frontend/src/pages/LoginPage.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        username,
        pin
      });

      if (response.data.success) {
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("accountNumber", response.data.user.accountNumber);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h1>🏧 ATM Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {message && <p className="error">{message}</p>}
    </div>
  );
}

export default LoginPage;
```

---

# 🟦 Task 5 — Create Dashboard page

### File: `frontend/src/pages/DashboardPage.jsx`

```jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionList from "../components/TransactionList";

function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const username = localStorage.getItem("username");
  const accountNumber = localStorage.getItem("accountNumber");

  const loadBalance = async () => {
    try {
      const response = await api.get(`/balance/${accountNumber}`);
      setBalance(response.data.account.balance);
    } catch (error) {
      setMessage("Failed to load balance");
    }
  };

  const loadTransactions = async () => {
    try {
      const response = await api.get(`/transactions/${accountNumber}`);
      setTransactions(response.data.transactions);
    } catch (error) {
      setMessage("Failed to load transactions");
    }
  };

  const handleDeposit = async () => {
    try {
      await api.post("/deposit", {
        accountNumber,
        amount: Number(amount)
      });

      setMessage("Deposit successful");
      setAmount("");
      loadBalance();
      loadTransactions();
    } catch (error) {
      setMessage(error.response?.data?.message || "Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    try {
      await api.post("/withdraw", {
        accountNumber,
        amount: Number(amount)
      });

      setMessage("Withdrawal successful");
      setAmount("");
      loadBalance();
      loadTransactions();
    } catch (error) {
      setMessage(error.response?.data?.message || "Withdrawal failed");
    }
  };

  useEffect(() => {
    loadBalance();
    loadTransactions();
  }, []);

  return (
    <div className="container">
      <h1>🏧 ATM Dashboard</h1>
      <p><strong>User:</strong> {username}</p>
      <p><strong>Account Number:</strong> {accountNumber}</p>
      <h2>💰 Balance: K{balance}</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="button-group">
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>

      {message && <p>{message}</p>}

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default DashboardPage;
```

---

# 🟦 Task 6 — Update App routes

### File: `frontend/src/App.jsx`

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

# 🟦 Task 7 — Update styles

### File: `frontend/src/styles.css`

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f5f7;
}

.container {
  max-width: 520px;
  margin: 40px auto;
  background: white;
  padding: 24px;
  border-radius: 8px;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 16px;
  margin-right: 10px;
  cursor: pointer;
}

.button-group {
  margin-bottom: 20px;
}

.error {
  color: red;
}
```

---

# 🟦 Task 8 — Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

### ✔ Checkpoint
- [ ] Frontend starts
- [ ] Login page appears

---

# 🟦 Task 9 — Test Full UI Flow

Use the seeded login credentials:

- username: `student1`
- pin: `1234`

After login:
- dashboard appears
- balance is loaded
- deposit changes the balance
- withdraw changes the balance
- transactions refresh on the page

### ✔ Checkpoint
- [ ] Login works in browser
- [ ] Balance loads
- [ ] Deposit works
- [ ] Withdraw works
- [ ] Transaction history loads

---

# 🧪 Reflection Questions

1. Why does the frontend call only the API Gateway?
2. Why is localStorage used here?
3. What is the role of `useEffect` in the dashboard?
4. Why do we reload balance and transactions after each action?

---

# 🚧 Milestone Gateway (Must Pass)

Before moving to Week 6:

- [ ] Frontend uses React Router
- [ ] Login page works
- [ ] Dashboard page works
- [ ] API calls go to the gateway only
- [ ] Balance displays correctly
- [ ] Deposit updates balance
- [ ] Withdraw updates balance
- [ ] Transaction history displays
- [ ] Code committed to Git

---

# 🎯 Final Note

Week 5 is complete when a student can use the browser to complete the ATM flow from start to finish.
