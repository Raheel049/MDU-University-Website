import axios from 'axios';

// 1. Instance Create karein
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// 2. Request Interceptor (Token attach karne ke liye)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor (Auto-Logout ke liye)
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Agar response 200 OK hai to data janay do
    },
  (error) => {
    // Agar Backend 401 (Unauthorized) ya 403 (Forbidden) bhejta hai
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("Token expire ho gaya ya invalid hai. Logging out...");
      
      localStorage.removeItem("token"); // LocalStorage saaf karo
      window.location.href = "/login"; // Dhakka de kar login page par bhejo
    }
    return Promise.reject(error);
  }
);

// 4. Sab se aakhir mein export karein
export default axiosInstance;