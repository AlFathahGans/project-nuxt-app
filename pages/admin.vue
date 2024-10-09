<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-3xl font-bold mb-4">Halaman Admin</h1>
    <button
      @click="logout"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Logout
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFetch } from '#app';

export default defineComponent({
  methods: {
    async logout() {
      await useFetch('/api/logout'); // Panggil endpoint logout
      window.location.href = '/login'; // Redirect ke halaman login
    },
  },
});
</script>

<style>
/* Style sesuai kebutuhan */
</style>
