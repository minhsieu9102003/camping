const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/YeldCamp')
    .then(() => {
        console.log('Port Open')
    })
    .catch((e) => {
        console.log('hong roi em oi')
        console.log(e)
    })



const db = mongoose.connection;

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const pricee = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: pricee,
            image: `https://source.unsplash.com/random/200x200?camping,${i}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse itaque optio eum libero maxime provident dolor dolore quam ullam modi aliquid, vero praesentium magni voluptatem saepe, molestias distinctio quod natus'

        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})