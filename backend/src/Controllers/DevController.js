const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../Utils/ParseStringAsArray');
module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username })
        
        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = ParseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
        };
        
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
            
        }
        return response.json(dev);   
    },
    
    async update(request, response){
        // Não atualizar github_username
        const { _id, github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ _id })

        if(dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = ParseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
        };
        
            dev = await Dev.updateOne({ _id },{
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
        }
        return response.json(dev);
    },

    async destroy(request, response){
       const { _id } = request.body
       await Dev.deleteOne({_id});
    },
};