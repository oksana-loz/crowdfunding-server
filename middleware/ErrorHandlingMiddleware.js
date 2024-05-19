const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }

    return err.status
        ? res.status(err.status).json(err.message)
        : res.status(500).json(err.message)
}