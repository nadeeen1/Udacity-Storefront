import supertest from 'supertest';
const bodyParser = require('body-parser')
import app from '../../index';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const request = supertest(app);

describe('Users endpoint testing' , function(){
    let token: string;
    beforeAll( async function(){
        const user ={
            firstName: "Testing2",
            lastName: "User2",
            password: "Pass123"
        }
        const res = await request.post('/users/create').send(user);
        expect(res.body.createdUser.id).toEqual(2);
        expect(res.body.createdUser.firstname).toEqual("Testing2");
        expect(res.body.createdUser.lastname).toEqual("User2");
        expect(res.status).toEqual(200);
        token = res.body.token;
    })

    it('creates a second new user' , async function(){
        const user ={
            firstName: "Testing3",
            lastName: "User3",
            password: "Pass123"
        }
        const res = await request.post('/users/create').send(user);
        expect(res.body.createdUser.id).toEqual(3);
        expect(res.body.createdUser.firstname).toEqual("Testing3");
        expect(res.body.createdUser.lastname).toEqual("User3");
        expect(res.status).toEqual(200);
    })

    it('should not return user as no token is supplied' , async function(){
        const res = await request.get('/users/show/2');
        expect(res.status).toEqual(401);
    })

    it('should not return list of users as no token is supplied' , async function(){
        const res = await request.get('/users/showusers');
        expect(res.status).toEqual(401);
    })
    
    it('should return requested user' , async function(){
        const res = await request.get('/users/show/2')
        .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(2);
        expect(res.body.firstname).toEqual("Testing2");
        expect(res.body.lastname).toEqual("User2");
    })

    it('should return requested users list' , async function(){
        const res = await request.get('/users/showusers')
        .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body[0].id).toEqual(1);
        expect(res.body[0].firstname).toEqual("Testing1");
        expect(res.body[0].lastname).toEqual("User1");
        expect(res.body[1].id).toEqual(2);
        expect(res.body[1].firstname).toEqual("Testing2");
        expect(res.body[1].lastname).toEqual("User2");
        expect(res.body[2].id).toEqual(3);
        expect(res.body[2].firstname).toEqual("Testing3");
        expect(res.body[2].lastname).toEqual("User3");
    })

})