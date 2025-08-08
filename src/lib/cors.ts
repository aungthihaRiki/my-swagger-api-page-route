import Cors from "cors";

const allowedOrigins = [
  // "*", Allow all origins
  "http://localhost:3000",
  "https://my-swagger-api-page-route.vercel.app/",  // production url
];

export const cors = Cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
});
