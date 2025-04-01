# 🚀 **Deployment Guide**

---

## 📌 **Step 1: Delete `node_modules`** 🗑️

Before deployment, remove the `node_modules` folder from both **frontend** and **backend**:

```sh
rm -rf frontend/node_modules backend/node_modules
```

---

## 📌 **Step 2: Initialize `package.json` in Root** 📂

Go to the **🌟 ROOT FOLDER (outside of frontend & backend folders) 🌟** and run:

```sh
npm init -y
```

Now, update the `package.json` file in the **root folder**:

```json
"scripts": {
    "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
    "start": "npm run start --prefix backend" //🔹 This will call the backend `package.json` file
}
```

---

## 📌 **Step 3: Backend Configuration 🛠️**

Inside the **`backend`** folder, update `package.json`:

```json
"scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
}
```

Now, go to **`backend/src/index.js`** and add:

```js
import path from "path";
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
```

✅ **Here, `index.html` is the entry point of our React application.**

---

## 📌 **Step 4: Frontend Configuration 🎨**

### 🔹 **Update `axios.js`**

Inside the **frontend** folder, modify `axios.js`:

```js
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api",
  withCredentials: true,
});
```

### 🔹 **Update `useAuthStore.js`**

Modify the `BASE_URL`:

```js
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
```

### 🔹 **Change the Title in `index.html`** 🏷️

Navigate to `frontend/dist/index.html` and **update the `<title>`** tag to match your project’s name.

---

## 📌 **Step 5: Create `.gitignore` 📄**

In the **🌟 ROOT FOLDER (outside of frontend & backend folders) 🌟**, create a `.gitignore` file and add:

```plaintext
/node_modules
/dist
.env
```

---

## 📌 **Step 6: Push Code to GitHub 🛠️**

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 📌 **Step 7: Deploy on Render 🌍**

1. Go to **[Render](https://render.com)**.
2. Create a **New Web Service**.
3. Connect your GitHub repository.
4. Set the **build command**:
   ```sh
   npm run build
   ```
5. Set the **start command**:
   ```sh
   npm run start
   ```
6. Add **environment variables**.

---

## 📌 **Step 8: Generate & Add `JWT_SECRET_KEY` 🔑**

Run the following command **in the 🌟 ROOT FOLDER (outside of frontend & backend folders) 🌟**:

```sh
openssl rand -base64 32
```

Copy the generated key and add it to your **Render environment variables** as:

```plaintext
JWT_SECRET_KEY=<your-generated-token>
```

---

## 🎉 **Deployment Complete!** 🚀🎊

Your app is now live on **Render**! 🥳
