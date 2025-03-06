import { Form, Select } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form'
import { dummyCategories } from '../../../service/api/catergoryTask'


interface Props{
    errors: any,
    control: any,
}
const CategoryField: React.FC<Props> = ({errors, control}) => {
  return (
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
  )
}

export default CategoryField