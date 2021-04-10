<template>
  <form @submit.prevent="handleSignup">
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="emial" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Singup</button>
    <button v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const displayName = ref("");
    const password = ref("");
    const { error, signup, isPending } = useSignup();
    const router = useRouter();

    const handleSignup = async () => {
      await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        router.push({ name: "UserPlaylists" });
      }
    };

    return { email, password, displayName, isPending, error, handleSignup };
  },
};
</script>

<style></style>
