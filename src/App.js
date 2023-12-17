import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { addToDo, getAllToDo , updateToDo, deleteToDo} from "./utils/handleapi";

function App() {

  const [toDo,setToDo] = useState([])
  const [text,setText] = useState()
  const [isUpdating,setIsUpdating]=useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(()=> {
    getAllToDo(setToDo)
  },[])

  const updateMode= (_id,text)=>{
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="App">
    <div className="Container">
      <h1>To Do App</h1>
      <div className="top">
        <input 
        type="text" 
        placeholder="Add ToDos...."
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
        <div className="button1" 
        onClick={ isUpdating ? () => updateToDo(toDoId,text,setToDo,setText,setIsUpdating) 
        : ()=> addToDo(text,setText,setToDo)}>
          {isUpdating ? "Update" : "Add"}</div>
        </div>
        <div className="list">
          {toDo.map((item) => <Todo 
          key={item._id} 
          text={item.text} 
          updateMode={()=> updateMode(item._id,item.text)}
          deleteTodo={()=> deleteToDo(item._id,setToDo)}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
