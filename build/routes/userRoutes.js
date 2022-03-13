"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/:id', userController_1.userController.follow);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
