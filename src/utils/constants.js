// export const BASE_URL = "/api"

// export const BASE_URL = import.meta.env.MODE === "development"
//   ? "http://localhost:3000"
//   : "/api";

// export const BASE_URL = location.hostname === "localhost"
//   ? "http://localhost:3000"
//   : "/api";

export const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : "https://devtinder-be-q2f9.onrender.com";

