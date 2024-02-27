import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useGetAllCrypto } from '../../hooks/queryHooks';
import {
  useCallback,
} from 'react';
import { ListElement } from './listElement';
import { Submit } from '../ui/inputs/submit';

export const CryptoList = () => {
  const { data, isLoading,fetchNextPage } = useGetAllCrypto();
  console.log()
  const columns = [
    { name: 'Id', uid: 'rank' },
    { name: 'Name', uid: 'name' },
    { name: 'Price', uid: 'priceUsd' },
    { name: 'Market Cap', uid: 'marketCapUsd' },
    { name: 'VWAP 24h', uid: 'vwap24Hr' },
    { name: 'Supply', uid: 'supply' },
    { name: 'Volume', uid: 'volumeUsd24Hr' },
    { name: 'Change 24h', uid: 'changePercent24Hr' },
  ];
  type Key =
    | 'rank'
    | 'supply'
    | 'name'
    | 'priceUsd'
    | 'volumeUsd24Hr'
    | 'vwap24Hr'
    | 'marketCapUsd'
    | 'changePercent24Hr';

  const renderCell = useCallback(
    (item: Request.Crypto, key: string | number) => {
      const value = item[key as Key];
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const percentF = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
      });
      const supplyF = Intl.NumberFormat('en', { notation: 'compact' });
      const floatVal = parseFloat(value);

      switch (key as Key) {
        case 'name':
          return <ListElement item={item} />;
        case 'marketCapUsd':
        case 'priceUsd':
        case 'volumeUsd24Hr':
        case 'vwap24Hr':
          return formatter.format(floatVal);
        case 'changePercent24Hr':
          return (
            <span
              className={floatVal > 0 ? 'text-success-400' : 'text-red-500'}
            >
              {percentF.format(floatVal / 100)}
            </span>
          );
        case 'supply':
          return supplyF.format(floatVal);
        default:
          return value;
      }
    },
    [],
  );
    const content = data?.pages.flatMap(i => i.data.data)
  return (
    <div className="flex flex-col items-center gap-6">
      <Table isStriped aria-label="Table of crypto currencies">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={content ? content : []}
          emptyContent={'No rows to display.'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(col) => <TableCell>{renderCell(item, col)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Submit
        onClick={() => fetchNextPage()}
        isLoading={isLoading}
      >Load More</Submit>
    </div>
  );
};
