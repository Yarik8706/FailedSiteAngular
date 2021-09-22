const User = require('../models/User');
const generateId = async long => {
    long = long ?? 8;
    let id;
    while (true){
        id = generateNumber(long)
        const user = await User.findOne({id})
        if(user === undefined){
            return id;
        }
    }
}
const generateNumber = long => {
    let max = ''; 
    for(long; long > 0; long--){
        max = max + '9'
    } 
    console.log(max)
    max = Number(max)
    return Math.floor(Math.random() * (max - 0));
}
module.exports = generateId;