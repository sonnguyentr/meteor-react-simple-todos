import React, { useState } from "react";
import TaskModel from "../api/tasks";

const TaskForm = ({ user }) => {
  const [text, setText] = useState("");
  const handleChangeInput = (e) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    Meteor.call("task.insert", { text });
    setText("");
  };
  return (
    <form onSubmit={handleFormSubmit} className="task-form">
      <input
        onChange={handleChangeInput}
        value={text}
        type="text"
        placeholder="Type to add new tasks"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
