<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-3xl font-bold mb-4">
      Selamat Datang {{ userName }} di Halaman Utama
    </h1>
    <nuxt-link v-if="isAdmin" to="/admin" class="text-blue-500 hover:underline">
      Lihat Halaman Admin
    </nuxt-link>
    <button
      v-if="isEmployee"
      @click="logout"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Logout
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCookie, useFetch } from '#app';

export default defineComponent({
  data() {
    return {
      sessionCookie: useCookie('session'),
    };
  },
  computed: {
    isAdmin() {
      const session = this.sessionCookie;
      return session && session.user && session.user.role === 'admin';
    },
    isEmployee() {
      const session = this.sessionCookie;
      return session && session.user && session.user.role === 'employee';
    },
    userName() {
      const session = this.sessionCookie;
      if (session && session.user && session.user.username) {
        return (
          session.user.username.charAt(0).toUpperCase() +
          session.user.username.slice(1)
        );
      }
      return 'Guest';
    },
  },
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
