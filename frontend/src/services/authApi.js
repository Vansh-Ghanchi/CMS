import API from "./api";

export const loginUser = (credentials) => {
  return API.post("/auth/login", {
    email: credentials.email,
    password: credentials.password,
    role: credentials.role, // 🔥 IMPORTANT
  });
};