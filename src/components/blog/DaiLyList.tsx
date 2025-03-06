import React, { useState } from "react";
import { Todo } from "../../model";
import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux-tookit/todoListsSlice";
interface Props {
  dailytasks: Todo[];
}
const DaiLyList: React.FC<Props> = ({ dailytasks }) => {
  const dispatch = useDispatch();
  const [checkTasks, setCheckTasks] = React.useState<{
    [key: number]: boolean;
  }>(
    dailytasks.reduce((acc, todo) => {
      acc[todo.id] = todo.completed;
      return acc;
    }, {} as { [key: number]: boolean })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCheckboxChange = (id: number) => {
    setCheckTasks({
      ...checkTasks,
      [id]: !checkTasks[id],
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const deleteTodoTask = (id: number) => {
    dispatch(deleteTodo(id));
    setIsModalOpen(false);
  };
  return (
    <div className="grid grid-cols-2 gap-4 text-[14px] p-2 overflow-y">
      {dailytasks.map((todo) => (
        <div
          className={`${
            checkTasks[todo.id]
              ? "border-l-4 border-green-200"
              : "border-l-4 border-red-600"
          } p-4  shadow-md w-[500px]`}
          key={todo.id}
        >
          <div className="flex h-15 justify-between align-start border-b pb-2 border-gray-300">
            <div className="h-15 w-[60%]">
              <span className="font-semibold">Task:</span> {todo.task}
            </div>
            <div className="text-xs pt-[3px] text-gray-400">
              Created at: {todo.date}
            </div>
          </div>
          <div className=" flex justify-between align-center mt-2">
            <div className="flex gap-2 ">
              <span className="font-semibold">Category:</span>
              <p>{todo.category}</p>
            </div>
            <div className="flex align-center text-xs pt-[3px] text-gray-400 gap-4">
              <div>Start date: {todo.startdate}</div>
              <div>End date: {todo.enddate}</div>
            </div>
          </div>

          <div className="flex justify-between align-center">
            <div className="flex align-center gap-2">
              <p className="font-semibold pt-[6px]">Status:</p>
              <button onClick={() => handleCheckboxChange(todo.id)}>
                <p
                  className={`${
                    checkTasks[todo.id] ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {checkTasks[todo.id] ? "Done" : "Not Done"}
                </p>
              </button>
            </div>
            <Button
              type="text"
              style={{ fontSize: "20px", color: "gray" }}
              icon={<DeleteOutlined />}
              onClick={showModal}
            />
          </div>

          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={() => deleteTodoTask(todo.id)}
            onCancel={handleCancel}
          >
            <Typography.Text>
              Are you sure you want to delete this task?
            </Typography.Text>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default DaiLyList;
