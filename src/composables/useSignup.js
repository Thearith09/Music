import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    error.value = null;
    isPending.value = true;

    try {
        const response = await projectAuth.createUserWithEmailAndPassword(email, password);

        if (!response) throw new Error("Signup didn't complete!");

        await response.user.updateProfile({ displayName });
        isPending.value = false;
        return response;

    } catch (err) {
        isPending.value = false;
        error.value = err.message;
    }
};

const useSignup = () => {
    return { error, signup, isPending };
}

export default useSignup;