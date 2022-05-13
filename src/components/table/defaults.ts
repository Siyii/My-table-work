import type { PropType } from 'vue';

// eslint-disable-next-line
type DefaultRow = any;

interface TableProps<T> {
  columnFieldList: Array<T>;
  tableData: Array<T>;
  emptyText: string;
  sort: {
    key: string;
    order: 'desc' | 'asc';
  };
}

const defaultProps = {
  // 表头
  columnFieldList: {
    type: Array as PropType<TableProps<DefaultRow>['columnFieldList']>,
    required: true,
    default: () => {
      return [];
    },
  },

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
  },
};

export default defaultProps;
export { DefaultRow, TableProps };
