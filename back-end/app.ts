import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { productRouter } from './controller/product.routes';
import errorHandler from './middelware/errorHandler';
import { expressjwt } from 'express-jwt';
import cartRouter from './controller/cart.routes';
import helmet from 'helmet';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api-docs',
            /^\/api-docs\/.*/,
            '/login',
            '/register',
            '/status',
            '/users/register',
            '/users/login',
            /^\/products\/(desc|asc)\/limit\/\d+$/,
        ],
    }), helmet()
);
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'UserBazaar',
            version: '1.0.0',
            description: "API docs for user bazaar"
        },
    },
    apis: ['./controller/*.ts', './routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use(errorHandler);

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
