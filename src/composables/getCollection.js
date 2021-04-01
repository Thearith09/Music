import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
    const documents = ref(null);
    const error = ref(null);

    let collectionRef = projectFirestore.collection(collection).orderBy("createdAt");

    const unsubcribe = collectionRef.onSnapshot((snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        });

        documents.value = results;
        error.value = null;
    }, (err) => {
        documents.value = null;
        error.value = err.message;
    });

    watchEffect((onInvalidate) => {
        //onInvalidate will trigger once the collection is unmounted,
        //unsubscribe will clear the snapshot of the collection
        onInvalidate(() => unsubcribe());
    });

    return { error, documents };
};

export default getCollection;