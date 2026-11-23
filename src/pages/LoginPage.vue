<template>
  <div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">
    <div class="card bg-black text-light shadow p-4 border border-secondary w-100" style="max-width: 420px;">

      <div class="text-center mb-4">
        <h2 class="fw-bold">
          <span class="text-danger">▶</span> MovieVault
        </h2>
        <p class="text-secondary">Your next favorite movie awaits.</p>
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

        <button type="submit" class="btn btn-danger w-100 py-2 mt-2">
          Login
        </button>

      </form>

      <div class="text-center mt-4">
        <small class="text-secondary">
          Don't have an account?
          <RouterLink
            :to="{ name: 'Register' }"
            class="text-danger text-decoration-none"
          >
            Register
          </RouterLink>
        </small>
      </div>

    </div>
  </div>
</template>


<script setup>
    import { ref, watch, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import { useRouter } from 'vue-router';

    import { Notyf } from 'notyf';

    import api from '../api'

    const router = useRouter();
    const {getUserDetails, user} = useGlobalStore();
    const notyf = new Notyf();

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    

    const submit = async () => {
        try {
            console.log(email.value)
            const res = await api.post('/users/login', {
                email: email.value,
                password: password.value
            });

            if (res.data) {
                notyf.success("Login Successful");

                localStorage.setItem("token",res.data.access);

                getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                router.push({path: "/"});
            }
        } catch (err) {
            console.error(err.response);
            notyf.error('login failed');
        }
    }

    onBeforeMount(()=>{
        if(user.token){
            router.push({path: "/"})
        }
    })
</script>
