import { DragDropContext, Draggable, Droppable, } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  {
    id: 1,
    text: "Aprender react"
  },
  {
    id: 2,
    text: "Aprender Js"
  },
  {
    id: 3,
    text: "Aprender vue"
  },
]

const App = () => { 

  const [todos, setTodos] = useState(initialTodos);

  useEffect (()=> {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])


  const handledrag = (result) =>{
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorder] = copyArray.splice(startIndex,1);

    copyArray.splice(endIndex, 0, reorder);
    
    setTodos(copyArray);
  }

  return (
    <>
    <DragDropContext onDragEnd={handledrag}>
      <h1>BlueLock</h1>
      <Droppable droppableId="locks">
        {
          (drop) => (      
          <ul ref={drop.innerRef} {...drop.droppableProps}>
            {todos.map((todo, index) => (
                <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                  {
                    (dragg) => (
                      <li ref={dragg.innerRef} {...dragg.dragHandleProps} {...dragg.draggableProps}>{todo.text}</li>
                    )
                  }
              </Draggable>
              ))
            }
            {drop.placeholder}
          </ul>)
        }
      </Droppable>
    </DragDropContext>
    </>
  );
};

export default App;
