/**
 * Middle ware is the function which takes the input from the request and transform it as per the requirement
 * @params next will be called when middle ware function will done executing
 */

/**
 * @description requireCredits Middleware will check if the logged in user have enough credits, error status will
 * be 403, which state their is some mistake or error in your request or Forbidden
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({error: 'You didn\'t have enough credits to send survey. Add credits to your ' +
        'account to continue!!'});
    }

    //User has enough credits, allow it
    next();
};