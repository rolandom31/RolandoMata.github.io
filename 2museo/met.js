const request = require('request');

const busqueda = function (search, callback) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`;
  request({ url, json: true }, (error, response) => {
    if (response.body.total === 0) {
      callback(true, { error: "no hay informacion" });
    } else if (response.statusCode === 200) {
      callback(undefined, response.body.objectIDs[0]);
    } else {
      callback(undefined, response);
    }
  });
};

const ID = function (id, callback) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

  request({ url, json: true }, (error, response) => {
    if (response.statusCode !== 200) {
      callback(true, { statusCode: response.statusCode,
        message: response.body.message
      });
    } else {
      callback(undefined, {
        artist: response.body.artistDisplayName,
        title: response.body.title,
        year: response.body.objectEndDate,
        technique: response.body.medium,
        metUrl: response.body.objectURL
      });
    }
  });
};

module.exports = { busqueda, ID };