# authController.js

## 1️⃣ multer — file handling in Express

### Multer

**What problem it solves**

- HTTP forms send files as `multipart/form-data`
- Express cannot read files by default

👉 **multer** is a middleware that:

- Reads file data from request
- Makes it available as `req.file` / `req.files`

**How it works (internally)**

```
Browser → multipart request
    ↓
Multer parses binary stream
    ↓
Attaches file info to req.file
```

**Typical usage**

```javascript
const upload = multer({ storage: multer.memoryStorage() });
app.post("/upload", upload.single("image"), controller);
```

**Why memoryStorage()?**

- Stores file in RAM (buffer)
- Required for Cloudinary streaming

---

## 2️⃣ sharp — image optimization

### Sharp

**What it does**

- Resize images
- Compress images
- Convert formats (PNG → JPEG/WebP)

**Why necessary**

- Uploaded images are huge
- Large images = slow app + high storage cost

**Typical use**

```javascript
const processedImage = await sharp(req.file.buffer)
  .resize(300, 300)
  .jpeg({ quality: 80 })
  .toBuffer();
```

**Position in flow**

```
Multer → Sharp → Cloudinary
```

---

## 3️⃣ bcrypt — password security

### bcryptjs

**Why password hashing is mandatory**

- Passwords must never be stored as plain text
- Databases can leak

**What bcrypt does**

- Converts password → irreversible hash
- Adds salt to prevent rainbow-table attacks

**Usage**

```javascript
const hash = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hash);
```

**Key rule**

- ❌ Never decrypt
- ✔ Always compare hashes

---

## 4️⃣ HTTP Status Codes

### 200 OK

- ✔ Request succeeded
- ✔ Data fetched / updated / saved

```javascript
res.status(200).json({ success: true });
```

### 400 Bad Request

- ❌ Client sent invalid data
- ❌ Missing fields / wrong format

```javascript
res.status(400).json({ message: "Invalid input" });
```

### 500 Internal Server Error

- ❌ Bug or server failure
- ❌ DB error, crash, exception

```javascript
res.status(500).json({ message: "Server error" });
```

---

## 5️⃣ findOne() — MongoDB read

### Mongoose

**What it does**

Finds first document matching condition

```javascript
const user = await User.findOne({ email });
```

**Returns**

- `Document` → found
- `null` → not found

**Use cases**

- Login
- Check existing user
- Fetch by email/username

---

## 6️⃣ .save() method

**What it does**

Persists a document into MongoDB

**Example**

```javascript
const user = new User({ name, email });
await user.save();
```

**When used**

- Creating new data
- Updating fetched document manually

**Important**

- Triggers schema validation
- Slower than atomic updates

---

## 7️⃣ Cloudinary upload_stream

### Cloudinary

**Your code**

```javascript
const uploadStream = cloudinary.uploader.upload_stream(
  { folder: "profile_pics" },
  callback
);
```

**What this means**

- Uploads image directly from memory
- No temporary file on server
- Uses Node.js streams

**Why stream is used**

- ✔ Faster
- ✔ Scalable
- ✔ Less disk usage

**Full flow**

```
Multer (buffer)
    ↓
Sharp (optimize)
    ↓
Cloudinary upload_stream
    ↓
URL returned
```

---

## 8️⃣ findById()

**What it does**

Finds document using `_id`

```javascript
const user = await User.findById(userId);
```

**Difference from findOne**

| Method | Use |
|--------|-----|
| `findOne` | any field |
| `findById` | only `_id` |

---

## 9️⃣ findByIdAndUpdate() — DEEP EXPLANATION

**Your code**

```javascript
const updatedUser = await User.findByIdAndUpdate(
  req.user._id,
  { profilePic: result.secure_url },
  { new: true }
);
```

### Step-by-step breakdown

**1️⃣ `req.user._id`**

- User ID from authentication middleware

**2️⃣ `{ profilePic: result.secure_url }`**

