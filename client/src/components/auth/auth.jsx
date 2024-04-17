import axios from "axios";
import toast from "react-hot-toast";

// check if user is logged in and redirect to dashboard
const checkLoggedIn = async (navigate) => {
  try {
    const { data } = await axios.get("/profile"); // get user data
    if (data) {
      // if user is logged in
      toast.error("You are already logged in!");
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};


function fetchUserProfile(setUser, setIsLoading) {
  axios
    .get("/profile")
    .then(({ data }) => {
      setUser(data);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
}


export { checkLoggedIn, fetchUserProfile };
