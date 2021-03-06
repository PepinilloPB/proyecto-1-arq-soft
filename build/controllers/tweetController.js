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
exports.tweetController = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_cache_1 = __importDefault(require("node-cache"));
const database_1 = __importDefault(require("../database"));
const myCache = new node_cache_1.default({ stdTTL: 10 });
class TweetController {
    index(req, res) {
        res.send('Hello from tweetController');
        //pool.query('show tables');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' INSERT INTO tweet (tweet_user, tweet_text) VALUES (?, ?) ', [req.params.id, req.body.tweet_text]);
            res.json({ message: 'Tweet guardado ' +
                    req.body.tweet_text +
                    ' para ' +
                    req.params.id });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweets = yield database_1.default.query(' SELECT * FROM tweet WHERE tweet_user = ?', [req.params.id]);
            res.json(tweets);
            /*if(myCache.has('todos')){
                console.log('Del cache');
                return res.send(myCache.get('todos'));
            } else {
                fetch("http://localhost:3000/tweet/" + req.params.id)
                .then((response) => response.json())
                .then(() => {
                    myCache.set('todos', res.json(tweets));
                    console.log('Del API');
                    res.send(res.json(tweets));
                });
            }*/
        });
    }
    cacheTweet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (myCache.has('todos')) {
                //console.log('Del cache');
                return res.send(myCache.get('todos'));
            }
            else {
                (0, node_fetch_1.default)("http://localhost:3000/tweet/" + req.params.id)
                    .then((response) => response.json())
                    .then((json) => {
                    myCache.set('todos', res.json(json));
                    //console.log('Del API');
                    res.send(res.json(json));
                });
            }
        });
    }
}
exports.tweetController = new TweetController();
