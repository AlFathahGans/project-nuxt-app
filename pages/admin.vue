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

<script setup lang="ts">
import { useCookie } from "#app";

const cookie = useCookie("session"); // Ganti dengan nama cookie yang ingin dihapus

const logout = () => {
  document.cookie = "session=; Max-Age=0; path=/"; // Hapus cookie secara eksplisit
  window.location.href = "/login"; // Redirect ke halaman login
};
</script>
