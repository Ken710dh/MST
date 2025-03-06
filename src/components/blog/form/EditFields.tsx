import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./InputField";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "antd";
import TaskField from "./TaskField";
import CategoryField from "./CategoryField";
import DateSelect from "./DateSelect";
import { useDispatch } from "react-redux";
import { editTodo } from "../../../redux-tookit/todoListsSlice";
import { Todo } from "../../../model";

interface Props {
  user: Todo;
  closeModal: () => void;
  handleOpen: boolean;
}
const EditFields: React.FC<Props> = ({ user, closeModal, handleOpen }) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: user,
  });

  const startDate = watch("startdate");
  const dispatch = useDispatch();
  const handleEditTodo = (user: Todo) => {
    dispatch(editTodo(user));
    closeModal()
  };
const onSubmit = ((data: any) => {
    console.log("🔥 onSubmit function is called!");
    console.log("✅ Form Data:", data);
    handleEditTodo({ ...user, ...data });
  });
  return (
    <div>
        <Modal open={handleOpen} footer = {null} onCancel={closeModal}>
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
          Save
        </Button>
        <Button onClick={closeModal} type="default" htmlType="button">
          Cancel
        </Button>
      </Form>
        </Modal>

    </div>
  );
};

export default EditFields;
