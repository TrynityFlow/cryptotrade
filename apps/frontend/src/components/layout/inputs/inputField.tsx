import { Input } from '@nextui-org/react';

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
    <div>
      <Input
        type={type}
        label={label}
        color="primary"
        key={`${type}-${label}`}
        radius="sm"
        endContent={endContent}
        className="md:max-w-sm w-full"
        {...field}
      />
      {meta.touched && meta.error}
    </div>
  );
};
