const express = require('express')
const request = require('request');
const app = express()
const aux = require("./aux.js")
//puerto variable - heroku
const port = process.env.PORT || 3000

//funcion get
app.get("/students/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);
    aux.estudiante(id, alumno => {
      console.log(alumno);
      res.send(alumno);
    });
  });
   
  app.get('*', function(req, res) {
    res.send({
      error: 'Esto funciona'
    })
  })

//metodo listen
app.listen(port, function() {
    console.log('up and running')
  })

