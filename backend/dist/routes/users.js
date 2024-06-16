"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../middleware/auth");
dotenv_1.default.config();
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// POST /users/register
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
        const user = yield prisma.user.create({
            data: { email, password: hashedPassword },
        });
        const secret = process.env.JWT_SECRET || "default_secret";
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, {
            expiresIn: "24h",
        });
        return res
            .status(201)
            .json({ token: token, userId: user.id, email: email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// POST /users/login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).send("User does not exist. Please register");
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid credentials");
        }
        const secret = process.env.JWT_SECRET || "default_secret";
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, {
            expiresIn: "24h",
        });
        res.status(200).json({
            userId: user.id,
            token: token,
            message: "Login successful",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// PUT /users/update
router.put("/update", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: { email, password: hashedPassword },
        });
        res
            .status(200)
            .json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// GET /users/:id
router.get("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            select: { email: true, password: true },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// DELETE /users/delete
router.delete("/delete", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        yield prisma.todo.deleteMany({
            where: { userId: userId },
        });
        yield prisma.user.delete({
            where: { id: userId },
        });
        res
            .status(200)
            .send("User account and all related todos deleted successfully");
    }
    catch (error) {
        console.error("Error deleting user or todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Protected route
router.get("/protected", auth_1.auth, (req, res) => {
    res.send("The user is authenticated and can access this route");
});
exports.default = router;
