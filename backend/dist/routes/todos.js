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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// POST /todos - Creating a new todo
router.post("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content, completed, published } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const newTodo = yield prisma.todo.create({
            data: {
                title,
                content,
                completed: completed || false,
                published: published || false,
                userId,
            },
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error("Error creating a todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// GET /todos - Getting all todos
router.get("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const todos = yield prisma.todo.findMany({
            where: { userId: userId },
        });
        res.status(200).json(todos);
    }
    catch (error) {
        console.error("Error retrieving todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// GET /todos/:id - Getting a specific todo
router.get("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const todoId = parseInt(req.params.id);
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const todo = yield prisma.todo.findFirst({
            where: { id: todoId, userId: userId },
        });
        if (todo) {
            res.status(200).json(todo);
        }
        else {
            res.status(404).json({ message: "Todo not found" });
        }
    }
    catch (error) {
        console.error("Error finding todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// PUT /todos/:id - Updating a specific todo
router.put("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const todoId = parseInt(req.params.id);
    const { title, content, completed, published } = req.body;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    try {
        const updatedTodo = yield prisma.todo.update({
            where: { id: todoId, userId: userId },
            data: { title, content, completed, published },
        });
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// DELETE /todos/:id - Deleting a specific todo
router.delete("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const todoId = parseInt(req.params.id);
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
    try {
        yield prisma.todo.delete({
            where: { id: todoId, userId: userId },
        });
        res.status(200).send("Todo deleted successfully");
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// DELETE /todos - Deleting all todos for the authenticated user
router.delete("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.id;
    try {
        const deleteResult = yield prisma.todo.deleteMany({
            where: { userId: userId },
        });
        res
            .status(200)
            .json({ message: `Deleted ${deleteResult.count} todos successfully.` });
    }
    catch (error) {
        console.error("Error deleting todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
