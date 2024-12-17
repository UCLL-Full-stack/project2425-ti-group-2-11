import express, { NextFunction, Request, Response } from 'express';
import cartService from '../service/cart.service';

const cartRouter = express.Router();

cartRouter.get('/items/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await cartService.getCartItems(Number(req.params.userId)));
    } catch (error) {
        next(error);
    }
});


export default cartRouter;