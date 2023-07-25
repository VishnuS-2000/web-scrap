const express = require('express');
const insightRouter=express.Router()
const {getInsights,createInsight,updateInsight,deleteInsight}=require('../controllers/insightController')


/* Get All Insights */
insightRouter.get('/',getInsights)

/* Scrap a website and add to insights */
insightRouter.post('/',createInsight)

/* Update favorites of an insight */
insightRouter.put('/:id',updateInsight)

/* Delete an scrap result from the insights */
insightRouter.delete('/:id',deleteInsight)

module.exports=insightRouter