import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await userService.getAllUsers());
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await userService.getUserById(Number(req.params.id)));
    } catch (error) {
        next(error);
    }
});

export { userRouter };
