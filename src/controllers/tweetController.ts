import { Request, Response } from 'express';
import fetch from "node-fetch";
import NodeCache from "node-cache";

import pool from '../database';

const myCache = new NodeCache({stdTTL: 10});

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
    }

    public async cacheTweet (req: Request, res: Response){
        if(myCache.has('todos')){
            console.log('Del cache');
            return res.send(myCache.get('todos'));
        } else{
            const tweets = await pool.query(' SELECT * FROM tweet WHERE tweet_user = ?', 
                                        [req.params.id]);
            
            myCache.set('todos', tweets);
            console.log('Del DB');
            res.json(tweets);
            //res.send(res.json(tweets));
            /*fetch("http://localhost:3000/tweet/" + req.params.id)
            .then((response) => response.json())
            .then((json) => {
                myCache.set('todos', res.json(json));
                //console.log('Del API');
                res.send(res.json(json));
            });*/
        }
    }
}

export const tweetController = new TweetController();