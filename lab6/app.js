const request = require('request')
const credentials = require('./credentials.js')

// const publicDir = path.join(__dirname, 'public')


const city = function(ciudad, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ciudad+'.json?access_token=' + credentials.MAPBOX_TOKEN

    request({url, json: true}, function(error, response){
        // const data = response.body
        if(error){
            // console.log(error);
            callback('no hay servicio',undefined)
        }else if(response.body.error != undefined){
            // console.log(response.body.message)
            callback('error de llave',undefined)
        }
        else if(response.statusCode == 400){
          callback('ciudad no existe', undefined)
        }
        else{
        const data = response.body.features[0]
        const info = {
          lon: data.center[0],
          lat: data.center[1]
        }
        // darksky(lat, lon)
        // console.log(lon, lat)
        callback(undefined, info)
        }
    })       
}

const darksky = function(latitude, longitude, callback){
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitude +',' + longitude + '?lang=es&units=si'
    
    request({ url, json: true}, function(error, response) {
    if(error){
        // console.log(error)
        callback('no hay servicio', undefined)
    }
    else if(response.body.error != undefined){
      callback(response.body.error, undefined)
    } 
    else if(response.body.latitude != undefined){
      const data = response.body
      const info = {
        summary: data.hourly.summary,
        temperatura: data.currently.temperature,
        lluvia: data.currently.precipProbability
      }
      callback(undefined, info)
    }
    else {
        callback('key incorrecta',undefined)
    }
    })
}
//city("Monterrey", darksky) 

module.exports={
    darksky:darksky,
    city: city
} 

