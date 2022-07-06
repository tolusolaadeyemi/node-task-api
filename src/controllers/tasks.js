const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomeError, createCustomError} = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req,res) => {
    const tasks = await Task.find({}) //async middleware means that here we are waiting for all the tasks from the fucntion. if succesful then send response
    res.status(200).json({ tasks:tasks }) //ES6 allows us to just write 'tasks' here
})

const createTask = asyncWrapper (async (req,res) => {
    //await instead of callback fucntion approach
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

const getTask = asyncWrapper (async (req,res,next) => {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID}); //findOne used here instead of findbyID bc mongoose translates and undefined value with findbyID as null instead of undefined
        if(!task){
           return next(createCustomError(`no task with id: ${taskID}`,404))
            //always make sure to use return here!
        }
        res.status(200).json({ task })
})

const updateTask = asyncWrapper (async (req,res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID},req.body,{new:true,
        runValidators:true, //options object to always return the new value and use the validators
        }) //pass in req.body as the changes being made
        if(!task){
            return next(createCustomError(`no task with id: ${taskID}`,404))
        }
        res.status(200).json({ task }) 
})
const deleteTask = asyncWrapper (async (req,res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`no task with id: ${taskID}`,404))
        }
        res.status(200).json({task})
        //res.status(200).json({ task:null, status: 'success'})
        //res.status(200).send()
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}