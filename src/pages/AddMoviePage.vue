<template>
  <div class="bg-dark text-light min-vh-100">
    <div class="container py-5">

      <div class="mb-4">
        <RouterLink
          to="/movies"
          class="btn btn-outline-light mb-3"
        >
          ← Back to Movies
        </RouterLink>

        <h2 class="fw-bold">Add New Movie</h2>
        <p class="text-secondary">
          Add a new title to the MovieVault collection.
        </p>
      </div>

      <div class="card bg-black text-light border-secondary shadow">
        <div class="card-body p-4">

          <form @submit.prevent="addMovie">
            <div class="mb-3">
              <label for="title" class="form-label">Movie Title</label>
              <input
                type="text"
                id="title"
                class="form-control bg-dark text-light border-secondary"
                placeholder="Enter movie title"
                v-model="title"
                required
              />
            </div>

            <div class="mb-3">
              <label for="director" class="form-label">Director</label>
              <input
                type="text"
                id="director"
                class="form-control bg-dark text-light border-secondary"
                placeholder="Enter director name"
                v-model="director"
                required
              />
            </div>

            <div class="mb-3">
              <label for="year" class="form-label">Release Year</label>
              <input
                type="number"
                id="year"
                class="form-control bg-dark text-light border-secondary"
                placeholder="Enter release year"
                v-model.number="year"
                min="1888"
                :max="new Date().getFullYear() + 5"
                required
              />
            </div>

            <div class="mb-3">
              <label for="genre" class="form-label">Genre</label>
              <select
                id="genre"
                class="form-select bg-dark text-light border-secondary"
                v-model="genre"
                required
              >
                <option disabled value="">Select a genre</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="animation">Animation</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="thriller">Thriller</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="description" class="form-label">Description</label>
              <textarea
                id="description"
                class="form-control bg-dark text-light border-secondary"
                rows="5"
                placeholder="Enter movie synopsis"
                v-model="description"
                required
              ></textarea>
            </div>

            <div class="d-flex gap-2">
              <button
                type="submit"
                class="btn btn-danger px-4"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Adding Movie...' : 'Add Movie' }}
              </button>

              <RouterLink
                to="/movies"
                class="btn btn-outline-secondary"
              >
                Cancel
              </RouterLink>
            </div>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';
    import { Notyf } from 'notyf';
    import api from '../api';

    import { useGlobalStore } from '../stores/global';

    const {user} = useGlobalStore();

    const router = useRouter();
    const notyf = new Notyf();

    const title = ref('');
    const director = ref('');
    const year = ref('');
    const genre = ref('');
    const description = ref('');

    const isLoading = ref(false);

    const addMovie = async () => {
        isLoading.value = true;

        const movieData = {
            title: title.value,
            director: director.value,
            year: year.value,
            genre: genre.value,
            description: description.value
        }

        try {
            const res = await api.post('/movies/addMovie', movieData);
            notyf.success('Movie added successfully!');
            router.push('/movies');
        } catch (err) {
            console.error(err);
            notyf.error(err.response?.data?.message || 'Failed to add movie.');
        } finally {
            isLoading.value = false;
        }
    }

    onBeforeMount(()=>{
        if(!user.isAdmin){
            router.push({path: "/"})
        }
    })
</script>
