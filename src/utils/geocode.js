const request = require('request')

const geoCode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5rdXJtYXAiLCJhIjoiY2sxOHpwOHQ3MTB3dTNkbzJqaGUxOXJnYiJ9.bZFT6Y8BWbL2tENqSJq7jQ&limit=1'
	request({url, json : true}, (error, {body})=>{
		if(error){
			callback('Unable to connect to map service')
		}else if(body.features.length == 0){
			callback('Unable to find location.')
		}else{
			callback(undefined, {
				latitude : body.features[0].center[1],
				longitude : body.features[0].center[0],
				location : body.features[0].place_name
			})
		}
	})
}

module.exports = geoCode