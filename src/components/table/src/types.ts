import type { PropType } from 'vue';

// eslint-disable-next-line
export type DefaultRow = any;

export interface TableSortConf {
  key: string;
  order: 'desc' | 'asc';
}

export interface TableProps<T> {
  tableData: Array<T>;
  emptyText: string;
  sort?: TableSortConf;
}

export const tableDefaultProps = {
  // 表格数据
  tableData: {
    type: Array as PropType<TableProps<DefaultRow>['tableData']>,
    required: true,
    default: () => {
      return [];
    },
  },

  // 表格为空时提示文字
  emptyText: {
    type: String,
    default: '暂无数据',
  },

  sort: {
    type: Object as PropType<TableProps<DefaultRow>['sort']>,
    default: () => {
      return {
        key: '',
        order: '',
      };
    },
  },
};

export interface TableColumnProps {
  prop: string;
  label: string;
}

export const columnDefaultProps = {
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
};
