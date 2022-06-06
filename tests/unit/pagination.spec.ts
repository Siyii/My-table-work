import { mount } from '@vue/test-utils';
import { MyPagination } from '@/components/pagination';

describe('Pagination.vue', () => {
  describe('rendering data is correct', () => {
    const wrapper = mount(MyPagination, {
      props: {
        size: 10,
        total: 100,
        currentPage: 1,
      },
    });

    // 显示所有的页数
    it('show page number', () => {
      const cols = wrapper.findAll('li.number');
      // const totalPage = Math.ceil(this.total / this.pageSize)
      expect(cols.length).toEqual(10);
    });

    // 点击页数,跳到第4页
    it('click page', async () => {
      wrapper.findAll('li.page-item a')[4].trigger('click');
      const pageChange = wrapper.emitted('onPageChange') || [];
      expect(pageChange[0]).toEqual([4]);

      await wrapper.setProps({
        currentPage: 4,
      });

      expect(wrapper.vm.getPageStatus(4)).toBe('active');
    });

    // 前一页（当前是第2页）
    it('click prev', async () => {
      await wrapper.setProps({
        currentPage: 2,
      });

      wrapper.find('a.btn-prev').trigger('click');
      const pageChange = wrapper.emitted('onPageChange') || [];
      expect(pageChange[1]).toEqual([1]);
    });

    it('click prev when disabled', async () => {
      await wrapper.setProps({
        currentPage: 1,
      });

      expect(wrapper.vm.getPageStatus('prev')).toBe('disabled');
    });

    // 下一页（当前是第9页）
    it('click next', async () => {
      await wrapper.setProps({
        currentPage: 9,
      });

      wrapper.find('a.btn-next').trigger('click');
      const pageChange = wrapper.emitted('onPageChange') || [];
      expect(pageChange[2]).toEqual([10]);
    });

    it('click next when disabled', async () => {
      await wrapper.setProps({
        currentPage: 10,
      });

      expect(wrapper.vm.getPageStatus('next')).toBe('disabled');
    });

    it('input page number', async () => {
      const textInput = wrapper.find('input[type="number"]');
      await textInput.setValue('10');

      expect(wrapper.vm.jumpInputValue).toBe(10);
      textInput.trigger('keyup.enter');
      const pageChange = wrapper.emitted('onPageChange') || [];
      expect(pageChange[3]).toEqual([10]);
    });

    it('input invalid page number', async () => {
      const textInput = wrapper.find('input[type="number"]');
      await textInput.setValue('100');
      textInput.trigger('keyup.enter');
      expect(wrapper.vm.jumpInputValue).toBe(10);

      await textInput.setValue('0');
      textInput.trigger('keyup.enter');
      expect(wrapper.vm.jumpInputValue).toBe(1);
    });

    // 调用分页器暴露的api进行跳转
    it('jump page by api', async () => {
      await wrapper.vm.jumpToPage(5);
      const pageChange = wrapper.emitted('onPageChange') || [];
      expect(pageChange[6]).toEqual([5]);
    });
  });
});
