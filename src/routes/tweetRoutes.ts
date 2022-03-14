import { Router } from "express";
import { tweetController } from "../controllers/tweetController";

class TweetRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', tweetController.index);
        this.router.get('/:id', tweetController.list);
        this.router.post('/:id', tweetController.create);

        this.router.get('/timeline/:id', tweetController.cacheTweet);
    }
}

const tweetRoutes = new TweetRoutes();
export default tweetRoutes.router;