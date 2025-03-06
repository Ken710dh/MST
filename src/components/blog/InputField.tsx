import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { dummyCategories } from "../../service/api/catergoryTask";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import * as z from "zod";
import { Todo } from "../../model";
import { getFormattedDate } from "../../moment";

const schema = z.object({
  task: z.string().min(1, { message: "Task is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  startdate: z.string().min(1, { message: "Start date is required" }),
  enddate: z.string().min(1, { message: "End date is required" }),
});
interface Props {
  handleAddTodo: (data: Todo) => void;
}
const InputField: React.FC<Props> = ({ handleAddTodo }) => {
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
  const startDate = watch("startdate");
  const onSubmit = (data: any) => {
    console.log("🔥 onSubmit function is called!");
    console.log("✅ Form Data:", data);
    const todo: Todo = {
      ...data,
      id: Date.now(),
      date: getFormattedDate(),
      completed: false,
    };
    handleAddTodo(todo);

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
      <Form.Item
        label="Task"
        validateStatus={errors.task ? "error" : ""}
        help={errors.task?.message}
      >
        <Controller
          name="task"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      {/* Category Select */}
      <Form.Item
        label="Category"
        validateStatus={errors.category ? "error" : ""}
        help={errors.category?.message}
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select {...field} onChange={(value) => field.onChange(value)}>
              {dummyCategories.map((category, index) => (
                <Select.Option key={index} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item
        label="Start date"
        validateStatus={errors.startdate ? "error" : ""}
        help={errors.startdate?.message}
      >
        <Controller
          name="startdate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? moment(field.value) : null} // Ensure controlled state
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : "")
              }
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="End date"
        validateStatus={errors.enddate ? "error" : ""}
        help={errors.enddate?.message}
      >
        <Controller
          name="enddate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              disabledDate={(current) => {
                return startDate
                  ? current && current.isBefore(startDate, "day")
                  : false;
              }}
              value={field.value ? moment(field.value) : null} // Ensure controlled state
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : "")
              }
            />
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Create Task
      </Button>
    </Form>
  );
};

export default InputField;
