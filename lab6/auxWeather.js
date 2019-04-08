const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const weather = require('./app.js')

app.get('/weather', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if( !req.query.search ) {
      return res.send({
        error: error
      })
    }
  weather.city(req.query.search, function(error, response){
    weather.darksky(response.lat, response.lon, function(error, response){
      const respuesta = `${response.summary}.Aactualmente está a ${response.clima}ºC. Existe ${response.precipitacion}%de probabilidad de lluvia.`
      return res.send({
        clima:respuesta
      })
    })
  })
})
  
  
  app.get('*', function(req, res) {
    res.send({
      error: 'Esta ruta no existe'
    })
  })
  
  
  app.listen(port, function() {
    console.log('up and running')
  })