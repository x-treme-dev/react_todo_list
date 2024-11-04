 
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;    
}

   const TodoApp = () => {
     const [todos, setTodos] = useState<TodoItem[]>([]);
     const [newTodo, setNewTodo] = useState('');

     const addTodo = () => {
       if (newTodo !== '') {
         const newId = crypto.randomUUID();
         const newTodoItem: TodoItem = {
           id: newId,
           text: newTodo,
           completed: false,
         };
         setTodos([...todos, newTodoItem]);
         setNewTodo('');
       }
     };

     const removeTodo = (id: string) => {
       const updatedTodos = todos.filter((todo) => todo.id !== id);
       setTodos(updatedTodos);
     };

     const toggleComplete = (id: string) => {
       const updatedTodos = todos.map((todo) => {
         if (todo.id === id) {
           return { ...todo, completed: !todo.completed };
         }
         return todo;
       });
       setTodos(updatedTodos);
     };

     return (
       <div>
         <h1>Список дел</h1>
         <input
           type="text"
           value={newTodo}
           onChange={(e) => setNewTodo(e.target.value)}
         />
         <button onClick={addTodo}>Добавить задачу</button>
         <ul>
           {todos.map((todo) => (
             <li key={todo.id}>
               <input
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => toggleComplete(todo.id)}
               />
               <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                 {todo.text}
               </span>
               <button onClick={() => removeTodo(todo.id)}>Удалить</button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default TodoApp;




 
