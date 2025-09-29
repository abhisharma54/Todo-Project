import React, { useState } from "react";

function Todo({ todos, onDelete, onUpdate, onSave, onEditable }) {
  const [updatedInput, setUpdatedInput] = useState("");

  return (
    <div className="flex flex-wrap justify-center mt-5 gap-10 max-[768px]:gap-5">
      {todos.map(({ id, content, isEdit, isEditable }) => (
        <div
          key={id}
          className={`w-[250px] h-[300px] ${
            isEditable
              ? "border-green-300 bg-[#064101]"
              : "border-zinc-300 bg-gray-700"
          } border flex flex-col gap-2 pt-4 pb-2 px-2 rounded-md my-2 max-[600px]:w-[320px] max-[600px]:h-[400px]`}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={isEditable ? true : false}
              onChange={(e) => onEditable(id, e.target.checked)}
              disabled={isEdit}
            />
            <p
              className={`${
                isEditable ? "text-green-300" : "text-white"
              } font-semibold`}
            >
              {isEditable ? "Done" : "Mark Complete"}
            </p>
          </div>
          {isEdit ? (
            <>
              <textarea
                className="save px-3 py-2 w-full h-full resize-none rounded-lg text-gray-800 bg-green-100 font-semibold shadow-2xl border-2 focus:outline-none"
                type="text"
                value={updatedInput}
                onChange={(e) => setUpdatedInput(e.target.value)}
              />
              <button
                onClick={() => onSave(id, updatedInput)}
                className="px-5 py-2 text-black font-semibold bg-green-400 rounded-lg shadow-xl transition duration-200 ease-in hover:bg-green-600 hover:text-white"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <textarea
                className={`edit px-3 py-2 w-full h-full ${
                  isEditable
                    ? "line-through bg-green-200 text-black"
                    : "bg-gray-900 text-white"
                } resize-none rounded-lg font-semibold focus:outline-none`}
                type="text"
                readOnly
                value={content}
              />
              <button
                onClick={() => {
                  onUpdate(id), setUpdatedInput(content);
                }}
                className={`px-5 py-2 text-black font-semibold bg-yellow-400 transition duration-200 ease-in rounded-lg shadow-xl ${
                  isEditable
                    ? "cursor-auto"
                    : "hover:bg-yellow-500 cursor-pointer"
                }`}
                disabled={isEditable}
              >
                Edit
              </button>
            </>
          )}
          <button
            onClick={() => onDelete(id)}
            className={`px-5 py-2 text-white font-semibold bg-red-500 transition duration-200 ease-in rounded-lg shadow-xl ${
              isEditable ? "cursor-auto" : "hover:bg-red-600 cursor-pointer"
            }`}
            disabled={isEditable}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
