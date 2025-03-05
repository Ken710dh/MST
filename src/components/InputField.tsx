import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { dummyCategories } from "../service/api/catergoryTask";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  task: z.string().nonempty("Task is required"),
  category: z.string().nonempty("Category is required"),
  startdate: z.string().nonempty("Start date is required"),
  enddate: z.string().nonempty("End date is required"),
});

const InputField: React.FC = () => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("🔥 onSubmit function is called!");
    console.log("✅ Form Data:", data);
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
      {/* Task Input */}
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

      {/* Start Date */}
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
              onChange={(date) =>
                field.onChange(
                  date ? new Date(date).toISOString().split("T")[0] : ""
                )
              }
            />
          )}
        />
      </Form.Item>

      {/* End Date */}
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
              onChange={(date) =>
                field.onChange(
                  date ? new Date(date).toISOString().split("T")[0] : ""
                )
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
