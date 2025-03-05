import React, { useState } from "react";
import { Todo } from "../model";
import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux-tookit/todoListsSlice";
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
    <div className="bg-blue-200 grid grid-cols-2 gap-4">
      {dailytasks.map((todo) => (
        <div
          className={`${
            checkTasks[todo.id]
              ? "border border-green-600"
              : "border border-red-600"
          } p-4 rounded shadow-md w-[500px]`}
          key={todo.id}
        >
          <div>{todo.text}</div>
          <div>
            <div>{todo.date}</div>
            <div>Start date</div>
          </div>
          <div>End date</div>

          <div>
            <button onClick={() => handleCheckboxChange(todo.id)}>
              <p
                className={`${
                  checkTasks[todo.id] ? "text-green-400" : "text-red-400"
                }`}
              >
                {checkTasks[todo.id] ? "Done" : "Not Done"}
              </p>
            </button>
            <Button
              type="text"
              style={{ fontSize: "30px", color: "gray" }}
              icon={<DeleteOutlined  />}
              onClick={showModal}
            />
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
        </div>
      ))}
    </div>
  );
};

export default DaiLyList;
