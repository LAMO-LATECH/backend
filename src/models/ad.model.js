const mongoose = require("mongoose");
 
const adSchema = new mongoose.Schema(
  {

    businessName: {
      type: String,      
      required: true,
    },
    
    description: {
      type: String,      
      required: true,
    },

    pointsRequired: {
      type: Number,      
      required: true,
    },

    category: {
      type: String,       
      required: true,
    },

    type: {
      type: String,       
      required: true,
    },

    address: {
      type: String,      
      required: true,
    },

    image: {
      type: String,       
      default: "",
    },

    active: {
      type: Boolean,     
      default: true,
    },

    expiresAt: {
      type: Date,        
      required: true,
    },
  },
  
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Ad", adSchema);
