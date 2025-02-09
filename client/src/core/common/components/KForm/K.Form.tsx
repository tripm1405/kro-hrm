import React from 'react';
import { Form, FormProps } from 'antd';
import KButton from '~core/common/components/KButton/KButton';
import { IKComponentWithChildrenProps } from '~core/common/types/component.type';

export interface IKFormProps<TData extends Record<string, any>>
  extends Omit<FormProps<TData>, 'children'>,
    IKComponentWithChildrenProps {}

const KForm = <TData extends Record<string, any>>({
  children,
  ...props
}: IKFormProps<TData>) => {
  const [form] = Form.useForm<TData>(props?.form);

  return (
    <Form<TData> form={form} layout="vertical" {...props}>
      {children}
      <Form.Item>
        <KButton htmlType="submit">XÁC NHẬN</KButton>
      </Form.Item>
    </Form>
  );
};

export default KForm;
