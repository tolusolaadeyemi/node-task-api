const asyncWrapper = (fn) =>{  //fn is our controller taken here as an argument
return async(req,res,next) =>{
    try {
    await fn(req,res,next)
    } catch (error) {
    next(error) //passing to next middleware for errors, if no custom errorhandler is provided it is passed to express' built-in handler
        
    }
}
}

module.exports = asyncWrapper;