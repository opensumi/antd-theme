import React, { useMemo, useState } from 'react';
import { Watermark, Popover, Typography, Form, Input, Slider, Space, InputNumber } from 'antd';
import { SketchPicker } from 'react-color';
import type { RGBColor } from 'react-color';

const { Paragraph } = Typography;

interface ColorPickerProps {
  value?: RGBColor;
  onChange?: (value: RGBColor) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const switchStyle = {
    padding: 4,
    background: '#fff',
    borderRadius: 2,
    border: '1px solid #dedede',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const colorStyle = {
    width: 36,
    height: 14,
    borderRadius: 2,
    background: `rgba(${value?.r}, ${value?.g}, ${value?.b}, ${value?.a})`,
  };

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      overlayInnerStyle={{ padding: 0 }}
      content={<SketchPicker color={value} onChange={(color) => onChange?.(color.rgb)} />}
    >
      <div style={switchStyle}>
        <div style={colorStyle} />
      </div>
    </Popover>
  );
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState({
    content: 'Ant Design',
    color: { r: 0, g: 0, b: 0, a: 0.15 },
    fontSize: 16,
    zIndex: 11,
    rotate: -22,
    gap: [100, 100] as [number, number],
    offset: undefined,
  });
  const { content, color, fontSize, zIndex, rotate, gap, offset } = config;

  const watermarkProps = useMemo(
    () => ({
      content,
      font: {
        color: `rgba(${color.r},${color.g},${color.b},${color.a})`,
        fontSize,
      },
      zIndex,
      rotate,
      gap,
      offset,
    }),
    [config],
  );

  return (
    <div style={{ display: 'flex' }}>
      <Watermark {...watermarkProps}>
        <Typography>
          <Paragraph>
            The light-speed iteration of the digital world makes products more complex. However,
            human consciousness and attention resources are limited. Facing this design
            contradiction, the pursuit of natural interaction will be the consistent direction of
            Ant Design.
          </Paragraph>
          <Paragraph>
            Natural user cognition: According to cognitive psychology, about 80% of external
            information is obtained through visual channels. The most important visual elements in
            the interface design, including layout, colors, illustrations, icons, etc., should fully
            absorb the laws of nature, thereby reducing the user&apos;s cognitive cost and bringing
            authentic and smooth feelings. In some scenarios, opportunely adding other sensory
            channels such as hearing, touch can create a richer and more natural product experience.
          </Paragraph>
          <Paragraph>
            Natural user behavior: In the interaction with the system, the designer should fully
            understand the relationship between users, system roles, and task objectives, and also
            contextually organize system functions and services. At the same time, a series of
            methods such as behavior analysis, artificial intelligence and sensors could be applied
            to assist users to make effective decisions and reduce extra operations of users, to
            save users&apos; mental and physical resources and make human-computer interaction more
            natural.
          </Paragraph>
        </Typography>
        <img
          style={{
            zIndex: 10,
            width: '100%',
            maxWidth: 800,
            position: 'relative',
          }}
          src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
          alt="示例图片"
        />
      </Watermark>
      <Form
        style={{
          width: 280,
          flexShrink: 0,
          borderLeft: '1px solid #eee',
          paddingLeft: 20,
          marginLeft: 20,
        }}
        form={form}
        layout="vertical"
        initialValues={config}
        onValuesChange={(_, values) => {
          setConfig(values);
        }}
      >
        <Form.Item name="content" label="Content">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorPicker />
        </Form.Item>
        <Form.Item name="fontSize" label="FontSize">
          <Slider step={1} min={0} max={100} />
        </Form.Item>
        <Form.Item name="zIndex" label="zIndex">
          <Slider step={1} min={0} max={100} />
        </Form.Item>
        <Form.Item name="rotate" label="Rotate">
          <Slider step={1} min={-180} max={180} />
        </Form.Item>
        <Form.Item label="Gap" style={{ marginBottom: 0 }}>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name={['gap', 0]}>
              <InputNumber placeholder="gapX" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['gap', 1]}>
              <InputNumber placeholder="gapY" style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Offset" style={{ marginBottom: 0 }}>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name={['offset', 0]}>
              <InputNumber placeholder="offsetLeft" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['offset', 1]}>
              <InputNumber placeholder="offsetTop" style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
