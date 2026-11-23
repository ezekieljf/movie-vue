<template>
  <div class="row g-4">
    <div
      v-for="movie in movies"
      :key="movie._id"
      class="col-12 col-md-6 col-lg-4"
    >
      <div
        class="card bg-black text-light border-secondary h-100 shadow-sm movie-card cursor-pointer"
        role="button"
        tabindex="0"
        @click="$emit('movie-click', movie._id)"
      >
        <div class="card-body d-flex flex-column">

          <h4 class="card-title fw-bold mb-2">
            {{ movie.title }}
          </h4>

          <p class="text-secondary small mb-3">
            Directed by {{ movie.director }} · {{ movie.year }}
          </p>

          <div class="mb-3">
            <span class="badge bg-danger">
              {{ movie.genre }}
            </span>
          </div>

          <p class="card-text text-secondary mb-0">
            {{ movie.description }}
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    defineProps({
      movies: {
        type: Array,
        required: true
      }
    })

    defineEmits(['movie-click'])
</script>

<style scoped>
    .movie-card {
        transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .movie-card:hover {
        transform: translateY(-5px);
        border-color: #dc3545 !important;
    }
</style>