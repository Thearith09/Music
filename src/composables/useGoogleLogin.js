import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const googleLogin = (provider) => {
    error.value = null;

    try {
        await projectAuth.signInWithPopup(provider);

    } catch (err) {
        error.value = err.message;
    }
};

const useGoogleLogin = () => {
    return { error, googleLogin };
};

export default useGoogleLogin;