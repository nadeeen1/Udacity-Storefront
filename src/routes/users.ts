import express from 'express';
const userHandle = require('../handlers/users');
const {authenticate} = require('../middleware/authentication');

const router = express.Router()
router.use(express.json())

router.post('/create' , userHandle.create);
router.get('/showusers' ,authenticate ,  userHandle.displayUsers);
router.get('/show/:id' ,authenticate ,  userHandle.displayUser);
module.exports = router