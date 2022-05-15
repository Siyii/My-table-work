import { shallowMount, mount } from '@vue/test-utils';
import Pagination from '../../src/components/pagination/index.vue';

const _mount = (opt: any) =>
  mount<any>(opt, {
    attachTo: 'body',
  });

describe('Pagination.vue', () => {
  describe('rendering data is correct', () => {
    const wrapper = _mount({
      components: {
        Pagination,
      },
      template: `
        <Pagination
        :size="size"
        :total="total"
        :currentPage="currentPage"
        ></Pagination>
      `,
      created() {
        this.size = 10;
        this.total = 100;
        this.currentPage = 1;
      },
    });

    it('show page number', () => {
      const cols = wrapper.findAll('.pagination .number');
      // const totalPage = Math.ceil(this.total / this.pageSize)
      expect(cols.length).toEqual(10);
    });

    it('click prev', () => {});

    it('click next', () => {});

    it('click page', () => {});

    it('input page number', () => {});

    it('page change', () => {});
  });
});
