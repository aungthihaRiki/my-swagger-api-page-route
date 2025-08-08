import Cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://my-swagger-api-page-route.vercel.app",
];

export const cors = Cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
});
