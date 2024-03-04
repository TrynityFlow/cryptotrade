import { useState } from 'react';
import { TradeSearch } from './tradeSearch';
import { IField } from '../ui';

export const TradeForm = () => {
  const [search, setSearch] = useState('');
  const searchField: IField = {
    name: 'search',
    value: search,
  };

  return (
    <>
      <TradeSearch updateFn={setSearch} field={searchField} />
    </>
  );
};
