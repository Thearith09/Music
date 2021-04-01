<template>
  <div class="home">
    <ListView :playlists="documents" />
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";

export default {
  name: "Home",
  components: {
    ListView,
  },
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
