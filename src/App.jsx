import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [inputData, setInputData] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [editableTodoMsg, setEditableTodoMsg] = useState("");
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [error, setError] = useState("");

  const handleTodoList = () => {
    setError("");
    if (inputData.trim() !== "") {
      const newTodo = { id: Date.now(), todoMsg: inputData };
      const updatedTodos = [...todoData, newTodo];
      setTodoData(updatedTodos);
      sessionStorage.setItem("todoData", JSON.stringify(updatedTodos));
      setInputData("");
    } else {
      setError("Todo is required");
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("todoData");
    if (storedData) {
      setTodoData(JSON.parse(storedData));
    }
  }, []);

  const handleRemoveTodo = (id) => {
    const updatedTodos = todoData.filter(todo => todo.id !== id);
    setTodoData(updatedTodos);
    localStorage.setItem("todoData", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (id) => {
    const todo = todoData.find((todo) => todo.id === id);
    setEditableTodoId(id);
    setEditableTodoMsg(todo.todoMsg);
  };

  const handleSaveTodo = (id) => {
    const updatedTodos = todoData.map(todo =>
      todo.id === id ? { ...todo, todoMsg: editableTodoMsg } : todo
    );
    setTodoData(updatedTodos);
    localStorage.setItem("todoData", JSON.stringify(updatedTodos)); // Update localStorage
    setEditableTodoId(null);
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="px-20 py-10 flex flex-col items-center max-[768px]:px-2">
          <h1 className="text-yellow-300 text-center text-3xl font-semibold my-2">
            Make Notes
          </h1>
          <div className="w-full flex gap-2 bg-gray-600 p-2 rounded-xl">
            <input
              className="px-3 py-2 w-full rounded-lg shadow-2xl text-gray-700 font-medium focus:shadow-2xl focus:outline-none"
              type="text"
              placeholder="Write Notes..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button
              onClick={handleTodoList}
              className="px-5 py-2 text-gray-600 font-semibold bg-blue-300 rounded-lg"
            >
              Add
            </button>
          </div>{" "}
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          <div className="flex flex-wrap justify-center mt-5 gap-10 max-[768px]:gap-5">
            {todoData.map((todo) => (
              <div
                key={todo.id}
                className="w-[250px] h-[300px] flex flex-col gap-2 pt-4 pb-2 px-2 bg-gray-600 rounded-md my-2 max-[500px]:w-[320px] max-[500px]:h-[400px]"
              >
                {editableTodoId === todo.id ? (
                  <>
                    <textarea
                      className="px-3 py-2 w-full h-full resize-none rounded-lg text-gray-800 bg-gray-200 font-semibold shadow-2xl border-2 focus:outline-none"
                      type="text"
                      value={editableTodoMsg}
                      onChange={(e) => setEditableTodoMsg(e.target.value)}
                    />
                    <button
                      onClick={() => handleSaveTodo(todo.id)}
                      className="px-5 py-2 text-black font-semibold bg-white rounded-lg shadow-xl transition duration-200 ease-in hover:bg-green-500 hover:text-white"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <textarea
                      className="px-3 py-2 w-full h-full resize-none rounded-lg text-white bg-gray-900 font-semibold focus:outline-none"
                      type="text"
                      readOnly
                      value={todo.todoMsg}
                    />
                    <button
                      onClick={() => handleEditTodo(todo.id)}
                      className="px-5 py-2 text-black font-semibold bg-white transition duration-200 ease-in hover:bg-yellow-300 hover:text-gray-700 rounded-lg shadow-xl"
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="px-5 py-2 text-black font-semibold bg-white transition duration-200 ease-in hover:bg-red-500 hover:text-white rounded-lg shadow-xl"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
