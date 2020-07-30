import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import _ from "lodash";

import Task from "./Task";
import TaskForm from "./TaskForm";

import TaskModel from "/imports/api/tasks";

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, "checked", false);
  }

  const { tasks, incompleteTasksCount } = useTracker(() => ({
    tasks: TaskModel.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: TaskModel.find({ checked: { $ne: true } }).count(),
  }));

  const handleCheckBoxClick = ({ _id, isChecked }) => {
    TaskModel.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

  const handleDeleteTask = ({ _id }) => {
    TaskModel.remove({ _id });
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
      <TaskForm />
    </div>
  );
};
