const express=require('express');
const mongoose=require('mongoose');
const ToDoModel=require('./Models/Todo');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017');

app.get('/get',(req,res)=>{
    ToDoModel.find()
    .then(result=> res.json(result))
    .catch(err=> res.json(err));
});
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    ToDoModel.findByIdAndDelete(id)
    .then(result=> res.json(result))
    .catch(err=> res.json(err));
});
app.post('/add',(req,res)=>{
    task=req.body.task;
    ToDoModel.create({
        task:task
    }).then(result=> res.json(result))
    .catch(err=> res.json(err));
});

app.listen(3000,()=>{
    console.log('Running on local port:3000');
});