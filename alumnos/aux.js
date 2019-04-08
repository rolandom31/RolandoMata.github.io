const request = require ("request")
const info = require("./db.js"); 
estudiante = function (id, callback)  {
    const alumno = info.find(function(item) {
      return item.id === id;
    });
  
    alumno
      ? callback(alumno, undefined)
      : callback({ error: "Matricula sin información" }, undefined);
  };
  
  module.exports = {estudiante};