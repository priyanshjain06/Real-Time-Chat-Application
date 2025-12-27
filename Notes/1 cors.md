# CORS (Cross-Origin Resource Sharing) - Complete Guide

## 1️⃣ What is CORS?

**CORS = Cross-Origin Resource Sharing**

It is a browser security mechanism that controls which websites are allowed to access resources from another website.

## 2️⃣ What is an "origin"?

An origin = protocol + domain + port

**Examples:**

- `https://example.com` → one origin
- `http://example.com` → different origin (different protocol)
- `https://api.example.com` → different origin (different domain)
- `https://example.com:3000` → different origin (different port)

If any one part differs, it's a cross-origin request.

## 3️⃣ The core problem (why CORS exists)

**Imagine this situation:**

- You are logged into your bank website
- Your browser has cookies / session tokens
- You open a malicious website in another tab

**Without protection:** 👉 That malicious site could secretly send requests to your bank using your login session and steal data.

**This is very dangerous!**

## 4️⃣ Then why do we need CORS?

Modern apps must communicate across origins.

**Examples:**

- Frontend: `https://myapp.com`
- Backend API: `https://api.myapp.com`
- Third-party APIs (maps, payments, auth)

**Without CORS:**

- ❌ Browser blocks responses
- ❌ Modern web apps break

So we need a controlled exception to Same-Origin Policy.

👉 **That controlled exception is CORS.**

## 5️⃣ How CORS works (simple flow)

### Step 1: Browser sends a request with an Origin header

```http
Origin: https://myapp.com
```

### Step 2: Server replies with headers like

```http
Access-Control-Allow-Origin: https://myapp.com
```

### Step 3: Browser checks

- If allowed → response is accessible ✅
- If not allowed → response is blocked ❌

**Server decides. Browser enforces.**
