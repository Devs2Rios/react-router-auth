import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
    const storedExpiration = localStorage.getItem('token_expiration'),
        expiration = new Date(storedExpiration),
        now = new Date(),
        duration = expiration.getTime() - now.getTime();
    return duration;
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const duration = getTokenDuration();
    if (duration < 0) return 'EXPIRED';
    return token;
};

export const setToken = (token) => localStorage.setItem('token', token);

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
};

export const tokenLoader = () => {
    return getToken();
};

export const checkAuthTokenLoader = () => {
    const token = getToken();
    if (!token) return redirect('/auth');
    return null;
};