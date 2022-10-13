import supertest from 'supertest';
const bodyParser = require('body-parser')
import app from '../../index';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const request = supertest(app);

describe('Products endpoint testing' , function(){
    it('creates a new product' , async function(){
        const product ={
            name: "Product1",
            price: 20
        }
        const res = await request.post('/products/create')
        .set('Authorization', 'Bearer ' + process.env.TOKEN)
        .send(product);
        expect(res.body.id).toEqual(1);
        expect(res.body.product_name).toEqual("Product1");
        expect(res.body.price).toEqual(20);
        expect(res.status).toEqual(200);
    })

    it('creates a second new product' , async function(){
        const product ={
            name: "Product2",
            price: 40
        }
        const res = await (await request.post('/products/create')
        .set('Authorization', 'Bearer ' + process.env.TOKEN)
        .send(product));
        expect(res.body.id).toEqual(2);
        expect(res.body.product_name).toEqual("Product2");
        expect(res.body.price).toEqual(40);
        expect(res.status).toEqual(200);
    })

    it('fails to create a new product as no token was supplied' , async function(){
        const product ={
            name: "Product2",
            price: 30
        }
        const res = await (await request.post('/products/create').send(product));
        expect(res.status).toEqual(401);
    })
    
    it('should return requested product' , async function(){
        const res = await request.get('/products/showproduct/1');
        expect(res.body.id).toEqual(1);
        expect(res.body.product_name).toEqual("Product1");
        expect(res.body.price).toEqual(20);
        expect(res.status).toEqual(200);
    })

    it('should return requested products list' , async function(){
        const res = await request.get('/products/showproducts');
        expect(res.status).toEqual(200);
        expect(res.body[0].id).toEqual(1);
        expect(res.body[0].product_name).toEqual("Product1");
        expect(res.body[0].price).toEqual(20);
        expect(res.body[1].id).toEqual(2);
        expect(res.body[1].product_name).toEqual("Product2");
        expect(res.body[1].price).toEqual(40);
    })

})