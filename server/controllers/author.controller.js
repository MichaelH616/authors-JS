const Author = require('../models/author.model')

module.exports = {
    allAuthors: (req, res) => {
        Author.find({}).sort([["name", 1]])
            .then(allAuthors => {
                res.json(allAuthors)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    findOneAuthor: (req, res) => {
        Author.findById(req.params.id)
            .then(oneAuthor => {
                res.json(oneAuthor)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    createAuthor: (req, res) => {
        Author.create(req.body)
            .then(newAuthor => {
                res.json(newAuthor)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    updateAuthor: (req, res) => {
        Author.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
            .then(updatedAuthor => {
                res.json(updatedAuthor)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    deleteAuthor: (req, res) => {
        Author.findByIdAndDelete(req.params.id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}