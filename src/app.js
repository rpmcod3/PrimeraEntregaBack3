import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { mongoConnection } from './connection/mongo.js';
import mocksRouter from './routes/mocks.router.js';


dotenv.config();

mongoConnection();

const app = express();
const PORT = process.env.PORT||8080;
/*const connection = mongoose.connect(`URL DE MONGO`)
 */



app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);
/* app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
 */
const startServer = async () => {
    try {
      await mongoConnection();
      app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
      });
    } catch (err) {
      console.error(' No se pudo iniciar el servidor debido a un error de conexión.');
    }
  };
  
  startServer();