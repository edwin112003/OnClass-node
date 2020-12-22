
const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/index', (req,res)=>{
    res.render('links/index');
});
router.get('/login', (req,res)=>{
    res.render('links/login'); 
});
router.get('/index_login', (req,res)=>{
    res.render('links/index_login'); 
});
router.get('/registro', (req,res)=>{
    res.render('links/registro'); 
}); 
router.get('/Horario', (req,res)=>{
    res.render('links/Horario'); 
});
router.get('/clase_resto_dia', (req,res)=>{
    res.render('links/clase_resto_dia'); 
});
router.get('/contactos', (req,res)=>{
    res.render('links/contactos'); 
});
router.get('/clase_proyecto', (req,res)=>{
    res.render('links/clase_proyecto'); 
});
router.get('/perfil', (req,res)=>{
    res.render('links/perfil'); 
});
router.get('/material_clase', (req,res)=>{
    res.render('links/material_clase'); 
});
router.get('/clase_notas', (req,res)=>{
    res.render('links/clase_notas'); 
});
router.get('/clase_tomar_nota', (req,res)=>{
    res.render('links/clase_tomar_nota'); 
});
router.get('/clase_mensajes', (req,res)=>{
    res.render('links/clase_mensajes'); 
});
router.get('/clase_pendiente', (req,res)=>{
    res.render('links/clase_pendiente'); 
});
router.get('/proyecto', (req,res)=>{
    res.render('links/proyecto'); 
});
router.get('/editar_horario', (req,res)=>{
    res.render('links/editar_horario'); 
});
module.exports = router;
