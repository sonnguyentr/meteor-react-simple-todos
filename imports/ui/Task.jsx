import React from "react";
import classnames from "classnames";

const Task = ({
  _id,
  text,
  isChecked = false,
  onCheckboxClick,
  onDeleteClick,
}) => {
  const classes = classnames("task", {
    checked: !!isChecked,
  });

  return (
    <li className={classes}>
      <button onClick={() => onDeleteClick({ _id })}>&times;</button>
      <span>{text}</span>
      <input
        type="checkbox"
        checked={isChecked}
        readOnly
        onClick={() => onCheckboxClick({ _id, isChecked })}
      />
    </li>
  );
};

export default Task;
