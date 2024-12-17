import express, { NextFunction, Request, Response } from 'express';
import cartService from '../service/cart.service';

const cartRouter = express.Router();

cartRouter.get('/items:cartId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await cartService.getCartItems(Number(req.params.cartId)));
    } catch (error) {
        next(error);
    }
});
