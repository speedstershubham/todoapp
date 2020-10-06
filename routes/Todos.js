const express =require("express")
const router = express.Router()
const Todos = require("../models/Todos")

//getting all
router.get('/',async (req,res) => {
try{
    const todos = await Todos.find()
    res.json(todos)
}catch(err){
    res.status(500).json({message: err.message})
}
})

//getting One
router.get('/:id',getTodos ,(req,res) => {
res.send(req.todos.Name)
})

//Creating one
router.post('/',async(req,res) => {
    const todos = new Todos({
        Name:req.body.Name  
    })
    try{
   const newTodos = await todos.save()
   res.status(201).json(newTodos)
    }catch(err){
        res.status(400).json({ message: err.message})
    }

})

//updating one
router.patch('/:id', getTodos,async(req,res) => {
 if(req.body.Name != null){
     res.todos.Name = req.body.Name
 }
 try{
     const updatedTodos = await res.todos.save()
     res.json(updatedTodos)
 }catch(err){
     res.status(400).json({ message: err.message})
 }
})

//Deleting one
router.delete('/:id',getTodos ,async (req,res) => {
  try{
  await res.todos.remove()
  res.json({ message: 'Deleted Todos'})
  }catch(err){
 res.status(500).json({message: err.message})
  }
})



async function getTodos(req,res,next){
    let todos
try{
    todos = await Todos.findById(req.params.id)
    if(todos == null)
    return res.status(404).json({message:"cannot find todos"})
}catch(err) {
      return res.status(500).json({ message:err.message })
} 
res.todos = todos
next()
 }

module.exports = router