# Online MongoDB Atlas Database Setup Instructions

## Purpose

This guide explains how to correctly create and configure the online MongoDB Atlas database so the provided ATM backend code works properly.

The provided code has two services:

1. **Auth Service**
   - Uses the `User` model
   - Stores login details such as username, PIN, and account number

2. **Account Service**
   - Uses the `Account` model
   - Stores account number, account holder name, and balance

Both services must connect to the same online MongoDB Atlas database.

---

# 1. Create or Open MongoDB Atlas

1. Go to MongoDB Atlas.
2. Sign in to your account.
3. Create a new project, or open an existing project.
4. Create a new cluster if you do not already have one.

For this project, the cluster can be named:

```text
Cluster0
```

---

# 2. Create the Database User Correctly

Go to:

```text
Database Access
```

Click:

```text
Add New Database User
```

Create a database user similar to this:

```text
Username: maxiecletus_db_user
Password: yourRealPassword
```

Important rules:

- Do not use spaces in the username.
- Do not forget the password.
- If the password contains special characters such as `@`, `#`, `%`, `/`, or `&`, it may cause connection problems unless it is encoded.
- For classroom testing, use a simple password first, for example:

```text
Maxie12345
```

Set the user privileges to:

```text
Read and write to any database
```

This allows both services to create and access their collections.

---

# 3. Allow Network Access

Go to:

```text
Network Access
```

Click:

```text
Add IP Address
```

For testing, select:

```text
Allow Access from Anywhere
```

This usually adds:

```text
0.0.0.0/0
```

This is useful for development and classroom testing because it allows the application to connect from your current internet connection.

> Note: For production systems, you should only allow trusted IP addresses.

---

# 4. Create the Database Name

The database name used in the provided online code is:

```text
myatm
```

The MongoDB Atlas connection string must include this database name.

Correct example:

```env
MONGO_URI=mongodb+srv://maxiecletus_db_user:yourRealPassword@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

The important part is:

```text
/myatm
```

This tells MongoDB Atlas to store the project data inside the `myatm` database.

---

# 5. Use the Same MongoDB URI in Both Services

The Auth Service and Account Service must use the same online database.

## Auth Service `.env`

File location:

```text
auth-service/.env
```

Content:

```env
PORT=4001
MONGO_URI=mongodb+srv://maxiecletus_db_user:yourRealPassword@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

## Account Service `.env`

File location:

```text
account-service/.env
```

Content:

