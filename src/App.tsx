 
 import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;    
}

const TodoApp = () => {
  // текущее состояние todos и setTodos - функция, обновляющая состояние
  // аргумент TodoItem - исходное состояние, изменяемое через фунция setTodos
  const [todos, setTodos] = useState<TodoItem[]>([]);
  // через setNewTodo изменяем 
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      // объединить то, что ввел пользователь и данные, заполненные по шаблону, записать в текущее состояние todos
      setTodos([...todos, newTodoItem]);
      // очистить состояние 
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
    <div className="container mt-5">
      <h1 className="text-center">To Do List</h1>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text" 
            className="form-control"
            placeholder="Введите задачу..."
            value={newTodo}
            //При вводе в input данные сохраняются в newTodo
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-success w-100" onClick={addTodo}>Добавить задачу</button>
        </div>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="{list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}}">
            <div className="form-check">
              <input 
                type="checkbox"
                className="form-check-input"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <label 
                className="form-check-label" 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </label>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
