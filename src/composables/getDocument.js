import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";

const getDocument = (collection, id) => {
    const error = ref(null);
    const document = ref(null);

    let documentRef = projectFirestore.collection(collection).doc(id);
    
    const unsubcribe = documentRef.onSnapshot((doc) => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id };
            error.value = null;
        } else {
            error.value = "The document doesn't exist!";
        }

    }, (err) => {
        error.value = err.message;
        document.value = null;
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubcribe());
    });

    return { error,  document };
    
};

export default getDocument;