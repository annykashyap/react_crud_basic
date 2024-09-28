import React, { useState } from "react";

const Todo = () => {
  //   const todokey = "reacttodo";

  // Initialize state with saved tasks from localStorage or an empty array
  //   const [task, settask] = useState(() => {
  //     const savedTasks = localStorage.getItem(todokey);
  //     return savedTasks ? JSON.parse(savedTasks) : [];
  //   });
  const [task, settask] = useState([]);

  // State to manage input field data
  const [tdata, setdata] = useState("");
  // State to track the index of the task being updated
  const [updateIndex, setUpdateIndex] = useState(null);
  // State to track the updated value
  const [updateValue, setUpdateValue] = useState("");

  // Handle adding new tasks
  const handleChange = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

     // Validate the input
     if (!tdata.trim()) {
      // If input box is empty or only whitespace, do nothing
    return;
     }
   if (task.includes(tdata)) {
     // If the task already exists in the list, do nothing
      return;
   }

    // Update the task list and clear the input
    settask((prevtask) => [...prevtask, tdata]);
    setdata(""); // Clear the input field
  };
  const handleDelete = (value) => {
    const updatedata = task.filter((curtask) => curtask !== value);
    settask(updatedata);
  };
  // Handle updating tasks
  const handleUpdate = (index) => {
    setUpdateIndex(index); // Set the index of the task to be updated
    setUpdateValue(task[index]); // Set the current value of the task in the update input field
  };

  // Save the updated task
  const saveUpdate = (index) => {
    const updatedTasks = [...task]; // Create a copy of the current tasks
    updatedTasks[index] = updateValue; // Update the specific task
    settask(updatedTasks); // Set the new state with the updated tasks
    setUpdateIndex(null); // Clear the update index to exit update mode
    setUpdateValue(""); // Clear the update value
  };

  // Save tasks to localStorage whenever the task list changes
  //   useEffect(() => {
  //     localStorage.setItem(todokey, JSON.stringify(task));
  //   }, [task]);

  return (
    <>
      <div>
        <input
          type="text"
          value={tdata}
          onChange={(e) => setdata(e.target.value)}
        />
        <button onClick={handleChange}>Add</button>
      </div>
      <div>
        <ul>
          {task.map((printdata, index) => (
            <li key={index}>
              {updateIndex === index ? (
                <>
                  {/* Input field for updating the task */}
                  <input
                    type="text"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                  />
                  <button onClick={() => saveUpdate(index)}>Save</button>
                </>
              ) : (
                <>
                  {/* Display the task and buttons for delete and update */}
                  <span>{printdata}</span>
                  <button onClick={() => handleDelete(printdata)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(index)}>Update</button>
                </>
              )}
            </li>
          ))}
        </ul>
        {/* Uncomment and implement clear functionality if needed */}
        {/* <button onClick={deleteAll}>Clear All</button> */}
      </div>
    </>
  );
};

export default Todo;
