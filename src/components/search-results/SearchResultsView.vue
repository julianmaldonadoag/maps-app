<script lang="ts" src="./SearchResults.ts"></script>

<template>
  <div v-if="isLoadingPlaces"
    class="alert alert-primary text-center"
  >
    <h5>Cargando</h5>
    <span>Espere por favor</span>
  </div>
  <ul v-else-if="places.length > 0" 
    class="list-group mt-3"
  >
    <li 
      v-for="place in places"
      :key="place.id"
      @click="onPlaceClicked(place)"
      class="list-group-item list-group-item-action"
      :class="{ 'active': place.id === activePlace }"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button 
          class="btn btn-outline-primary btn-sm"
          :class="(place.id === activePlace) ? 'btn-outline-light' : 'btn-outline-dark'"
          @click="getRouteDirections(place)"
        >
          Direcciones
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li {
  cursor: pointer;
}

h5 {
  font-size: 15px !important;
}

p {
  font-size: 10px !important;
  margin-bottom: 10px;
}
</style>