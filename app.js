const express = require('express');
const methodOverride = require('method-override')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const mongoose = require('mongoose');

// const Product = require('./models/product')
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)


mongoose.connect('mongodb://127.0.0.1:27017/YeldCamp')
    .then(() => {
        console.log('Port Open')
    })
    .catch((e) => {
        console.log('hong roi em oi')
        console.log(e)
    })

const db = mongoose.connection;

const Campground = require('./models/campground');



app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })

})
app.get('/campgrounds/new', async (req, res) => {
    res.render('campgrounds/new')
})
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect('/campgrounds')
})
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
})
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', { campground })
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    const campgrounds = await Campground.findById(id)
    res.render('campgrounds/show', { campgrounds })

})
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.listen(3000, (req, res) => {
    console.log('chay roi em oi')
})

