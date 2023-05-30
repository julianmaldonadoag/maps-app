<template>
  <MapView />
  <SearchBarView />
  <MyLocationView />
  <TripDetailsView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '@/composables/usePlacesStore';
import MapView from '@/components/mapview/MapView.vue'
import MyLocationView from '@/components/my-location-btn/MyLocationBtnView.vue'
import SearchBarView from '@/components/searchbar/SearchBarView.vue'
import TripDetailsView from '@/components/trip-details/TripDetailsView.vue'

export default defineComponent({
  name: 'HomeView',
  components: { MapView, MyLocationView, SearchBarView, TripDetailsView },
  setup() {
    usePlacesStore();
  },
});
</script>
