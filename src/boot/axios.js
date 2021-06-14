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

  loadGeneriVotiFilteredFilms: (genere, votiMinimi) => apiAxiosInstance
    .get('film/genere/' + genere + '/voti-minimi/' + votiMinimi).then(response => response.data),

   loadAttori: (page, numPerPage) => apiAxiosInstance.get('/attori/paginated/page/' + page + '/perpage/' + numPerPage)
   .then(response => response.data),

   loadAttoriFiltered: (page, numPerPage, anno, durata, genere) => apiAxiosInstance.get('/attori/anno-film/' + anno + '/durata/' + durata + '/genere/' + genere + '/npage/' + page + '/perpage/' +numPerPage)
   .then(response => response.data),

   registiBest: (from, to) => apiAxiosInstance.get('/registi/best/from/' + from + '/to/' + to)
   .then(response => response.data),

   registiMostFilms: () => apiAxiosInstance.get('/registi/most-films')
   .then(response => response.data),

   registiMediaFilms: () => apiAxiosInstance.get('/registi/best-avg')
   .then(response => response.data),
}
