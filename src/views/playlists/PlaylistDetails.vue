<template>
  <div v-if="getError && !isPending" class="error">
    Get Error: {{ getError }}
  </div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created By {{ playlist.username }}</p>
      <p class="description">{{ playlist.description }}</p>
      <div v-if="deleteError" class="error">Delete Error:{{ deleteError }}</div>
      <button v-if="ownership && !isPending" @click="handleDelete">
        Delete
      </button>
      <button v-if="isPending" disabled>Deleting</button>
    </div>
    <!-- song list -->
    <div class="song-list">song list here</div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { computed } from "@vue/runtime-core";
import useDocument from "@/composables/useDocument";
import { useRouter } from "vue-router";
import useStorage from "@/composables/useStorage";

export default {
  props: ["id"],
  setup(props) {
    const { user } = getUser();
    const router = useRouter();
    const { deleteImage } = useStorage();

    const { error: getError, document: playlist } = getDocument(
      "playlists",
      props.id
    );
    const { error: deleteError, isPending, deleteDoc } = useDocument(
      "playlists",
      props.id
    );

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    return {
      getError,
      playlist,
      ownership,
      isPending,
      handleDelete,
      deleteError,
    };
  },
};
</script>

<style>
.playlist-details {
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
