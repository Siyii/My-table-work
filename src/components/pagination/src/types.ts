export interface PaginationProps {
  size: number;
  total: number;
  currentPage: number;
}

export const defaultProps = {
  // 页码数量
  size: {
    type: Number,
    default: 10,
  },

  // 总条目数
  total: {
    require: true,
    type: Number,
  },

  // 当前页码
  currentPage: {
    require: true,
    type: Number,
  },
};
