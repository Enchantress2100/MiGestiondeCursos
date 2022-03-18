//crear servidor con express, incluir la importacion e integracion del paquete body parser
const express = require('express')
const app = express()
//importar funciones de base.js
const{nuevoCurso, getCursos, editCurso, deleteCurso}=require('./base')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//importar web
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

//ruta post
app.post('/curso', async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
})
//ruta get
app.get('/cursos', async (req, res) => {
    const respuesta = await getCursos()
    res.send(respuesta)
})

//ruta update
app.put('/curso', async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

//ruta delete
app.delete('/cursos/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id)
    respuesta > 0 //se refiere a que la id tiene que ser mayor que 1
        ? res.send(`el curso de id ${id} fue eliminado con exito`)
        :res.send('no existe un curso con ese id')
})

//creacion del servidor
app.listen(3000, () => console.log("el servidor se esta inicializando en el puerto 3000"));