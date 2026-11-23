<template>
  <div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">
    <div class="card bg-black text-light shadow p-4 border border-secondary w-100" style="max-width: 420px;">

      <div class="text-center mb-4">
        <h2 class="fw-bold">
          <span class="text-danger">▶</span> MovieVault
        </h2>
        <p class="text-secondary">Create your account and discover your next favorite movie.</p>
      </div>

      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input
            type="email"
            class="form-control bg-dark text-light border-secondary"
            id="email"
            placeholder="Enter your email"
            v-model="email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control bg-dark text-light border-secondary"
              id="password"
              placeholder="Enter your password"
              v-model="password"
              required
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <div class="input-group">
            <input
              :type="showCPassword ? 'text' : 'password'"
              class="form-control bg-dark text-light border-secondary"
              id="confirmPassword"
              placeholder="Confirm your password"
              v-model="confirmPassword"
              required
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="showCPassword = !showCPassword"
            >
              {{ showCPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-danger w-100 py-2 mt-2">
          Register
        </button>

      </form>

      <div class="text-center mt-4">
        <small class="text-secondary">
          Already have an account?
          <RouterLink
            :to="{ name: 'Login' }"
            class="text-danger text-decoration-none"
          >
            Login
          </RouterLink>
        </small>
      </div>

    </div>
  </div>
</template>


<script setup>
    import { ref, watch, onBeforeMount } from 'vue'
    import { useGlobalStore } from '../stores/global';
    import { useRouter } from 'vue-router';

    import { Notyf } from 'notyf';

    import api from '../api'

    const router = useRouter();
    const {getUserDetails, user} = useGlobalStore();
    const notyf = new Notyf();

    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const showPassword = ref(false);
    const showCPassword = ref(false);
    

    const submit = async () => {
        try {
            if (password.value != confirmPassword.value) {
                notyf.error("Passwords do not match!");
                return
            }

            const res = await api.post('/users/register', {
                email: email.value,
                password: password.value
            });

            if (res.data) {
                notyf.success("Registered Successful");

                email.value = "";
                password.value = "";
                confirmPassword.value = "";

                router.push({path: "/login"});
            }
        } catch (err) {
            console.error(err.response);
            notyf.error("Registered Failed");
        }
    }

    onBeforeMount(()=>{
        if(user.token){
            router.push({path: "/"})
        }
    })
</script>
