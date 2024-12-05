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

userRouter.get('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        if (email) {
            const user = await userService.getUserByEmail(email);
            res.status(200).send(user);
        } else {
            res.status(400).send({ error: 'No user id provided' });
        }
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
});
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        if (userId) {
            const user = await userService.getUserById(Number(userId));
            res.status(200).send(user);
        } else {
            res.status(400).send({ error: 'No user id provided' });
        }
    } catch (error) {
        next(error);
    }
});

export { userRouter };
