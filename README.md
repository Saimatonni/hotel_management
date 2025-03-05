# 🏨 Hotel Management System

A full-featured **Hotel Management System** built with **Next.js, Prisma, MySQL, and Tailwind CSS**.  
This platform allows hotel owners to manage properties and share.  

🔗 **Live Demo:** [Click Here](https://your-demo-link.com)  

---

## ✨ Features
- 🔑 **Authentication** (Sign in / Sign up with Email & Social Logins (Google))
- 🏠 **Property Management** (CRUD for hotels)
- 🗃️ **Pagination & Filtering** (Seamless browsing experience)
- ⚡ **Fast & Optimized** (Server-side rendering with Next.js)
- 📛 **Database Management** (MySQL deployed on Aiven, with an option to use a local database)

---

## 🛠️ Installation Guide

### **1⃣ Clone the Repository**
```sh
git clone https://github.com/Saimatonni/hotel_management.git
cd hotel-management
```

### **2⃣ Install Dependencies**
```sh
npm install
# OR
yarn install
```

### **3⃣ Set Up Database with Prisma**
> **Note:** The MySQL database is deployed on **Aiven**. 

#### **Using a Local Database**
1. Install MySQL locally and create a new database.
2. Update your `.env` file with the local database connection string:
   ```sh
   DATABASE_URL="mysql://user:password@localhost:3306/your_database"
   ```
3. Run the following commands:
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### **4⃣ Start the Development Server**
```sh
npm run dev
# OR
yarn dev
```

Your project is now running at [http://localhost:3000](http://localhost:3000) 🎉

