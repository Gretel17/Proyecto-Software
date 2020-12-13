var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "baselista",
    insecureAuth: true,
    multipleStatements: true
});

//Funcion para mostrar todas las listas completadas
router.get('/get_listac', (req,res,next)=>{
    var query = "select lista.*, usuarios.nombre from baselista.lista join baselista.usuarios on lista.iduser = usuarios.idusuarios where usuarios.idusuarios = ? and lista.estado=1";
    var value = [req.query.idusuarios];
    con.query(query,value, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});
//Funcion para mostrar todas las listas no completadas
router.get('/get_listan', (req,res,next)=>{
    var query = "select lista.*, usuarios.nombre from baselista.lista join baselista.usuarios on lista.iduser = usuarios.idusuarios where usuarios.idusuarios = ? and lista.estado=0";
    var value = [req.query.idusuarios];
    con.query(query,value, (err, result, field)=>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

//Funcion para insertar una lista
router.post('/insert_lista', (req,res,next)=>{
    var query = "insert into baselista.lista(iduser,titulo,descripcion,estado) values (?,?,?,?)";
    var value = [req.body.iduser, req.body.titulo, req.body.descripcion, req.body.estado]; 
    con.query(query, value, (err, result, field) =>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });  
});

//Funcion para agregar un usuario
router.post('/insert_user', (req,res,next)=>{
    var query = "insert into baselista.usuarios(idusuarios,nombre,apellido,password) values (?,?,?,?)";
    var value = [req.body.idusuarios, req.body.nombre, req.body.apellido, req.body.password]; 
    con.query(query, value, (err, result, field) =>{
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });  
});

//Funcion para Modificar la lista
router.put('/update_lista', (req, res, next) => {
    var query = "update baselista.lista set titulo=?, descripcion=?, estado=? where iduser = ? and idlista=?";
    var value = [req.body.titulo, 
                 req.body.descripcion, 
                 req.body.estado,
                 req.body.iduser,
                 req.body.idlista];
    con.query(query, value,  (err, result, field) => {
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

//Funcion para alterar el estado
router.put('/update_listaestado', (req, res, next) => {
    var query = "update baselista.lista set estado=? where idlista=?";
    var value = [req.body.estado,
                 req.body.idlista];
    con.query(query, value,  (err, result, field) => {
        if(err){
            next(err);
        }
        else{
            res.status(200).json(result);
        }
    });
});

module.exports = router; 