<script setup>
    import {onBeforeMount, ref} from "vue";
    import { useGlobalStore } from "../stores/global";
    const {user} = useGlobalStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black py-3">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand fw-bold fs-3">
        <span class="text-danger">▶</span> MovieVault
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link :to="{ name: 'Movies' }" class="nav-link">Movies</router-link>
          <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!user.email">Login</router-link>
          <router-link :to="{ name: 'Logout'}" class="nav-link" v-else>Logout</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>