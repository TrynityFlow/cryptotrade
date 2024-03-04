import { useState } from 'react';
import { TradeSearch } from './tradeSearch';
import { IField } from '../ui';
import { Ranking } from './ranking';
import { SearchList } from './searchList';

export const TradeList = () => {
  const [search, setSearch] = useState('');
  const searchField: IField = {
    name: 'search',
    value: search,
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-y-8">
      <TradeSearch updateFn={setSearch} field={searchField} />

      {!search && <Ranking />}

      {!!search && <SearchList search={search} />}
    </div>
  );
};
