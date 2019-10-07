const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast =  require('./utils/forecast.js')

const app = express()

const port =  process.env.PORT || 3000

const viewsPath = path.join(__dirname,'../public/templates/views')
const partialsPath = path.join(__dirname,'../public/templates/partials')
const publicDirectory = path.join(__dirname,'../public')
// console.log(publicDirectory)
// console.log(__filename)
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

// app.get('',(req,res)=>{
// 	res.send('<h1>Weather</h1>')
// })

// app.get('/about',(req,res)=>{
// 	res.send({
// 		name : 'Andrew',
// 		age : 27
// 	})
// })

// app.get('/help', (req,res) => {
// 	res.send('<h1>Help</h1>')
// })

app.get('',(req,res) => {
	res.render('index',{
		title : 'Weather App',
		name : 'Ankur'
	})
})

app.get('/about',(req,res) => {
	res.render('about',{
		title : 'About',
		name : 'Ankur'
	})
})

app.get('/help',(req,res) => {
	res.render('help',{
		title : 'Help Page',
		name : 'Ankur'
	})
})

app.get('/weather', (req,res) => {
	const address = req.query.address
	if(!address){
		return res.send({
			error : 'Please provide a valid address'
		})
	}

	geoCode(address, (error, {latitude, longitude, location}={})=> {
		if(error){
			return res.send({
				error
			})
		}
		forecast(latitude,longitude, (error,{temparature, precipitation}={})=>{
			if(error){
				return res.send({
					error
				})
			}
			res.send({
				temparature,
				precipitation,
				location,
				address
			})
			// console.log(location)
			// console.log(forecastData)
		})
	})

	// res.send({
	// 	forecast : '50degree',
	// 	location : 'California',
	// 	address :  req.query.address
	// })
})

app.get('/products', (req,res) => {
	if(!req.query.search){
		return res.send({
			error : 'Could not find search term'
		})
	}

	res.send({
		products : []
	})
})

app.get('/help/*',(req,res)=>{
	res.render('error', {
		title : 'Not Found!',
		errorMessage : 'Help article not found!',
		name : 'Ankur'
	})
})

app.get('*',(req,res)=>{
	res.render('error', {
		title : 'Not Found!',
		errorMessage : 'My 404 page!',
		name : 'Ankur'
	})
})

app.listen(port,()=>{
	console.log('Server is starting up at '+port+' port')
})