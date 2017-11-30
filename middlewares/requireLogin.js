/**
 * Middle ware is the function which takes the input from the request and transform it as per the requirement
 * @params next will be called when middle ware function will done executing
 */

module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(404).send({error: 'Please login to continue !!'});
    }

    //User is logged in, allow it
    next();
};