# REST Methods & Route Protection Guide

## What are REST Methods?

REST methods are HTTP verbs that describe what action you want to perform on a resource.

---

## Idempotency (VERY IMPORTANT)

| Method | Idempotent? |
|--------|-------------|
| GET    | ✔           |
| POST   | ❌          |
| PUT    | ✔           |
| PATCH  | ❌          |
| DELETE | ✔           |

**Idempotent = same request → same result**

---

## What does "protect route" mean?

A protected route uses an authentication middleware that verifies the user before allowing access.

Usually done using:
* JWT / session
* Middleware that sets `req.user`

---

## 2️⃣ Why GET routes must be protected

### ❌ Wrong assumption
"GET only reads data, so no need to protect"

**This is false.**

### Example: GET without protection (DANGEROUS)
```
GET /api/users/me
```

If unprotected:
* Anyone can fetch user profile
* Anyone can read private messages
* Anyone can access personal data

---

## Why PUT routes must be protected (OBVIOUS but critical)

PUT updates data.

### If PUT is not protected
```
PUT /api/users/123
```

Anyone could:
* Change username
* Change profile picture
* Change email

**This is a complete security failure.**

### Solution:
```
router.put("/profile", protectRoute, updateProfile);
```

✔ Only logged-in user can update  
✔ `req.user._id` is trusted

---

## Why SAME middleware for GET and PUT

Because both need:
* User identity
* Permission check

---

## Important Note

👉 **YES** — `POST`, `PATCH`, and `DELETE` also NEED protected routes in MOST real apps.