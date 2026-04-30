const express = require("express");
const router  = express.Router();
const adService = require("src/service/ad.service");

router.get("/", async (req, res) => 
{
  try {
    const ads = await adService.getActiveAds();
    res.status(200).json(ads);
  } 
  catch (error) 
  {
    res.status(500).json({ message: "Failed to fetch ads", error: error.message });
  }
});

router.get("/all", async (req, res) =>
{
    try

    {
     const ads = await adService.getAllAds();
     res.status(200).json(ads);

    }
    catch(error)
    {
        res.status(500).json({message: ""})
    }
}); 