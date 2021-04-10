<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <input type="file" @change="handleChanges" required />
      <div v-if="fileError" class="error">{{ fileError }}</div>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Add</button>
      <button v-else>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";

export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const file = ref(null);
    const fileError = ref(null);
    const { updateDoc } = useDocument("playlists", props.playlist.id);
    const isPending = ref(false);
    const { error, url, filePath, uploadVideo } = useStorage();

    const handleChanges = (e) => {
      const selected = e.target.files[0];

      if (selected && "video/mp4".includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Only file of type mp4 is allowed!";
      }
    };

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadVideo(file.value);

        const newSong = {
          title: title.value,
          artist: artist.value,
          videoUrl: url.value,
          filePath: filePath.value,
          id: Math.floor(Math.random() * 1000000),
        };
        console.log(newSong);
        await updateDoc({
          songs: [...props.playlist.songs, newSong],
        });

        isPending.value = false;
        title.value = "";
        artist.value = "";
      }
    };

    return {
      title,
      artist,
      showForm,
      handleSubmit,
      handleChanges,
      fileError,
      isPending,
      error,
    };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
