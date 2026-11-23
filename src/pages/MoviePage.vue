<template>
  <div class="bg-dark text-light min-vh-100">
    <div class="container py-5">

      <RouterLink
        to="/movies"
        class="btn btn-outline-light mb-4"
      >
        ← Back to Movies
      </RouterLink>

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="text-secondary mt-3">Loading movie...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else-if="movie" class="row g-4">

        <div class="col-md-4">
          <div class="bg-black rounded-4 border border-secondary
                      d-flex align-items-center justify-content-center
                      display-1 text-danger"
               style="min-height: 400px;">
            🎬
          </div>
        </div>

        <div class="col-md-8">
          <div class="p-md-3">

            <h1 class="display-4 fw-bold">
              {{ movie.title }}
            </h1>

            <span class="badge bg-danger mb-3">
              {{ movie.genre }}
            </span>

            <p class="text-secondary fs-5">
              {{ movie.year }}
            </p>

            <hr class="border-secondary">

            <h5 class="fw-bold">Director</h5>
            <p class="text-secondary">
              {{ movie.director }}
            </p>

            <h5 class="fw-bold mt-4">About this Movie</h5>
            <p class="text-secondary lh-lg">
              {{ movie.description }}
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useRoute } from "vue-router";

    import api from '../api';

    const movie = ref([]);
    const isLoading = ref(true)


    const fetchMovie = async () => {
        try {
            const route = useRoute();
            const res = await api.get(`/movies/getMovie/${route.params.id}`);
            movie.value = res.data;
        } catch (err) {
            console.error(err);
            notyf.error("Error loading details");
        } finally {
            isLoading.value = false;
        }
    }
    
    onBeforeMount(()=>{
        fetchMovie();
    })
</script>