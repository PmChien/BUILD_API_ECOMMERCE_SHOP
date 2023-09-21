
function errorHandler(err,req,res,next){
    if(err.name === 'UnauthorizedError')
    {
        // jwt authentication error
        return res.status(401).json({message: "the user is not authorized"});
    }
    if(err.name === 'ValidationError')  
    {
        // validation error
        return res.status(401).json({message: err.message});
    }
    // default to 500 sever error
    return res.status(500).json({message: err.message});
}

module.exports = errorHandler