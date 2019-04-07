var request = require('request')
const credentials = require('./credentials.js')


const city = function(ciudad, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ciudad+'.json?access_token=' + credentials.MAPBOX_TOKEN

    request({url, json: true}, function(error, response){
        // const data = response.body
        if(error){
            console.log(error);
            callback(undefined,error)
        }else if(response.body.message == "Not Authorized - Invalid Token"){
            console.log(response.body.message)
            callback(undefined, response.body.message)
        }
        else{
        const data = response.body
        const lon = data.features[0].center[0]
        const lat = data.features[0].center[1]
        // darksky(lat, lon)
        // console.log(lon, lat)
        callback(lat, lon)
        }
    })       
}

const darksky = function(latitude, longitude){
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitude +',' + longitude + '?lang=es&units=si'
    
    request({ url, json: true}, function(error, response) {
    if(error){
        console.log(error)
    }
    if(response.statusCode == 200){
    const data = response.body
    const summary = data.hourly.summary
    const temperature = data.currently.temperature
    const probLluvia = data.currently.precipProbability
    
    console.log(summary+" Actualmente esta a "+temperature+"°C y hay "+probLluvia+"% de probabilidad de lluvia")
    }
    else if (response.statusCode == 403){
        console.log(response.body.error)
        // callback(undefined, response.body)
    }
    })
}
city("Monterrey", darksky)

/*module.exports={
    city: city
} */