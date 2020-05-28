const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forcast')


 
const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static diectory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Richard Baker'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Richard Baker'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Richard Baker'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address"
            })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if (error ) {
                return res.send({ error })
        }
        forecast (latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({error})
            }
        
            // fetch('http://puzzle.mead.io/puzzle').then((response) => {
            //     response.json().then((data) => {
            //         console.log(data)
            //     })
            // })
        res.send({
            forcast: forecastData,
            location,
            address: req.query.address
        })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard Baker',
        message: 'Help article Not Found'
    })  
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Richard Baker',
        message: 'Page Not Found'
    })  
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})