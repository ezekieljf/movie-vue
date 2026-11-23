<template>
  <div class="container-fluid py-4 px-5 text-light bg-dark min-vh-100">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 class="fw-bold">
          {{ user.isAdmin ? 'Manage Movies' : 'Movies' }}
        </h2>

        <p class="text-secondary mb-0">
          {{ user.isAdmin
            ? 'Manage the MovieVault movie collection.'
            : 'Discover movies to add to your collection.'
          }}
        </p>
      </div>

      <router-link
        v-if="user.isAdmin"
        class="btn btn-danger"
        :to="{name: 'AddMovie'}"
      >
        + Add Movie
      </router-link>
    </div>

    <AdminMovieList
      v-if="user.isAdmin"
      :movies="movies"
      @refresh-movies="fetchMovies"
    />
    
    <MovieList
      v-else
      :movies="movies"
      @movie-click="getMovie"
    />

  </div>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import api from '../api';
    import { useRouter } from 'vue-router';
    import { Notyf } from 'notyf';

    import MovieList from '../components/MovieList.vue';
    import AdminMovieList from '../components/AdminMovieList.vue';

    const {user} = useGlobalStore();

    const notyf = new Notyf();
    const router = useRouter();
    const globalStore = useGlobalStore();

    const movies = ref([]);

    const fetchMovies = async () => {
        try {
            const res = await api.get('/movies/getMovies');
            movies.value = res.data.movies;
        } catch (err) {
            console.error(err);
        }
    }

    const getMovie = (id) => {
        if (!user.token) {
            notyf.error('Please log in to view this movie.');
            router.push({ name: 'Login' });
        } else {
            router.push({ path: `/movies/${id}` });
        }
    }

    onBeforeMount(() => {
        fetchMovies();
    })
</script>