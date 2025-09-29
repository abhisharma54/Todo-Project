export const useHandler = function (input, setTodoData, setInput, setError) {
  const handleCreate = (e) => {
    e.preventDefault();
    setError("");
    if (input.trim() !== "") {
      const todo = {
        id: Date.now(),
        content: input,
        isEdit: false,
        isEditable: false,
      };
      setTodoData((prev) => [...prev, todo]);
      setInput("");
    } else {
      setError("Todo is required");
      setTimeout(() => setError(""), 2000);
    }
  };

  const updateTodo = (id, change) => {
    setTodoData((prev) =>
      change === "delete"
        ? prev.filter((todo) => todo.id !== id)
        : prev.map((todo) => (todo.id === id ? { ...todo, ...change } : todo))
    );
  };

  const handleDelete = (id) => {
    updateTodo(id, "delete");
  };

  const handleUpdate = (id) => {
    updateTodo(id, { isEdit: true });
  };

  const handleSave = (id, content) => {
    updateTodo(id, { content, isEdit: false });
  };

  const handleEditable = (id, check) => {
    updateTodo(id, { isEditable: check });
  };

  return {
    handleCreate,
    handleDelete,
    handleUpdate,
    handleSave,
    handleEditable,
  };
};
