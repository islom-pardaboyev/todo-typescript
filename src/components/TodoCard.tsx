import { TodosType } from "../App";

interface TodoCardProps {
  item: TodosType;
  index: number;
  onDelete: (id: number) => void;
  completed: boolean;
  onChange: (id: number) => void;
  update: (id: number) => void
}

const TodoCard: React.FC<TodoCardProps> = ({
  item,
  index,
  onDelete,
  completed,
  onChange,
  update
}) => {
  const { id, todo } = item;

  return (
    <li className="flex items-center bg-gray-300 p-3 justify-between gap-2">
      <div className="flex items-center gap-1">
        <p>{index + 1}.</p>
        <h1 className="font-medium capitalize">{todo}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="bg-red-600 hover:bg-red-400 duration-300 text-white py-2 px-4 rounded-md"
        >
          Delete
        </button>
        <button onClick={() => update(id)}
          type="button"
          className="bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Update
        </button>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onChange(id)}
        />
      </div>
    </li>
  );
};

export default TodoCard;