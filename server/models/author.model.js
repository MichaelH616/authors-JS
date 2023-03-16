const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, "Author name required."],
        min: [3, 'Author name must be at least three characters long.']
    }

},
{ timestamps:true }
);

module.exports = mongoose.model('Author', AuthorSchema);