
const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const {isLoggedIn}= require('../lib/auth'); 
var cloudinary = require('cloudinary').v2;
//buenas

cloudinary.config({ 
    cloud_name: 'dgvhkv4ng', 
    api_key: '442196388442844', 
    api_secret: 'AA0SdOf7vslkTGBAK1xaefXei18' 
  });

router.get('/index', (req,res)=>{
    res.render('links/index');
});
//Login


router.get('/login', (req,res)=>{
    res.render('links/login', {layout: 'login'}); 
});
router.post('/login', (req,res,next)=>{
    console.log('estoy aqui');
    passport.authenticate('local.login',{        
        successRedirect: '/links/Horario',
        failureRedirect: '/links/login',
        failureFlash: true
    })(req,res,next);
});

//login final 

//cerrar sesion
router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/links/login');
});

//cerrar sesion final
router.get('/index_login', (req,res)=>{
    res.render('links/index_login'); 
});
router.get('/registro', (req,res)=>{
    res.render('links/registro', {layout: 'login'}); 
}); 
router.get('/clase_resto_dia', (req,res)=>{
    res.render('links/clase_resto_dia'); 
});
router.get('/Horario', isLoggedIn, (req,res)=>{
    
    res.render('links/Horario'); 
});
router.get('/contactos', (req,res)=>{
    res.render('links/contactos'); 
});
router.get('/clase_proyecto', (req,res)=>{
    res.render('links/clase_proyecto'); 
});

router.get('/perfil', async (req,res)=>{
    const perfil = await pool.query('select * from E_Usuario where id_usuario = ?', 81);

    const contactos = await pool.query('call GetCont (?)',11);
    contactos.pop();

    console.log('pepepepepepe',contactos[0]);

    res.render('links/perfil', {layout: 'login',perfil,usuarios: contactos[0]}); 
});

router.get('/editar_perfil/:id', async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const perfil = await pool.query('select * from E_Usuario where id_usuario = ?',[id]);
    res.render('links/editar_perfil', {perfil: perfil[0]});
});

router.post('/editar_perfil/:id', async (req,res)=>{
    const {id} = req.params;
    console.log('asdasdasdasdasdasdasdasdasdadsasdasd');

    const {usertag, contra, correo_usuario, nombre_usuario} = req.body;     
    const newlink = {
        usertag,
        contra,
        correo_usuario,
        nombre_usuario
    };
    console.log(newlink);

    await pool.query('call EditUsu(?,?,?,?,?)',
    [id,
     newlink.usertag, 
     newlink.contra,
     newlink.correo_usuario,
     newlink.nombre_usuario,
     newlink.llave_usuario,]);
    res.redirect('/links/perfil'); 
});




router.get('/material_clase', (req,res)=>{
    res.render('links/material_clase'); 
});
router.get('/pendientes', (req,res)=>{
    res.render('links/pendientes');
});
router.get('/clase_notas', (req,res)=>{
    res.render('links/clase_notas'); 
});
router.get('/clase_tomar_nota',isLoggedIn, (req,res)=>{
    res.render('links/clase_tomar_nota', {layout: 'login'}); 
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
router.post('/editar_horario/:id,:case', (req,res)=>{  
    const id = req.params;  
    if(id.case==1){
        console.log("Bienvenido al caso 1 para agregar una clae c:");
        res.render('links/editar_horario'); 
    }else{
        console.log("Caso de editar horario");
        res.render('links/editar_horario'); 
    }
    
    
});
router.get('/chat', (req,res)=>{
    res.render('links/chat');
});
router.get('/ver', async (req,res)=>{
    const clase = await pool.query('call GetCont(?)',11);
    clase.pop();
    res.render('links/ver', {usuarios: clase[0]});
});
router.get('/mostrar_cosas', async (req,res)=>{
    const e_usuario = await pool.query('select * from E_Usuario');
    res.render('links/mostrar_cosas', {e_usuario});

    
});
router.post('/registro', async (req,res)=>{
    const {usertag, contra, correo_usuario, nombre_usuario, llave_usuario} = req.body;     
    const newlink = {
        usertag,
        contra,
        correo_usuario,
        nombre_usuario,
        llave_usuario
    };
    console.log(newlink);
    await pool.query('call SaveUsu(? ,? ,? ,? ,?)',[newlink.usertag, newlink.contra, newlink.correo_usuario, newlink.nombre_usuario, newlink.llave_usuario]);
    res.redirect('/links/login');
});
/*Req para subir pdf*/
    var url_mysql = "";
    var response ='';
router.post("/save_pdf",async(req,res)=>{
await cloudinary.uploader.upload("data:image/png;base64,"+req.body.pdf,{format:'jpg', public_id: req.body.nombre}, function(error, result) {console.log(result, error); response = result;});
res.json({ url: response.url }); 
});
router.post("/save_nota",(req,res)=>{
    console.log("Index",req.body.nota);
    res.user.nota = req.body.nota;
    console.log("buenas", res.locals.user.nota);
    res.json({tag: res.locals.user.usertag});
    });
/*Esta es la url que se va a meter a la basede datos*/
url_mysql = response.url;
module.exports = router;
