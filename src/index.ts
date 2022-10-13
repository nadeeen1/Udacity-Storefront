import express from 'express'
const bodyParser = require('body-parser')
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const app: express.Application = express()
const address = "localhost:3000";
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/users' , userRouter);
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));
app.use('/products' , productRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/orders' , orderRouter);
app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!')
})
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app;