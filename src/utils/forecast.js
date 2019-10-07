const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/a4003ba9d707390839172b9239783392/'+latitude+','+longitude+'?units=si'
	request({url, json : true}, (error, {body})=>{
		
		if(error){
			callback('Unable to connect to weather service')
		}else if(body.error){
			callback('Unable to find location')
		}else{
			console.log(body.currently)
			callback(undefined, {
				temparature : body.currently.temperature,
				precipitation : body.currently.precipProbability,
				summary : body.currently.summary
			})
		}
	})
}

module.exports = forecast