import bcrypt from 'bcrypt'
import User from '../models/User.js'

const register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const datosUser = {username, email, password: hashedPassword}
    const user = await User.create(datosUser);
    const {password:_, ...userSinPassword} = user.dataValues
    return userSinPassword;
}

const login = async (username, password) =>{
    const user = await User.findOne({where: {username: username}}) 
    if (!user) {throw new Error("Credenciales no válidas")}
    const match = await bcrypt.compare(password, user.password)
    if (!match) {throw new Error("Credenciales no válidas")}
    const {password:_, ...userSinPassword} = user.dataValues
    return userSinPassword;

}

export default {register, login}