import React from "react";
import { Button, Form} from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import * as z from "zod";
import { Todo } from "../../../model";
import { getFormattedDate } from "../../../moment";
import TaskField from "./TaskField";
import CategoryField from "./CategoryField";
import DateSelect from "./DateSelect";
import { useDispatch } from "react-redux";
import { addTodos } from "../../../redux-tookit/todoListsSlice";

export const schema = z.object({
  task: z.string().min(1, { message: "Task is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  startdate: z.string().min(1, { message: "Start date is required" }),
  enddate: z.string().min(1, { message: "End date is required" }),
});

const InputField: React.FC = () => {
  const {
    watch,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const handleAddTodo = (todo: Todo) => {
    dispatch(addTodos(todo));
  }

  const startDate = watch("startdate");
  const onSubmit = (data: any) => {
    console.log("🔥 onSubmit function is called!");
    console.log("✅ Form Data:", data);
    handleAddTodo({...data, date: getFormattedDate()})
    reset();
  };
  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      <TaskField errors={errors} control={control} />
      {/* Category Select */}
      <CategoryField errors={errors} control={control} />
      {/* Start Date */}
      <DateSelect
        label="Start date"
        name="startdate"
        errors={errors}
        control={control}
      />
      {/* End Date */}

      <DateSelect
        label="End date"
        name="enddate"
        errors={errors}
        control={control}
        disabled={(current) =>
          startDate ? current && current.isBefore(startDate, "day") : false
        }
      />

      <Button type="primary" htmlType="submit">
        Create Task
      </Button>
    </Form>
  );
};

export default InputField;
