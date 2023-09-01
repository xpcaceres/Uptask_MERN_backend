//CONFIGURACION DEL SERVIDOR
//const express = require("express");
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';//Colocar la extencion a los archivos creados por nosotros mismos
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Configurar Cors para comunicar frontend con backend
//Creando la WhiteList
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin,callback){
        console.log(origin);
        if(whiteList.includes(origin)){
            //Si esta autorizado
            callback(null,true);
        }else{
            //No esta permitido
            callback(new Error("Error de Cors"));
        }
    },
};

app.use(cors(corsOptions));

//ROUTING
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);
/*
app.use("/",(req,res) =>{
    res.send("Hola Mundo");
});
*/

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//Socket.io
import {Server} from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

io.on('connection', (socket)=>{
    console.log('Conectado a Socket.io');

    //Definir los eventos de Socket.io
    //ESTA ES UNA PRUEBA DE SOCKET IO
    /*
    socket.on('prueba', (nombre)=> {
        console.log('Prueba desde Socket io', nombre);
        socket.emit('respuesta', {nombre: 'Pedro'});
    });
    */
   socket.on('abrir proyecto', (proyecto)=>{
    socket.join(proyecto);
    //socket.emit('respuesta', {nombre: 'Sergio'});
   });
   socket.on('nueva tarea', tarea =>{
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit('tarea agregada', tarea);
   });
   socket.on('eliminar tarea', tarea =>{
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit('tarea eliminada', tarea);
   });
   socket.on('actualizar tarea', tarea =>{
    const proyecto = tarea.proyecto._id;//Para que solo se traiga el ID
    socket.to(proyecto).emit('tarea actualizada', tarea);
   });
   socket.on('completar tarea', tarea =>{
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit('tarea completada', tarea);
   })
/*
  return ()=>{
    socket.disconnect()
  }
  */
});