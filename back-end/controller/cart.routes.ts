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

cartRouter.post('/add/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await cartService.addToCart(Number(req.params.userId), Number(req.body.productId)));
    } catch (error) {
        next(error);
    }
});

cartRouter.delete('/remove/:userId/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await cartService.removeFromCart(Number(req.params.userId), Number(req.body.productId)));
    } catch (error) {
        next(error);
    }
});

export default cartRouter;