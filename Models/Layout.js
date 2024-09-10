const mongoose = require('mongoose');

const LayoutoptionsSchema = new mongoose.Schema({

    option: { type: String, required: true },
    value: { type: String, required: true },

}); 

const Layoutoptions = mongoose.model('Layoutoptions', LayoutoptionsSchema);

module.exports = { 
    Layoutoptions 

};
