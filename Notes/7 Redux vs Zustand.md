# Zustand vs Redux Comparison Guide

## Similarity Comparison Table

| Aspect         | Zustand    | Redux |
| -------------- | ---------- | ----- |
| Setup          | Very small | Large |
| Actions        | ❌          | ✔     |
| Reducers       | ❌          | ✔     |
| Slices         | ❌          | ✔     |
| Learning curve | Low        | High  |

**Zustand code is typically 5–10× smaller.**

---

## 3️⃣ Performance Model

### Zustand
* Components subscribe to exact state slices
* Fewer re-renders by default
* No context re-render cascade

### Redux
* Uses React Context internally
* Needs selectors & memoization
* Can cause unnecessary re-renders if misused

**Advantage: Zustand (simpler to keep performant)**

---

## 4️⃣ Async Logic (API Calls)

### Zustand
```javascript
fetchUser: async () => {
  const res = await axios.get("/me");
  set({ user: res.data });
}
```

✔ No middleware  
✔ Straightforward async logic

### Redux (Toolkit)
```javascript
createAsyncThunk(...)
extraReducers(...)
```

✔ Very powerful  
❌ Verbose

---

## Zustand Core Concepts

### 1️⃣ `set` — Update State

#### What `set` does
* Updates the store state
* Triggers re-render only for subscribed components

#### Do NOT mutate state directly
* ✔ Always return a new object (or partial)

---

### 2️⃣ `get` — Read Current State (inside store only)

#### What `get` does
* Reads the latest store state
* Used inside the store definition

---

### 3️⃣ `getState()` — Read State from Outside React

#### What `getState()` does
* Reads store state without hooks
* Used outside components
```javascript
useStore.getState()
```

#### Example: inside non-React code
```javascript
const token = useStore.getState().token;
```

#### Used in:
* Axios interceptors
* WebSocket handlers
* Utility files
* Event listeners

---

## Comparison Table (VERY IMPORTANT)

| Feature            | `set`        | `get`        | `getState()`  |
| ------------------ | ------------ | ------------ | ------------- |
| Purpose            | Update state | Read state   | Read state    |
| Where used         | Inside store | Inside store | Outside store |
| Triggers re-render | ✔            | ❌            | ❌             |
| Hook required      | ❌            | ❌            | ❌             |