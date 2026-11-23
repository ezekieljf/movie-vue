<template>
  <div class="table-responsive">
    <table class="table table-dark table-hover align-middle">
      <thead class="table-danger">
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Year</th>
          <th>Genre</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="movie in movies" :key="movie._id">
          <td class="fw-bold">{{ movie.title }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.year }}</td>
          <td>
            <span class="badge bg-danger">
              {{ movie.genre }}
            </span>
          </td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <router-link
                class="btn btn-sm btn-outline-warning" 
                :to="{name: 'EditMovie', params: {id: movie._id}}"
              >
                Edit
              </router-link>

              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteMovie(movie._id)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="movies.length === 0">
          <td colspan="5" class="text-center text-secondary py-4">
            No movies found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
    import { Notyf } from 'notyf';
    import api from '../api';

    const notyf = new Notyf();


    defineProps({
        movies: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits(['refresh-movies']);

    const deleteMovie = async (id) => {

        const isConfirmed = confirm('Are you sure you want to delete this movie?');

        if (!isConfirmed) {
            return;
        }

        try {
            const res = await api.delete(`/movies/deleteMovie/${id}`);
            notyf.success("Movie Deleted!");
            emit('refresh-movies');

        } catch (err) {
            notyf.error("Faield to delete movie")
            console.error(err);
        }
    }
</script>
