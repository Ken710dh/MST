import { Form, Input } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form'

interface Props{
    errors: any,
    control: any,
}
const TaskField: React.FC<Props> = ({errors, control})=> {
  return (
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
  )
}

export default TaskField