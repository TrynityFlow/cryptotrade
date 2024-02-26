import { Input } from '@nextui-org/react';
import { InputError } from './error';

interface IField {
  name: string;
  value: string;
}

interface Props {
  label: string;
  type: string;
  field: IField;
  endContent?: React.ReactNode;
  meta?: { touched: boolean; error: string };
}

export const InputField = ({
  type,
  label,
  field,
  meta = { touched: false, error: '' },
  endContent = '',
}: Props) => {
  return (
    <div className="w-full md:max-w-sm">
      <Input
        type={type}
        label={label}
        color="primary"
        key={`${type}-${label}`}
        radius="sm"
        endContent={endContent}
        className="w-full"
        {...field}
      />
      <InputError>{meta.touched && meta.error}</InputError>
    </div>
  );
};
