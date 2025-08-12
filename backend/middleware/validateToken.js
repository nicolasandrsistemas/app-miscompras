import jwt from 'jsonwebtoken';

const validateToken = async (req, res, next) => {
    const header = req.header('Authorization') || ''
    const token = header.split(' ')[1]
    const secret = process.env.JWT_SECRET
    if (!header){
        res
        .status(403)
        .send({status:"FAILED", data: {error : {message: "No autorizado"}}})                

    }

    try {
        const user = await jwt.verify(token, secret)
        if (user) {
            req.userdata = user;
            next()
        }
        
    } catch (error) {
        res
        .status(403)
        .send({status:"FAILED", data: {error : {message: "No autorizado"}}})                
    }

}

export default validateToken