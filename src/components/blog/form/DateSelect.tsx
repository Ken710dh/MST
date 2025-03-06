import { Form, DatePicker } from 'antd'
import moment from 'moment'

import { Controller } from 'react-hook-form'

interface Props{
    errors: any,
    control: any,
    name: string,
    label: string,
    disabled?: (current: any) => boolean

}
const DateSelect: React.FC<Props> = ({errors,control,
    name,
    label,
    disabled }) => {
  return (
    <Form.Item
        label={label}
        validateStatus={errors.startdate ? "error" : ""}
        help={errors.startdate?.message}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              disabledDate={disabled}
              value={field.value ? moment(field.value) : null} // Ensure controlled state
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : "")
              }
            />
          )}
        />
      </Form.Item>

  )
}

export default DateSelect