const Dev = require('../models/Dev');
const ParseStringAsArray = require('../Utils/ParseStringAsArray');

module.exports = {
    async index(request, response){
        
        const { latitude, longitude , techs } = request.query;
        
        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $maxDistance: 10000,
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                },
            },
        });
        return response.json({ devs });
    }
}
