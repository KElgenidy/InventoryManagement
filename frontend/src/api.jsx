import axios from "axios";

/**
 * Creates an Axios instance with a base URL and default headers.
 *
 * The base URL is read from the `VITE_API_URL` environment variable, which is
 * expected to be set during the build process.
 *
 * The default headers include a `Content-Type` of `application/json`, which is
 * commonly used for JSON-based APIs.
 *
 * This Axios instance can be used throughout the application to make API
 * requests to the backend server.
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});


export default api;