- Field to update
- URL returned by Cloudinary

**3️⃣ `{ new: true }`**

- Return updated document
- Without this → old document returned

**Internally**

```
Find user by ID
    ↓
Update profilePic field
    ↓
Save atomically
    ↓
Return updated user
```

---

## 🔟 .save() vs findByIdAndUpdate()

| Feature | save() | findByIdAndUpdate() |
|---------|--------|---------------------|
| Requires fetch | Yes | No |
| Atomic | ❌ | ✔ |
| Faster | ❌ | ✔ |
| Validation | ✔ | Optional |

```
save needs all fields & runs schema validations and returns the documenet  but FindByIdAndUpdate doesnt need all only updating fields are needed ! nor return nor schema validation 
```

---

## 1️⃣1️⃣ Complete backend upload logic (mental model)

```
Client uploads image
    ↓
Multer reads file
    ↓
Sharp optimizes image
    ↓
Cloudinary stores image
    ↓
MongoDB saves image URL
    ↓
Client receives updated user
```

---

## 🔑 Interview-ready one-liners

- **multer** → file upload middleware
- **sharp** → image optimization
- **bcrypt** → secure password hashing
- **200** → success
- **400** → client error
- **500** → server error
- **findOne** → first matching document
- **save** → persist document
- **upload_stream** → memory-based upload
- **findByIdAndUpdate** → atomic update by ID

# giphyController.js

## Why axios is used (important reasons)

| Problem | axios solution |
|---------|---------------|
| Send API requests | Simple syntax |
| Handle JSON | Auto parse/serialize |
| Error handling | Built-in |

---

## Basic request types

### GET (fetch data)

```javascript
const res = await axios.get("/api/users");
```

### POST (send data)

```javascript
const res = await axios.post("/api/login", {
  email,
  password
});
```

### PUT / PATCH (update)

```javascript
axios.put("/api/user/1", data);
```

### DELETE

```javascript
axios.delete("/api/user/1");
```

---

## 4️⃣ axios vs fetch (INTERVIEW FAVORITE)

| Feature | axios | fetch |
|---------|-------|-------|
| JSON parsing | Automatic | Manual |
| Error handling | Better | Poor |
| Request timeout | ✔ | ❌ |
| Interceptors | ✔ | ❌ |
| Browser support | ✔ | ✔ |

---

## axios response structure

```javascript
const res = await axios.get("/api/profile");
```

**Response object:**

```javascript
res.data    // actual data
res.status  // HTTP status (200, 400, 500)
res.headers // response headers
```

---

## Sending headers (JWT, auth)

```javascript
axios.get("/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

**Used with:**

- JWT authentication
- Protected routes

---

## What is req.query

Query parameters come from URL after `?`

**Example:**

```
/search?q=cat&limit=5
```

**Result:**

| URL | query | limit |
|-----|-------|-------|
| `/search?q=dog` | `dog` | `10` |
| `/search` | `funny` | `10` |

**Benefits:**

- ✔ Default values prevent crashes
- ✔ Backend stays stable

---

## The URL itself (MOST IMPORTANT PART)

```javascript
const url = `https://api.giphy.com/v1/stickers/search?api_key=${apiKey}&q=${encodeURIComponent(
  query
)}&limit=${limit}`;
```

Let's break this piece by piece.

---

## 6️⃣ `?` → start of query string

```
?
```

Everything after `?` is `key=value` pairs.

---

## 7️⃣ `api_key=${apiKey}`

```
api_key=YOUR_API_KEY
```

**Purpose:**

- Required by Giphy for authentication
- Identifies your app

---

## 8️⃣ `q=${encodeURIComponent(query)}`

### What `q` means

- `q` = search keyword
- Example: `q=funny cat`

### Why encodeURIComponent

```javascript
encodeURIComponent("funny cat")
```

**➡ Converts:**

```
"funny cat" → "funny%20cat"
```

### Why needed

- ❌ URLs cannot contain spaces or special characters
- ✔ Encoding makes URL safe

**Without encoding:**

```
?q=funny cat ❌ (broken URL)
```

**With encoding:**

```
?q=funny%20cat ✔
```

---

## 9️⃣ `&limit=${limit}`

```
limit=10
```

**Purpose:**

- Limits number of results
- Prevents large responses

---

## Final URL (example)

**If:**

```javascript
query = "funny dog"
limit = 5
```

**Final URL becomes:**

```
https://api.giphy.com/v1/stickers/search
?api_key=abc123
&q=funny%20dog
&limit=5
```

---

## How this URL is used with axios

```javascript
const response = await axios.get(url);
```

**Flow:**

```
Client → Express route
    ↓
