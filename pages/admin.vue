<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-3xl font-bold mb-4">Halaman Admin</h1>
    <button
      @click="logout"
      class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFetch  } from "#app";

const logout = async () => {
  await useFetch('/api/logout'); // Panggil endpoint logout
  window.location.href = "/login"; // Redirect ke halaman login
};
</script>
