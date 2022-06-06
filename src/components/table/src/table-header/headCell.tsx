import { defineComponent, toRefs, computed } from 'vue';
import { isFunction } from 'lodash';

const props = {
  // 列的实例信息
  data: {
    type: Object, // TODO 此处type要定义
    required: true,
  },
  rootProps: {
    type: Object,
    required: true,
  },
};

export default defineComponent({
  name: 'MyHeaderCell',
  props: props,
  emits: ['sort'],
  setup(props, { emit }) {
    const { data, rootProps } = toRefs(props);

    const isDefineColumn = computed(
      () => data.value?.children && isFunction(data.value.children.header)
    );

    const sort = (order: 'asc' | 'desc', key: string | undefined) => {
      emit('sort', order, key);
    };

    /* eslint-disable */
    return () => {
      return (
        <th>
          {isDefineColumn.value ? (
            <span>{data.value?.children.header()}</span>
          ) : (
            <span>{data.value?.props.label}</span>
          )}
          {rootProps.value?.sort && rootProps.value?.sort.key === data.value?.props.prop && (
            <span class="table-head_sort">
              <i
                class="table-head_sort-caret ascending"
                onClick={() =>
                  sort('asc', rootProps.value?.sort && rootProps.value?.sort.key)
                }
              ></i>
              <i
                class="table-head_sort-caret descending"
                onClick={() =>
                  sort('desc', rootProps.value?.sort && rootProps.value?.sort.key)
                }
              ></i>
            </span>
          )}
        </th>
      );
    };
  },
});
