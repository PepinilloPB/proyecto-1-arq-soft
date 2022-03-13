import { Request, Response } from 'express';
import pool from '../database';

class IndexController{
    
    public async index (req: Request, res: Response) {
        
        const tables = await pool.query('show tables');
        res.json({tables: tables});
    }
}

export const indexController = new IndexController();