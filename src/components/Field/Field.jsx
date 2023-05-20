import React from "react";

export const Field = ({ addTodo, value, setValue }) => {
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default Field;
