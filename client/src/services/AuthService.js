const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const signup = async (payload) =>
    fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then((res) => res.json());

export const login = async (payload) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then((res) => res.json());

export const getSecurityQuestions = async (mobile) =>
    fetch(`${BASE_URL}/auth/get-security-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
    }).then((res) => res.json());

export const resetPassword = async (payload) =>
    fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then((res) => res.json());
