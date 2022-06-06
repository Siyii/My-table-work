<script lang="ts">
import { defineComponent } from 'vue';
import { columnDefaultProps } from './types';

export default defineComponent({
  name: 'MyColumn',
  props: columnDefaultProps,
  slots: ['header'],
});
</script>
