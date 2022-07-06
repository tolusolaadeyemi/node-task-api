class CustomAPIError extends Error{
    constructor(message,statusCode){
    super(message)
    this.statusCode = statusCode
}
}

//constructor method is a special method invoked when we create a new instance of a class
//since we're creating a child class by extending, we call the super method which in turn invokes a constructor of a parent class; as a result we will have access to all the methods and properties of the parent class (Error in this case

const createCustomError = (msg, statusCode) =>{
    return new CustomAPIError(msg,statusCode)
}

module.exports = { createCustomError, CustomAPIError}