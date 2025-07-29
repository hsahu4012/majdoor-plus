import api from './api';

export const signup = (payload) => api.post('/auth/signup', payload);
export const apiLogin = (payload) => api.post('/auth/login', payload);
export const getSecurityQuestions = (mobile) => api.post('/auth/get-security-questions', { mobile });
export const resetPassword = (payload) => api.post('/auth/reset-password', payload);
