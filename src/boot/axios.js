import Vue from 'vue'
import axios from 'axios'

const encodeQueryString = (data) => Object.entries(data)
  .filter(([_, value]) => value !== undefined)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');

const apiAxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {Accept: 'application/json'},
});

Vue.prototype.$axios = axios

Vue.prototype.$api = {

  paginatedFilms: (params) => apiAxiosInstance.get('film' + (params ? '?' + encodeQueryString(params) : ''))
    .then(response => response.data),

  loadFilm: (id) => apiAxiosInstance.get('film/' + encodeURIComponent(id))
    .then(response => response.data),

}
