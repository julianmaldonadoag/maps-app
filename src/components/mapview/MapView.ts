import Mapboxgl from 'mapbox-gl';
import { usePlacesStore, useMapStore } from '@/composables';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'MapView',
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error('Map div element no exists')
      if (!userLocation.value) throw new Error('User location no exists')

      await Promise.resolve()

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup()
        .setLngLat(userLocation.value)
        .setHTML(`
          <h4>Mi ubicación</h4>
          <p>Lng: ${userLocation.value[0]}</p>
          <p>Lat: ${userLocation.value[1]}</p>
        `)

      const myLocationMarker = new Mapboxgl.Marker({ "color": "#EA4335" })
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      setMap(map);
    }

    onMounted(() => {
      if (isUserLocationReady.value) {
        return initMap();
      }
    })

    watch(isUserLocationReady, (newVal) => {
      if (isUserLocationReady.value) {
        return initMap();
      }
    })

    return {
      isUserLocationReady,
      mapElement
    }
  }
});