import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useDocument = (collection, id) => {
    const error = ref(null);
    const isPending = ref(false);
    const documentRef = projectFirestore.collection(collection).doc(id);

    const deleteDoc = async () => {
        isPending.value = true;
        error.value = null;

        try {   
            const res = await documentRef.delete();
            isPending.value = false;
            return res;
    
        } catch (err) {
            error.value = err.message;
            isPending.value = false;
        }
    };

    const updateDoc = async (updates) => {
        isPending.value = true;
        error.value = null;

        try {
            const res = await documentRef.update(updates);
            isPending.value = false;
            return res;

        } catch (err) {
            error.value = err.message;
            isPending.value = false;
        }
    };

    return { error, isPending, deleteDoc, updateDoc }
};

export default useDocument;
