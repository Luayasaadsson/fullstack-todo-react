import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { auth } from "./middleware/auth";
import userRoutes from "./routes/users";
import todoRoutes from "./routes/todos";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const corsOptions = {
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "https://fullstack-todolist-react.netlify.app",
  ],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/todos", auth, todoRoutes);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
