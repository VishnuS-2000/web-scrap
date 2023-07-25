PORT=4000
const express=require('express');
const app = express();
const morgan=require('morgan');
app.use(morgan('tiny'))
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

const insightRouter=require('./routes/insight')


app.get('/api', (req, res) => {
    res.status(200).json({message:'Welcome to Web Scraper'})
});

app.use('/api/insight',insightRouter)
app.get('*',(req, res) => {
    res.status(404).json({message:'Requested URL is not found'})   
})


app.listen(PORT,()=>{
    console.log('Server listening on port 4000');
})
