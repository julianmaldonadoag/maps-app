import { defineComponent, ref, computed } from 'vue';
import SearchResults from '@/components/search-results/SearchResultsView.vue';
import { usePlacesStore } from '@/composables';

export default defineComponent({
  name: 'SearchBar',
  components: { SearchResults },
  setup() {
    const debouceTimeout = ref();
    const debounceValue = ref('');

    const { searchPlacesByTerm } = usePlacesStore();

    return {
      debounceValue,
      searchTerm: computed({
        get() {
          return debounceValue.value;
        },
        set(val: string) {
          if (debouceTimeout.value) {
            clearTimeout(debouceTimeout.value);
          }
          debouceTimeout.value = setTimeout(() => {
            debounceValue.value = val;
            searchPlacesByTerm(val);
          }, 500);
        }
      })
    }
  }
})