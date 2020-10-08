const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../Utils/ParseStringAsArray');
const { findConnections, sendMessage} = require('../websocket');
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
            
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
              );
              sendMessage(sendSocketMessageTo, "new-dev", dev);
        }
        return response.json(dev);   
    },
    
    async update(request, response){

        const { _id } = request.params;
        const dev = request.body;

        const techs = ParseStringAsArray(dev.techs);

        const location = {
            type: 'Point',
            coordinates: [dev.longitude, dev.latitude]
        };
        
        dev = await Dev.findByIdAndUpdate({ _id },{
            name: dev.name,
            github_username: dev.github_username,
            bio: dev.bio,
            avatar_url: dev.avatar_url,
            techs,
            location
        });
        return response.json(dev);
    },

    async destroy(request, response){

       const { _id } = request.params;

       const dev = await Dev.findByIdAndDelete(_id);

       return response.json(dev);
    },
};
