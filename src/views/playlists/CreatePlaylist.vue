<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <!-- upload playlist image -->
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChanges" />
    <div class="error">{{ fileError }}</div>

    <div class="error"></div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const { url, filePath, uploadImage, error } = useStorage();

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value);
        console.log("Uploaded, url: ", url.value);
      }
    };

    // allow file's type
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleChanges = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Only file of type jpg, png, and jpeg are allowed!";
      }
    };

    return { title, description, handleSubmit, handleChanges, fileError };
  },
};
</script>

<style></style>
