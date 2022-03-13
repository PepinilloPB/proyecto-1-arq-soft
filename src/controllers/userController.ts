import { Request, Response } from 'express';
import pool from '../database';

class UserController{
    
    public index (req: Request, res: Response) {
        res.send('Hello from userController');
    }

    public async follow(req: Request, res: Response){
        await pool.query(' INSERT INTO follow (follower_id, followee_id) VALUES (?, ?) ', 
                         [req.params.id, req.body.followee_id]);
        res.json({message:  'Follow guardado de ' + 
                            req.params.id +
                            ' para ' +
                            req.body.followee_id});
    }
}

export const userController = new UserController();