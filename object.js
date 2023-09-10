const mongoose = require('mongoose');

const objectSchema =  new mongoose.Schema({
    img_link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    scientific_name: {
      type: String,
      required: true,
    },
    population_trend:  {
        type: String,
        required: true,
      },
    iucn_status: {
        type: String,
        required: true,
      },
    wpa: {
        type: String,
        required: true,
      },
    habitats_and_ecology: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    map_img_link:  {
        type: String,
        required: true,
      },
  });
module.exports = mongoose.model('animals', objectSchema);
