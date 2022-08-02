
const mongoose=require('mongoose')
const Campground=require('../models/campground')
const cities=require('./cities')
const {places,descriptors}=require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const db=mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',()=>{
    console.log('Database connected')
})

const sample=array=>array[Math.floor(Math.random()*array.length)]
const seedDB=async ()=>{
    await Campground.deleteMany({})
    for (let i=0;i<300;i++){
        const price=Math.floor(Math.random()*20)+10
        const random1000=Math.floor(Math.random()*1000)
        const camp=new Campground({
            author:'612b7ff3d8beaf0ed89d223f',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'A campsite or camping pitch is a place used for overnight stay in an outdoor area. In UK English, a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents, campervans or caravans; this UK English use of the word is synonymous with the US English expression campground.',
            price,
            geometry : { coordinates : [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ], type : "Point" },
            images:[{
                url: 'https://res.cloudinary.com/dvpfcxesb/image/upload/v1630312396/YelpCamp/mrea9srfcapvuc0w07i5.jpg',
                filename: 'YelpCamp/mrea9srfcapvuc0w07i5'
            },{
                url: 'https://res.cloudinary.com/dvpfcxesb/image/upload/v1630312397/YelpCamp/u95h5klxbjtv3e1odlv1.jpg',
                filename: 'YelpCamp/u95h5klxbjtv3e1odlv1'
            },{
                url: 'https://res.cloudinary.com/dvpfcxesb/image/upload/v1630312397/YelpCamp/ccem4azy7cle27vwcqrc.jpg',
                filename: 'YelpCamp/ccem4azy7cle27vwcqrc'
            },{
                url: 'https://res.cloudinary.com/dvpfcxesb/image/upload/v1630312397/YelpCamp/vkkcsxw6iazcigppqqwc.jpg',
                filename: 'YelpCamp/vkkcsxw6iazcigppqqwc'
            }]
        })
        await camp.save()
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close()
})