import { Input } from '@nextui-org/react';
import { ChangeEventHandler } from 'react';

interface Props {
  type: string;
  label: string;
  value?: string;
  setValue?: ChangeEventHandler<HTMLInputElement> | undefined;
  def?: string;
  endContent?: React.ReactNode;
}

export const InputField = ({
  setValue,
  value,
  type,
  label,
  def = '',
  endContent = '',
}: Props) => {
  return (
    <Input
      onChange={setValue}
      type={type}
      value={value}
      label={label}
      defaultValue={def}
      color="primary"
      key={`${type}-${label}-${def}`}
      radius="sm"
      endContent={endContent}
      className="max-w-sm"
    />
  );
};
