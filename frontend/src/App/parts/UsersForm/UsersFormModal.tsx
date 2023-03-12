import React, { useEffect } from 'react';

import { Form, Input, Modal } from 'antd';

import { User } from '../../models/User';
import { CreateUserDTO } from '../../services/userService';
import { useForm } from 'antd/es/form/Form';

export type UsersFormProps = {
  onSubmit: (data: UserFormValue) => any,
  onCancel: () => any,
  user: User | undefined,
  open: boolean,
};

export type UserFormValue = CreateUserDTO;

const UsersFormModal: React.FC<UsersFormProps> = ({
  user,
  open,
  onSubmit,
  onCancel,
}) => {
  const [form] = useForm<UserFormValue>();

  const onModalOk = async () => {
    const totalErrors = form.getFieldsError().reduce((accumulator, field) => accumulator += field.errors.length, 0);
    if (totalErrors === 0) {
      onSubmit(form.getFieldsValue());
    }
  };

  useEffect(() => {
    if (open === false) {
      form.resetFields();
    } else {
      form.setFieldsValue(user || { });
    }
  }, [open]);

  return <Modal 
    title={typeof user !== 'undefined' ? `Update user ${user.id}` : 'Create user'}
    open={open}
    onOk={() => onModalOk()}
    onCancel={() => onCancel()}
  >
    <Form
      form={form}
      name="user-form"
    >
      <Form.Item name="name" label="Name" rules={[
        { required: true, message: 'The name is required!' }
      ]}>
        <Input/>
      </Form.Item>

      <Form.Item name="email" label="E-mail" rules={[
        { required: true, message: 'The e-mail is required!' }
      ]}>
        <Input type='email'/>
      </Form.Item>

      <Form.Item name="role" label="Role" rules={[
        { required: true, message: 'The role is required!' }
      ]}>
        <Input />
      </Form.Item>
    </Form>
  </Modal>;
};

export default UsersFormModal;
