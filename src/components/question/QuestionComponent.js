import React, { use } from 'react';
import React, { useState, useEffect } from 'react';
// TODO: Import any API functions you need from '../../api/client'
// Example: import { get, post } from '../../api/client';

function QuestionComponent() {
  // TODO: Define state variables needed for your question set
  const [taskData, setTaskData] = useState([]);
  const [status, setStatus] = useState(''); // 'idle', 'loading', 'success', 'error'

  // TODO: Implement data fetching inside a useEffect hook
  const fetchTasks = async (statusValue) => {
  try{
    const url=statusValue ?'/api/tasks?status=${statusValue}' :'/api/tasks';
    const res = await fetch(url);
    const data = await res.json();
    setTaskData(data);
  }catch(error){
    console.error('Error fetching tasks:', error);
  }
};
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const statusFromUrl = params.get('status')||"";
  setStatus(statusFromUrl);
  fetchTasks(statusFromUrl);
}; []);
const handleChange = (e)=>{
  const selectedStatus = e.target.value;
  setStatus(selectedStatus);
  fetchTasks(selectedStatus);
  const url = new URL(window.location);
  if(selectedStatus){
    url.searchParams.set('status', selectedStatus);
  }else{
    url.searchParams.delete('status');
  } 
  window.history.pushState({}, '', url);
  fetchTasks(selectedStatus);
};

  return (
    <div>
      <h2>Tak List</h2>
      <select value={status} onChange={handleChange}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      {}
      <ul>
        {taskData.length===0 ? (
          <li>No tasks found.</li>
        ) : (
          taskData.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description} ({task.status})
            </li>
          ))
        )}
     
    </div>
  );
  }

export default QuestionComponent;
