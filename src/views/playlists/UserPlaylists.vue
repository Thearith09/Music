<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";

export default {
  components: {
    ListView,
  },
  setup() {
    const { user } = getUser();
    const { documents: playlists, error } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists, error };
  },
};
</script>

<style scoped>
h2 {
  padding-left: 20px;
}
</style>
