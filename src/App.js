import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    }
  ]);

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    //new task = generated id and everything in task object from onAdd in onSubmit
    const newTask = {id, ...task};
    //copies tasks that are already there and adds new task...similar to append in JQuery Tweeter Project
    setTasks([...tasks, newTask]);
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
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
    </div>
  );
} 

export default App;
