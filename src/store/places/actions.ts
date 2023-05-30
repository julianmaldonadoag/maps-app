import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { Feature, PlacesResponse } from '@/interfaces/places'; 
import { searchApi } from '@/apis';


const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation( { commit }) {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => commit('setLngLat', {lng: coords.longitude, lat: coords.latitude}),
      (err) => {
        console.log(err);
        throw new Error('Failed to get user location');
      }
    );
  },

  async searchPlacesByTerm({ commit, state }, query: string): Promise<Feature[]> {
    if (query.length === 0) {
      commit('setPlaces', []);
      return []
    }

    if (!state.userLocation) {
      throw new Error('User location not set');
    }

    commit('setIsLoadingPlaces');

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(','),
      }
    })

    commit('setPlaces', resp.data.features);
    return resp.data.features;
  }
}

export default actions;