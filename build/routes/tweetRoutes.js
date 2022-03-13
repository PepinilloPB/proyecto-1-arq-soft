"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = require("../controllers/tweetController");
class TweetRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tweetController_1.tweetController.index);
        this.router.get('/:id', tweetController_1.tweetController.list);
        this.router.post('/:id', tweetController_1.tweetController.create);
    }
}
const tweetRoutes = new TweetRoutes();
exports.default = tweetRoutes.router;
