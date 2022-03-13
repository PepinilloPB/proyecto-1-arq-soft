import { Request, Response } from 'express';
import pool from '../database';

class TweetController{
    
    public index (req: Request, res: Response) {
        res.send('Hello from tweetController');
        //pool.query('show tables');
    }

    public async create(req: Request, res: Response){
        await pool.query(' INSERT INTO tweet (tweet_user, tweet_text) VALUES (?, ?) ', 
                         [req.params.id, req.body.tweet_text]);
        res.json({message:  'Tweet guardado ' + 
                            req.body.tweet_text +
                            ' para ' +
                            req.params.id});
    }
    public async list(req: Request, res: Response){
        const tweets = await pool.query(' SELECT * FROM tweet WHERE tweet_user = ?', 
                                        [req.params.id]);
        res.json(tweets);
    }
}

export const tweetController = new TweetController();