import React, { Dispatch } from 'react';
import { IField, IMeta, InputField } from '../ui';

interface Props {
  updateFn: Dispatch<string>;
  field: IField;
  meta?: IMeta;
}

export const TradeSearch = ({ updateFn, field, meta }: Props) => {
  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    updateFn(e.currentTarget.value);
  };

  return (
    <InputField
      type="text"
      field={field}
      label="Search"
      meta={meta}
      onInput={searchHandler}
    />
  );
};
