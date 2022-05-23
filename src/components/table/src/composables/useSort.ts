/**
 * 对表格进行排序，可指定两种排序方式
 * @param order
 * @param prop
 */

import { cloneDeep, orderBy } from 'lodash';
import { SetupContext } from 'vue';
import { TableSortConf } from '@/components/table';
import { DefaultRow } from '../types';

export const useSort = (
  props: TableSortConf | undefined,
  tableTemp: DefaultRow[],
  emit: SetupContext['emit']
) => {
  const tableData = cloneDeep(tableTemp);
  let sortedData = [];

  const sortCb = (order: 'asc' | 'desc', key: string | undefined) => {
    emit('onSortChange', {
      order,
      key,
    });
    if (!key) {
      return;
    }
    sortedData = orderBy(tableData, [key], [order]);
    return sortedData;
  };

  const clearCb = () => {
    emit('onSortChange', {
      order: '',
      key: '',
    });
  };

  if (typeof props !== 'undefined') {
    const { order, key } = props;
    sortedData = sortCb(order, key) || [];
  }

  return {
    sortedData,
    sortCb,
    clearCb,
  };
};
