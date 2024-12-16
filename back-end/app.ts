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
        path: ['/api-docs', /^\/api-docs\/.*/, '/login', '/register', '/status', '/users/register', '/users/login', '/products/all'],
    })
);
// const swaggerOpts = {};
// const swaggerSpec = swaggerJSDoc(swaggerOpts);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use(errorHandler);


app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
