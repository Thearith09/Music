<template>
  <form @submit.prevent="handleLogin">
    <input type="emial" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const handleLogin = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return { error, handleLogin, email, password, isPending };
  },
};
</script>

<style></style>
