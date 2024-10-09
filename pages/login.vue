<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="mb-6 text-2xl font-bold text-center">Login</h2>
      <div>
        <label for="username" class="block mb-1 text-sm font-medium">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
      </div>
      <div class="mt-4">
        <label for="password" class="block mb-1 text-sm font-medium">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
      </div>
      <p v-if="generalError" class="text-red-500 text-xs mt-1">{{ generalError }}</p>
      <button type="submit" class="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login</span>
      </button>
    </form>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import * as yup from 'yup';

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
      errors: {},
      generalError: '',
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errors = {};
      
      const schema = yup.object().shape({
        username: yup.string().min(4).required(),
        password: yup.string().min(4).required(),
      });

      try {
        await schema.validate({ username: this.username, password: this.password });

        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.redirect) window.location.href = data.redirect;
        } else {
          this.generalError = 'Login failed, please try again.';
        }
      } catch (error) {
        if (error.name === 'ValidationError') {
          this.errors[error.path] = error.message;
        } else {
          this.generalError = 'Invalid credentials, please try again.';
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>