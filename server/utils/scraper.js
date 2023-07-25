const axios = require('axios');
const cheerio=require('cheerio');

/* Utility for scrapping a website */

const scrapWebsite =async(url)=>{
    try{
        const response=await axios.get(url);
        return response?.data
    }
    catch(err){
        console.log("Error scraping website :",err.message);
    }
}


/*Utility for extracting domain name from url*/

const getDomainName=(url)=>{
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
      } catch (error) {
        console.error('Invalid URL:', error);
        return null;
      }
}

/* Utility for extracting data from  html */

const extractData=async(url,html)=>{
    const domain=getDomainName(url)
    const $ = cheerio.load(html);
    const unwantedSelectors = ['header', 'footer'];
    for (const selector of unwantedSelectors) {
      $(selector).remove();
    }

    const mainContent = $('body').text().replace(/<[^>]+>/g, '').replace(/[^\w\s]/g, '').trim();
    const words = mainContent.split(/\s+/).filter(word => word !== '');


    const links=[]
    const mediaLinks=[]

    $('a').each((index, element) => {
        const href = $(element).attr('href');
        if (href && href.trim() !== '') {
          const domainName = getDomainName(href);
          links.push({ url: href, domainName:domainName?domainName:domain });
        }
      });
    
      $('img').each((index, element) => {
        const src = $(element).attr('src');
        if (src && src.trim() !== '') {
          const domainName = getDomainName(src);
          mediaLinks.push({ url: src, domainName:domainName?domainName:domain });
        }
      });


      console.log(domain)
      console.log(mediaLinks)
      console.log(links.length)
      console.log(mediaLinks)

      return {domain:domain,wordsLength:words?.length,links:links,mediaLinks:mediaLinks};

}

module.exports={scrapWebsite,extractData}