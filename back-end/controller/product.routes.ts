import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';



const productRouter = express.Router();


productRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await productService.getAllProducts());
    } catch (error) {
        next(error);
    }
});

productRouter.get('/desc/limit/:limit', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await productService.getProductsLimitDesc(Number(req.params.limit)));
    } catch (error) {
        next(error);
    }
});

export { productRouter };
