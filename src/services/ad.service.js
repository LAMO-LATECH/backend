const Ad = require("../models/ad.model");
 
 

const getActiveAds = async () => 
{
  const now = new Date();
 
  const ads = await Ad.find({
    active: true,
    expiresAt: { $gte: now }, 
  });
 
  return ads;
};
 
 
const getAllAds = async () => 
{
  const ads = await Ad.find({});
  return ads;
};
 
 
const getAdById = async (id) => 
{
  const ad = await Ad.findById(id);
  return ad; // null if not found
};
 
 
const getAdsByCategory = async (category) => 
{
  const now = new Date();
 
  const ads = await Ad.find({
    active: true,
    category: category,
    expiresAt: { $gte: now },
  });
 
  return ads;
};
 

const createAd = async (adData) => 
{
  const newAd = new Ad(adData);
  await newAd.save();
  return newAd;
};
 
 
const updateAd = async (id, updatedData) => 
{
  const ad = await Ad.findByIdAndUpdate(
    id,
    updatedData,
    { new: true } 
  );
  return ad;
};
 
 
const setAdActive = async (id, isActive) =>
{
  const ad = await Ad.findByIdAndUpdate
  (
    id,
    { active: isActive },
    { new: true }
  );
  return ad;
};
 
 
const deleteAd = async (id) => 
{
  await Ad.findByIdAndDelete(id);
};
 
 
module.exports = 
{
  getActiveAds,
  getAllAds,
  getAdById,
  getAdsByCategory,
  createAd,
  updateAd,
  setAdActive,
  deleteAd,
};
 
