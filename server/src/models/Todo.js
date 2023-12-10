import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
    {    
        description: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean
        }
    })

const TodoModel = mongoose.model("todos", TodoSchema);
//module.exports = TodoModel; commonJS synataxprior to ES6 module
export default TodoModel; //module export, changes by adding "type":"module" in package.json