const User = require('../models/User');
const generateId = async long => {
    long = long ?? 8;
    console.log(long, ' long')
    let id;
    while (true){
        id = generateNumber(long)
        console.log(id, ' id')
        const user = await User.findOne({id})
        console.log(user)
        if(user == undefined){
            console.log(id, ' return id')
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
    return Math.floor(Math.random() * (max - 0)) + 0;
}
module.exports = generateId;