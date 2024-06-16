import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users";
import todoRoutes from "./routes/todos";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
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
app.use("/todos", todoRoutes);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
