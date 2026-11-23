<template>
  <div class="bg-dark text-light min-vh-100">

    <section class="container py-5">
      <div class="row align-items-center py-lg-5">

        <div class="col-lg-7 py-5">
          <h1 class="display-2 fw-bold">
            Discover Your
            <span class="text-danger">Next Favorite Movie</span>
          </h1>

          <p class="lead text-secondary mt-4">
            Explore a world of movies. From timeless classics to the latest
            blockbusters, MovieVault has it all.
          </p>

          <RouterLink to="/movies" class="btn btn-danger btn-lg rounded-pill px-5 mt-3">
            ▶ Start Exploring
          </RouterLink>
        </div>

        <div class="col-lg-5 text-center">
          <div class="bg-black rounded-4 p-5 shadow">
            <div class="display-1 mb-3">🎬</div>
            <h4 class="fw-bold text-danger">YOUR NEXT MOVIE NIGHT</h4>
            <p class="text-secondary mb-0">Lights. Camera. Action.</p>
          </div>
        </div>

      </div>
    </section>

    <section class="bg-black py-5">
      <div class="container">

        <div class="text-center mb-5">
          <h2 class="fw-bold">Why MovieVault?</h2>
          <p class="text-secondary">
            Your ultimate destination for movies and more.
          </p>
        </div>

        <div class="row g-4">

          <div class="col-md-4">
            <div class="card bg-dark text-light border-secondary h-100 text-center p-4 feature-card">
              <div class="display-5 mb-3">🎞️</div>
              <h4 class="fw-bold">Vast Collection</h4>
              <p class="text-secondary mb-0">
                From blockbuster hits to hidden gems, discover movies for every mood.
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-dark text-light border-secondary h-100 text-center p-4 feature-card">
              <div class="display-5 mb-3">⚡</div>
              <h4 class="fw-bold">Easy Discovery</h4>
              <p class="text-secondary mb-0">
                Browse and explore movies with a simple and convenient experience.
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-dark text-light border-secondary h-100 text-center p-4 feature-card">
              <div class="display-5 mb-3">❤️</div>
              <h4 class="fw-bold">Personal Movie List</h4>
              <p class="text-secondary mb-0">
                Keep track of movies you love and the ones you want to watch.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="container text-center py-5">
      <h2 class="fw-bold">Your Next Favorite Movie Awaits.</h2>
      <p class="text-secondary mt-3">
        Start exploring and find your next movie experience.
      </p>

      <RouterLink to="/movies" class="btn btn-danger rounded-pill px-4 py-2 mt-2">
        Explore Movies
      </RouterLink>
    </section>

  </div>
</template>

<script setup>
    // import { onBeforeMount } from 'vue';
    // import { useGlobalStore } from '../stores/global';
    // const { user } = useGlobalStore();


    // onBeforeMount(()=>{
    //     if(user.token){
    //         router.push({path: "/"})
    //     }
    // })
</script>

<style scoped>

</style>
