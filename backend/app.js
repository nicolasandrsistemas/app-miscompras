import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import personasRouter from './routes/personas.routes.js';
import productosRouter from './routes/productos.routes.js';
import historicoRouter from './routes/historico.routes.js';
import authRouter from './routes/auth.routes.js';
import validateToken from './middleware/validateToken.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('../frontend'));

// Iniciar la base de datos
// sequelize.sync({force: true});
sequelize.sync();

const procesar = (req, res, next) => {
    console.log('URL----->', req.url);
    next();
}

// app.use(procesar);

app.use('/api/personas/', personasRouter)
app.use('/api/productos/', productosRouter)
app.use('/api/historico/', historicoRouter)
app.use('/api/auth/', authRouter)

app.listen(PORT, ()=>{
    console.log(`El servidor está escuchando en el puerto ${PORT}`)
})

