const {v4:uuidv4}=require('uuid')
const {scrapWebsite,extractData}=require('../utils/scraper')
const insights=[]
/* Insight Controller */

/* Get all insights */
const getInsights=async(req,res)=>{
    try{            
        res.status(200).json({result:insights,message:'Loaded all insights'})
    }   

    catch(err){
        res.status(500).json({result:{},message:err.message})
    }

}

/* Scrap and Create an Insight */
const createInsight=async(req,res)=>{
    try{
        if(!req.body.url) return res.status(400).json({result:{},message:'URL not provided'});
        const html=await scrapWebsite(req.body.url)
        const result=await extractData(req.body.url,html)

        insights.splice(0,0,{id:uuidv4(),data:result,createdAt:new Date().toISOString(),updatedAt:null,favourite:false})
        res.status(201).json({result:result,message:'Successfully scrapped the website'})
    }
    catch(err){
        res.status(500).json({result:{},message:err.message});
        console.log(err);
    }
    
}

/* Update the favourite of an Insight */
const updateInsight=async(req,res)=>{
    try{
        if(!req.params.id) return res.status(400).json({result:{},message:'Id not provided'});
        let updatedIndex=-1
        for (let i = 0; i < insights.length; i++) {
            if (insights[i].id === req.params.id) {
                insights[i] = { ...insights[i], favourite:!insights[i].favourite,updatedAt:new Date().toISOString()};
                updatedIndex=i
                break;

            }
        }

    if(updatedIndex===-1){
        return res.status(404).json({result:{},message:'Insight not found'})
    }
    res.status(200).json({result:insights[updatedIndex],message:'Updated Insight'})
    
}
    catch(err){
        res.status(500).json({result:{},message:err.message});
        console.log(err);
    }
}

/*Deletes an Insight*/
const deleteInsight=async(req,res)=>{
    try{
        if(!req.params.id) return res.status(400).json({result:{},message:'Insight deleted'})
        let deletedIndex=-1
        for (let i = 0; i < insights.length; i++) {
            if (insights[i].id === req.params.id) {
                deletedIndex=i
                break;
            }
        }

        if(deletedIndex===-1){
            return res.status(404).json({result:{},message:'Insight not found'})
        }

        insights.splice(deleteIndex,1)


    }catch(err){
        res.status(500).json({result:{},message:err.message});
        console.log(err);
    }
}


module.exports={getInsights,createInsight,updateInsight,deleteInsight}