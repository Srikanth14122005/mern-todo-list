import {useState,useEffect} from 'react';
import axios from 'axios';
function ToDoList(){
    const [tasks,setTasks]=useState([]);
    const [newTask,setNewTask]=useState("");
    useEffect(()=>{
        axios.get('http://localhost:3000/get')
        .then((result)=> setTasks(result.data))
        .catch(err=> console.log(err));
    },[]);
    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !==""){
            axios.post('http://localhost:3000/add',{task:newTask})
            .then(result=>{
                setTasks(prev=> [...prev,result.data]);
                setNewTask("");
            })
            .catch(err=> console.log("Error sending task",err));
        }
    }
    function deleteTask(id){
        axios.delete(`http://localhost:3000/delete/${id}`)
        .then(()=>{
            setTasks(prevTasks=> prevTasks.filter(task=> task._id !== id));
        })
        .catch(err=> console.log("Error deleting task",err));
    }
    function moveTaskDown(index){
        if(index< tasks.length -1){
            const updateTasks=[...tasks];
            [updateTasks[index],updateTasks[index+1]]=
            [updateTasks[index+1],updateTasks[index]];
            setTasks(updateTasks);
        }
    }
    function moveTaskUp(index){
        if(index>0){
            const updateTasks=[...tasks];
            [updateTasks[index],updateTasks[index-1]]=
            [updateTasks[index-1],updateTasks[index]];
            setTasks(updateTasks);
        }
    }
    return(<div className='to-do-list'>
        <h1>To-Do-List</h1>
        <div>
            <input
            type="text"
            placeholder='Enter new Tasks'
            value={newTask}
            onChange={handleInputChange}
            />
            <button className='add-button' onClick={addTask}>ADD</button>
        </div>
        <div>
            <ol>
                {tasks.map((taskobj,index)=>
                <li key={taskobj._id ||index}>
                    <span className='text'>{taskobj.task}</span>
                    <button className='delete-button' onClick={()=>deleteTask(taskobj._id)}>DELETE</button>
                    <button className='move-button' onClick={()=> moveTaskDown(index)}>👇</button>
                    <button className='move-button' onClick={()=> moveTaskUp(index)}>👆</button>
                </li>
                )}
            </ol>
        </div>
    </div>
    );
}
export default ToDoList;