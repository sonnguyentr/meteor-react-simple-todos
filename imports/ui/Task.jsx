import React from "react";
import classnames from "classnames";

const Task = ({
  _id,
  text,
  username,
  isPrivate,
  isChecked = false,
  onCheckboxClick,
  onDeleteClick,
  onTogglePrivateClick,
}) => {
  const classes = classnames("task", {
    checked: !!isChecked,
  });

  return (
    <li className={classes}>
      <button onClick={() => onDeleteClick({ _id })}>&times;</button>
      <button onClick={() => onTogglePrivateClick({ _id, isPrivate })}>
        {isPrivate ? "Private" : "Public"}
      </button>
      <span>
        {text} {username && <i>({username})</i>}
      </span>
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
