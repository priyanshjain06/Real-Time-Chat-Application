# JWT Authentication Flow - Complete Step-by-Step Guide

## 🔁 High-level picture (before details)

**JWT = proof of identity**  
**Cookie = secure delivery vehicle**

👉 **JWT lives inside an HTTP-only cookie.**

---

## STEP 0️⃣ — User is NOT logged in

- Browser has no auth cookie
- User cannot access protected APIs
- Server treats user as unauthenticated

---

## STEP 1️⃣ — User submits login form
**(Browser → Server)**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@test.com",
  "password": "123456"
}
```

- Browser sends credentials
- No token yet
- This is a normal HTTP request

---

## STEP 2️⃣ — Server verifies credentials
**(Server internal logic)**

Server checks:
- User exists
- Password matches (hashed compare)

**If invalid** → ❌ reject  
**If valid** → ✅ continue

---

## STEP 3️⃣ — Server creates JWT
**(Server only)**

```javascript
jwt.sign(
  { userId },
  JWT_SECRET,
  { expiresIn: "7d" }
);
```

**JWT now contains:**
- `userId` (identity)
- expiry time
- signature (cannot be forged)

👉 **JWT is NOT stored in DB**

---

## STEP 4️⃣ — Server puts JWT into HTTP-only cookie
**(Server → Browser)**

```javascript
res.cookie("jwt", token, {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### Why this matters
- Browser stores cookie automatically
- JavaScript cannot read it
- Protects against XSS
- `sameSite=strict` protects against CSRF

**Browser now has:**

```
Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## STEP 5️⃣ — Browser stores cookie automatically
**(Browser behavior)**

- Cookie is saved for that domain
- JS cannot access it
- User sees login success
- No manual token handling

👉 **This is a huge security advantage.**

---

## STEP 6️⃣ — Browser makes future API requests
**(Browser → Server)**

```http
GET /api/messages
Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### Key point:
- Browser sends cookie automatically
- No headers added by JS
- No token exposed to frontend code

---

## STEP 7️⃣ — Auth middleware reads cookie
**(Server middleware)**

```javascript
const token = req.cookies.jwt;
```

- Cookie parser extracts JWT
- Middleware gets token safely

**If cookie missing** → ❌ unauthorized

---

## STEP 8️⃣ — Server verifies JWT
**(Server only)**

```javascript
jwt.verify(token, JWT_SECRET);
```

**Checks:**
- Signature is valid
- Token not expired
- Token not tampered

**If invalid** → ❌ reject  
**If valid** → ✅ continue

---

## STEP 9️⃣ — Server attaches user to request
**(Server middleware)**

```javascript
req.user = decoded.userId;
```

**Now:**
- Server knows who the user is
- Controllers can trust `req.user`

---

## STEP 🔟 — Protected route executes
**(Server → Browser)**

```javascript
res.json({ messages });
```

👉 **User successfully accesses protected data.**

---

## STEP 1️⃣1️⃣ — User refreshes page / reopens browser
**(Browser behavior)**

- Cookie still exists (until expiry)
- Browser sends cookie again
- User stays logged in

👉 **No re-login needed**

---

## STEP 1️⃣2️⃣ — Logout flow
**(Browser → Server)**

```http
POST /api/auth/logout
```

**Server clears cookie:**

```javascript
res.cookie("jwt", "", { maxAge: 0 });
```

👉 **Browser deletes cookie → session ends.**

---

## 📊 Visual Summary

```
┌─────────────┐                    ┌─────────────┐
│   Browser   │                    │   Server    │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │  1. POST /login (credentials)    │
       │─────────────────────────────────>│
       │                                  │
       │                          2. Verify user
       │                          3. Create JWT
       │                          4. Set cookie
       │                                  │
       │  5. Set-Cookie: jwt=...         │
       │<─────────────────────────────────│
       │                                  │
   6. Cookie                              │
   stored                                 │
       │                                  │
       │  7. GET /messages                │
       │     Cookie: jwt=...              │
       │─────────────────────────────────>│
       │                                  │
       │                          8. Verify JWT
       │                          9. Attach user
       │                          10. Execute route
       │                                  │
       │  11. Response (protected data)   │
       │<─────────────────────────────────│
       │                                  │
```

---

## 🔐 Security Benefits

| Feature | Benefit |
|---------|---------|
| **httpOnly** | JavaScript cannot access token → XSS protection |
| **sameSite: strict** | Cookie only sent to same domain → CSRF protection |
| **secure: true** | Cookie only sent over HTTPS → Man-in-the-middle protection |
| **JWT signature** | Token cannot be forged → Integrity protection |
| **No DB lookup** | Fast verification → Performance |
| **Stateless** | Easy to scale → Scalability |

---

## 💡 Key Takeaways

1. **JWT is NOT stored in database** — It's self-contained
2. **Cookie is sent automatically** — No manual header handling
3. **httpOnly prevents XSS** — JavaScript cannot steal token
4. **sameSite prevents CSRF** — Cross-site attacks blocked
5. **Server verifies on every request** — Using JWT_SECRET
6. **No session storage needed** — Fully stateless
7. **Works across devices** — Each device has its own cookie

👉 **This is the modern, secure way to handle authentication.**