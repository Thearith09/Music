import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
        const response = await projectAuth.signInWithEmailAndPassword(email, password);

        if (!response) throw new Error("Invalid password or email!");

        isPending.value = false;
        return response;

    } catch (err) {
        isPending.value = false;
        error.value = err.message;
    }
};

const useLogin = () => {
    return { error, login, isPending };
};

export default useLogin;