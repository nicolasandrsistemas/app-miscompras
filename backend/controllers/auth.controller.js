import jwt from 'jsonwebtoken'
import authService from "../services/auth.service.js";

const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = await authService.register(username, email, password)
        res.status(201).send({status:"CREATED", data: user})        
    } catch (error) {
        res
        .status(500)
        .send({status:"FAILED", data: {error : {message: error.message || error}}})        
        
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await authService.login(username, password);
        console.log('user', user)
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(user, secret,  { expiresIn: '1h' })
        res.status(200).send(token)


    } catch (error) {
        res
        .status(500)
        .send({status:"FAILED", data: {error : {message: error.message || error}}})                
    }
}

export default {register, login}