import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const facebookLogin = async (provider) => {
    error.value = null;

    try {
        const result = await projectAuth.signInWithPopup(provider);
        const credentail = result.credentail;
        const user = result.user;
        const accessToken = credentail.accessToken;

        return { credentail, user, accessToken };

    } catch (err) {

    }
};

const useFacebookLogin = () => {
    return { error, facebookLogin };
};

export default useFacebookLogin;