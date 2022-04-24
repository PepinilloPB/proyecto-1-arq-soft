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

/*
import { Request, Response } from 'express';
import fetch from "node-fetch";
import NodeCache from "node-cache";

import pool from '../database';

const myCache = new NodeCache(
    {
        stdTTL: 60
    });

class TweetController{
    public index (req: Request, res: Response) {
        res.send('Hello from tweetController');
        //pool.query('show tables');
    }

    public async create(req: Request, res: Response){
        await pool.query(' INSERT INTO tweet (tweet_user, tweet_text) VALUES (?, ?) ', 
                         [req.params.id, req.body.tweet_text]);

        const followers = await pool.query(' SELECT follower_id ' + 
                                           ' FROM follow ' + 
                                           ' WHERE followee_id = ? ',
                                           [req.params.id]);
        const tweets = await pool.query(' SELECT * FROM tweet t LEFT JOIN user u ON (u.user_id=t.tweet_user) LEFT JOIN follow f ON (u.user_id=f.followee_id) WHERE f.follower_id = ?', 
                                        [req.params.id]);
            
        myCache.set(req.params.id, tweets);
        console.log(followers.length);

        for(var i = 0; i < followers.length; i++){
            console.log('Seguidor ' + followers[i].follower_id);
            console.log('Existe ' + followers[i].follower_id + ': ' + myCache.has(followers[i].follower_id));
            console.log('Existe 1 como numero: ' + myCache.has(1));
            console.log('Existe 1 como string: ' + myCache.has('1'));
            if(myCache.has(followers[i].follower_id)){
                const tweets = await pool.query(' SELECT * FROM tweet t LEFT JOIN user u ON (u.user_id=t.tweet_user) LEFT JOIN follow f ON (u.user_id=f.followee_id) WHERE f.follower_id = ?', 
                                        [followers[i].follower_id]);
            
                myCache.set(followers[i].follower_id, tweets);
                //console.log(req.params.id + ' es seguido por ' + followers[i].follower_id);
            }
        }

        res.json({message:  'Tweet guardado ' + 
                            req.body.tweet_text +
                            ' para ' +
                            req.params.id});
    }
    public async list(req: Request, res: Response){
        const tweets = await pool.query(' SELECT * FROM tweet t LEFT JOIN user u ON (u.user_id=t.tweet_user) LEFT JOIN follow f ON (u.user_id=f.followee_id) WHERE f.follower_id = ?', 
                                        [req.params.id]);
        res.json(tweets);
    }

    public async cacheTweet (req: Request, res: Response){
        if(myCache.has(req.params.id)){
            //console.log('Del cache');
            return res.send(myCache.get(req.params.id));
        } else{
            const tweets = await pool.query(' SELECT * FROM tweet t LEFT JOIN user u ON (u.user_id=t.tweet_user) LEFT JOIN follow f ON (u.user_id=f.followee_id) WHERE f.follower_id = ?', 
                                        [req.params.id]);
            
            myCache.set(req.params.id, tweets);
            console.log(myCache.keys());
            //console.log('Del DB');
            res.json(tweets);
        }
    }
}

export const tweetController = new TweetController();
*/
