const path = require("path");
const express = require("express");
const met = require("./met");

const app = express();

const port = process.env.PORT || 3000;

app.get("/met", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "error en la busqueda"
    });
  }

  met.busqueda(req.query.search, function (error, data) {
    if (error) {
      return res.send(data);
    } 
    else {
      met.ID(data, (err, response) => {
        if (err) {
          return res.send(response);
        } else {
          response["buscar"] = req.query.search;
          res.send(response);
        }
      });
    }
  });
});

app.get("*", function(req, res) {
  res.send({
    error: "no existe"
  });
});

app.listen(port, () => {
  console.log("up and running");
});