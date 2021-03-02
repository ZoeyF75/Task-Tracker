import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks();
  }, []);

  //fetch return promise for Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', 
    {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // //new task = generated id and everything in task object from onAdd in onSubmit
    // const newTask = {id, ...task};
    // //copies tasks that are already there and adds new task...similar to append in JQuery Tweeter Project
    // setTasks([...tasks, newTask]);
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
     {
       method: 'DELETE'
     })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-type' : 'application.json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json();
    setTasks(
      tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder} : task)
    )
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask
        (!showAddTask)} showAdd={showAddTask} /> 
      {/* shorter version of ternary if showAddTask then show AddTask component */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? 
      <Tasks 
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleReminder}
       /> 
       : 'No Tasks To Show' }
      <Footer />
    </div>
  );
} 

export default App;
