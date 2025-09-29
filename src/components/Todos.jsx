import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { useHandler } from "./useHandler";

function Todos() {
  const [todoData, setTodoData] = useState(() => {
    let stored = sessionStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const {
    handleCreate,
    handleDelete,
    handleUpdate,
    handleSave,
    handleEditable,
  } = useHandler(input, setTodoData, setInput, setError);

  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todoData || []));
  }, [todoData]);

  return (
    <div className="w-full h-screen">
      <div className="px-20 py-10 flex flex-col items-center max-[768px]:px-2">
        <h1 className="text-yellow-300 text-center text-3xl font-semibold my-2">
          Make Notes
        </h1>
        <form
          onSubmit={handleCreate}
          className="w-full flex gap-2 bg-gray-700 px-6 py-4 rounded-xl"
        >
          <input
            className="px-3 py-2 w-full rounded-lg shadow-2xl text-gray-700 font-medium focus:shadow-2xl focus:outline-none"
            type="text"
            placeholder="Write Notes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="px-5 py-2 text-white font-semibold bg-blue-500 rounded-lg transition duration-100 ease-in hover:bg-[#202020]">
            Add
          </button>
        </form>{" "}
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        <Todo
          todos={todoData}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onSave={handleSave}
          onEditable={handleEditable}
        />
      </div>
    </div>
  );
}

export default Todos;