URL constructed
    ↓
Axios sends request
    ↓
Giphy responds with JSON
    ↓
Backend sends response to frontend
```

# messageController.js

## Find all users whose _id is NOT equal to loggedInUserId

```javascript
// Find all users whose _id is NOT equal to loggedInUserId
const filteredUsers = await User.find({
  _id: { $ne: loggedInUserId },
}).select("-password");
```
 What select("-password") does
```
The - sign means exclude
This tells Mongoose:
“Return all fields except password”
```

---

## What is req.params?

### Express

`req.params` contains **route parameters** — values that come from the URL path itself, not from query strings or body.

### How req.params is created

It is created by Express routing, based on how you define the route.

**Route definition**

```javascript
app.get("/users/:id", controller);
```

**Incoming request**

```
GET /users/123
```

**Inside controller**

```javascript
req.params
// { id: "123" }
```

**So:**

```javascript
req.params.id === "123"
```

---

## req.params vs req.query vs req.body (VERY IMPORTANT)

| Source | Comes from | Example URL | Access |
|--------|------------|-------------|--------|
| `req.params` | URL path | `/users/123` | `req.params.id` |
| `req.query` | After `?` | `/users?q=cat` | `req.query.q` |
| `req.body` | Request body | POST/PUT data | `req.body.name` |

---

## What populate() actually does

`populate()` is a Mongoose feature that replaces an ObjectId reference with the actual referenced document.

### Mongoose

---

## 3️⃣ Why populate is REQUIRED here

### Without populate (problem)

Frontend would receive:

```javascript
senderId: "64fa123..."
```

**Frontend cannot:**

- Show username
- Show sticker image
- Show sticker title

**Frontend should not query DB again.**

---

## 4️⃣ Populate #1 — sticker

```javascript
.populate("sticker", "giphyId title url")
```

### What this means

- `sticker` is a field in Message schema
- It stores Sticker document `_id`
- Populate replaces it with Sticker data

### Result

```javascript
sticker: {
  giphyId: "abc123",
  title: "Funny Cat",
  url: "https://..."
}
```

### Why select only these fields

- Avoid sending unnecessary DB fields
- Reduce payload size
- Improve performance

---

## 5️⃣ Populate #2 — senderId

```javascript
.populate("senderId", "username")
```

### Before populate

```javascript
senderId: "64fa..."
```

### After populate

```javascript
senderId: {
  _id: "64fa...",
  username: "priyansh"
}
```

### Why needed

- Chat UI must show sender name
- IDs alone are meaningless to users

---

## 6️⃣ Populate #3 — receiverId

```javascript
.populate("receiverId", "username")
```

**Same logic as sender:**

- Needed to identify the other participant
- Used for UI rendering and logic

---

## 7️⃣ Why not populate everything?

**Because:**

- More data = slower query
- More memory usage
- More network cost

**That's why you see:**

```javascript
"giphyId title url"
"username"
```

This is **controlled population** (best practice).

---

## 💡 Key Insight

`newMessage` is populated so that the receiver (and sender) immediately gets **full, usable data** (sticker details) instead of just an ObjectId.