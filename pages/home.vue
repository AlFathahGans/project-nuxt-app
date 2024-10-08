1m/'
'<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-3xl font-bold mb-4">
      Selamat Datang {{ userName }} di Halaman Utama
    </h1>
    <nuxt-link v-if="isAdmin" to="/admin" class="text-blue-500 hover:underline"
      >Lihat Halaman Admin</nuxt-link
    >
    <button
      v-if="isEmployee"
      @click="logout"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCookie, useFetch  } from "#app";
import { computed } from "vue";

const sessionCookie = useCookie("session");

const isAdmin = computed(() => {
  const session = sessionCookie.value;
  return session && session.user && session.user.role === "admin";
});
  
const isEmployee = computed(() => {
  const session = sessionCookie.value;
  return session && session.user && session.user.role === "employee";
});

// Ambil nama pengguna dari cookie
const userName = computed(() => {
  const session = sessionCookie.value;
  if (session && session.user && session.user.username) {
    return (
      session.user.username.charAt(0).toUpperCase() +
      session.user.username.slice(1)
    );
  }
  return "Guest";
});

const logout = async () => {
  await useFetch('/api/logout'); // Panggil endpoint logout
  window.location.href = "/login"; // Redirect ke halaman login
};
</script>