```env
PORT=4002
MONGO_URI=mongodb+srv://maxiecletus_db_user:yourRealPassword@cluster0.s0c6lz6.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

Both `.env` files should point to:

```text
myatm
```

This is important because the Auth Service creates users and the Account Service creates account records. Both records must match through the same account number.

---

# 6. Check the Models Used by the Code

The provided code creates two collections automatically when the seed files are run.

## Auth Service Collection

The Auth Service uses this model:

```javascript
module.exports = mongoose.model("User", userSchema);
```

MongoDB will create a collection called:

```text
users
```

The seeded user will be:

```json
{
  "username": "student1",
  "pin": "1234",
  "accountNumber": "ACC001"
}
```

## Account Service Collection

The Account Service uses this model:

```javascript
module.exports = mongoose.model("Account", accountSchema);
```

MongoDB will create a collection called:

```text
accounts
```

The seeded account will be:

```json
{
  "accountNumber": "ACC001",
  "name": "Student One",
  "balance": 1000
}
```

The important matching field is:

```text
ACC001
```

The user and account must use the same account number.

---

# 7. Install Dependencies

Open a terminal inside the Auth Service folder:

```bash
cd auth-service
npm install
```

Then open another terminal inside the Account Service folder:

```bash
cd account-service
npm install
```

This installs the required packages:

- express
- mongoose
- dotenv
- cors

---

# 8. Seed the Online Database

Seeding means adding test data to MongoDB Atlas.

## Seed Auth Service

```bash
cd auth-service
npm run seed
```

Expected output:

```text
✅ Connected to MongoDB Atlas for Auth seeding
✅ Auth users seeded successfully
```

This creates data inside:

```text
Database: myatm
Collection: users
```

## Seed Account Service

```bash
cd account-service
npm run seed
```

Expected output:

```text
✅ Connected to MongoDB Atlas for Account seeding
✅ Accounts seeded successfully
```

This creates data inside:

```text
Database: myatm
Collection: accounts
```

---

# 9. Confirm the Data in MongoDB Atlas

In MongoDB Atlas, go to:

```text
Database > Browse Collections
```

You should see:

```text
myatm
```

Inside `myatm`, you should see these collections:

```text
users
accounts
```

The `users` collection should contain:

```text
student1
1234
ACC001
```

The `accounts` collection should contain:

```text
ACC001
Student One
1000
```

If you do not see these collections, the seed command did not run successfully.

---

# 10. Start the Services

## Start Auth Service

```bash
cd auth-service
npm start
```

Expected output:

```text
✅ Auth Service connected to MongoDB Atlas
🚀 Auth Service running on port 4001
```

## Start Account Service

Open another terminal:

```bash
cd account-service
npm start
```

Expected output:

```text
✅ Account Service connected to MongoDB Atlas
🚀 Account Service running on port 4002
```

Both services must keep running in separate terminals.

---

# 11. Test the Online Database Connection

## Test Auth Health

```http
GET http://localhost:4001/health
```

Expected result:

```json
{
  "service": "auth-service",
  "status": "running",
  "database": "MongoDB Atlas"
}
```

## Test Account Health

```http
GET http://localhost:4002/health
```

Expected result:

```json
{
  "service": "account-service",
  "status": "running",
  "database": "MongoDB Atlas"
}
```

---

# 12. Test Login

Send a POST request:

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

Expected result:

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

If this works, it means the Auth Service is correctly reading from MongoDB Atlas.

---

# 13. Test Account Balance

Send a GET request:

```http
GET http://localhost:4002/api/account/balance/ACC001
```

Expected result:

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

If this works, it means the Account Service is correctly reading from MongoDB Atlas.

---

# 14. Common Problems and Fixes

## Problem 1: Authentication Failed

Example error:

```text
bad auth : authentication failed
```

Fix:

- Check the username.
- Check the password.
- Make sure the password in `.env` is the database user password, not your MongoDB Atlas login password.
- If the password has special characters, create a simpler password or URL-encode it.

---

## Problem 2: Cannot Connect to MongoDB Atlas

Fix:

- Go to Network Access.
- Add your current IP address.
- For testing, use `0.0.0.0/0`.
- Make sure your internet connection is working.

---

## Problem 3: Database or Collections Do Not Show

Fix:

Run the seed commands again:

```bash
cd auth-service
npm run seed
```

```bash
cd account-service
npm run seed
```

MongoDB creates the database and collections only after data is inserted.

---

## Problem 4: Login Works but Balance Does Not Work

Fix:

Check that both records use the same account number:

```text
ACC001
```

The Auth Service user must have:

```json
"accountNumber": "ACC001"
```

The Account Service account must also have:

```json
"accountNumber": "ACC001"
```

---

## Problem 5: `.env` File Not Working

Fix:

Make sure the `.env` file is placed directly inside each service folder:

```text
auth-service/.env
account-service/.env
```

Do not place `.env` inside the `src` folder.

Correct:

```text
auth-service/.env
```

Wrong:

```text
auth-service/src/.env
```

---

# 15. Final Online Setup Checklist

Use this checklist before testing the application.

- [ ] MongoDB Atlas cluster is created
- [ ] Database user is created
- [ ] Database user has read and write access
- [ ] Network access is allowed
- [ ] MongoDB URI includes `/myatm`
- [ ] Auth Service `.env` has the correct Atlas URI
- [ ] Account Service `.env` has the correct Atlas URI
- [ ] `npm install` has been run in both services
- [ ] Auth seed has been run
- [ ] Account seed has been run
- [ ] `users` collection exists in Atlas
- [ ] `accounts` collection exists in Atlas
- [ ] Auth Service starts on port `4001`
- [ ] Account Service starts on port `4002`
- [ ] Login works
- [ ] Balance check works
- [ ] Deposit works
- [ ] Withdraw works

---

# Final Note

For the online version, the most important file is the `.env` file.

Both services must use the same MongoDB Atlas URI and the same database name:

```text
myatm
```

The correct connection pattern is:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/myatm?retryWrites=true&w=majority&appName=Cluster0
```

If the database is created correctly online, the existing code will work without changing the controllers, routes, models, or seed files.
