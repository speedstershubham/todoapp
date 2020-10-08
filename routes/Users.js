const express =require("express")
const router = express.Router()
const Users = require("../models/Users")

//getting all
router.get('/',async (req,res) => {
try{
    const users = await Users.find()
    res.json(users)
}catch(err){
    res.status(500).json({message: err.message})
}
})

//getting One
router.get('/:id',getUsers ,(req,res) => {
res.send(req.users)
})

//Creating one
router.post('/',async(req,res) => {
    const users = new Users({
        Username:req.body.Username,
        email:req.body.email, 
        password:req.body.password,
    })
    try{
   const newUsers = await users.save()
   res.status(201).json(newUsers)
    }catch(err){
        res.status(400).json({ message: err.message})
    }

})

//updating one
router.patch('/:id', getUsers,async(req,res) => {
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
router.delete('/:id',getUsers ,async (req,res) => {
  try{
  await res.todos.remove()
  res.json({ message: 'Deleted Todos'})
  }catch(err){
 res.status(500).json({message: err.message})
  }
})



async function getUsers(req,res,next){
    let users
try{
    users = await Users.findById(req.params.id)
    if(users == null)
    return res.status(404).json({message:"cannot find todos"})
}catch(err) {
      return res.status(500).json({ message:err.message })
} 
res.users = users
next()
 }

 

module.exports = router