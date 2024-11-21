import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

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

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = userService.addUser(<UserInput>req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

export { userRouter };
