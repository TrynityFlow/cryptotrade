import { Input } from '@nextui-org/react';
import { ChangeEventHandler } from 'react';

interface UIProps {
  type: string;
  setValue?: ChangeEventHandler<HTMLInputElement> | undefined;
  def?: string;
  endContent?: React.ReactNode;
}

interface Props extends UIProps {
    field: any,
  label: string,
  name: string,
  id: any,
  form: any
  value: string,
}

export const InputField = ({
  setValue,
  value,
  type,
  label,
  name = '',
  def = '',
  id,
  field,
  form: {errors, touched},
  endContent = '',
}: Props) => {
  return (
<>
<Input
      onChange={setValue}
      id={id}
      type={type}
      value={value}
      label={label}
      defaultValue={def}
      color="primary"
      key={`${type}-${label}-${def}`}
      radius="sm"
      name={name}
      endContent={endContent}
      className="max-w-sm"
    />
    {touched[field.name] && errors[field.name]}
</>
  );
};
