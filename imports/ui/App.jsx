import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import _ from "lodash";

import Task from "./Task";
import TaskForm from "./TaskForm";
import LoginForm from "./LoginForm";

import TaskModel from "/imports/api/tasks";

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, "isChecked", { $ne: true });
  }

  const { tasks, incompleteTasksCount, user } = useTracker(() => ({
    tasks: TaskModel.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: TaskModel.find({ isChecked: { $ne: true } }).count(),
    user: Meteor.user(),
  }));
  console.log(tasks);
  if (!user) {
    return (
      <div className="simple-todos-react">
        <LoginForm />
      </div>
    );
  }

  const handleCheckBoxClick = ({ _id, isChecked }) =>
    Meteor.call("task.setChecked", { taskId: _id, isChecked: !isChecked });

  const handleDeleteTask = ({ _id }) => {
    Meteor.call("task.remove", { taskId: _id });
  };

  return (
    <div className="simple-todos-react">
      <h1>Todo List ({incompleteTasksCount})</h1>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            readOnly
            checked={!!hideCompleted}
            onClick={() => setHideCompleted(!hideCompleted)}
          />
          Hide Completed
        </label>
      </div>

      <ul className="tasks">
        {tasks.map((task) => (
          <Task
            key={task._id}
            {...task}
            onCheckboxClick={handleCheckBoxClick}
            onDeleteClick={handleDeleteTask}
          />
        ))}
      </ul>
      <TaskForm user={user} />
    </div>
  );
};
