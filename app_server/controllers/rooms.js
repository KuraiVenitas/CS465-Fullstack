/* Note: Not best practice to read a JSON everytime the webserver processes a request. This should be replaced before the application goes into production.*/
var fs = require('fs')
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));



/*GET rooms view*/
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways', rooms});
};

module.exports = {
    rooms
};