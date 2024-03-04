import { Input } from '@nextui-org/react';

export interface IField {
  name: string;
  value: string;
}

export interface IMeta {
  touched: boolean;
  error: string;
}

interface Props {
  label: string;
  type: string;
  field: IField;
  endContent?: React.ReactNode;
  meta?: IMeta;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  type,
  label,
  field,
  meta = { touched: false, error: '' },
  onInput,
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
        onInput={onInput}
        isInvalid={meta.touched && !!meta.error}
        errorMessage={meta.touched && meta.error}
      />
    </div>
  );
};
