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
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const { url, filePath, uploadImage, error } = useStorage();
    const { addDoc } = useCollection("playlists");
    const { user } = getUser();
    const router = useRouter();

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);

        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });

        isPending.value = false;

        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
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

    return {
      title,
      description,
      handleSubmit,
      handleChanges,
      fileError,
      isPending,
    };
  },
};
</script>

<style></style>
