import { Button, ConfigProvider, Form, InputNumber } from 'antd';
import React from 'react';
import { SketchPicker } from 'react-color';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#1677ff',
};

export default () => {
  const [form] = Form.useForm();

  const [data, setData] = React.useState<ThemeData>(defaultData);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: data.colorPrimary, borderRadius: data.borderRadius } }}
    >
      <Form
        form={form}
        onValuesChange={(changedValues, allValues) => {
          const colorObj = changedValues?.colorPrimary
            ? { colorPrimary: allValues?.colorPrimary?.hex }
            : {};
          setData({
            ...allValues,
            ...colorObj,
          });
        }}
        name="theme"
        initialValues={defaultData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item valuePropName="color" name="colorPrimary" label="Primary Color">
          <SketchPicker />
        </Form.Item>
        <Form.Item name="borderRadius" label="Border Radius">
          <InputNumber />
        </Form.Item>
        <Form.Item name="submit" wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
