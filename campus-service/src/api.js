import axios from "axios";

// Works locally via Vite proxy  → /api → http://localhost:5000
// Works on EC2 via Nginx proxy  → /api → http://localhost:5000 (same machine)
const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;