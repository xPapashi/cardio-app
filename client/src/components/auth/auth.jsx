import axios from "axios";

axios.defaults.withCredentials = true;

// check if user is logged in and redirect to dashboard
function checkLoggedIn(setIsLoggedIn, navigate) {
  axios
  .get("/profile")
    .then(({ data}) => {
      if (data) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setIsLoggedIn(false);
      }
    })
  }

  function fetchUserProfile(setIsLoggedIn, location, navigate) {
    axios
      .get("/profile")
      .then(({ data }) => {
      if (!data) {
        setIsLoggedIn(false);
        navigate(location);
      } else {
        setIsLoggedIn(true);
      }
    });
}

export { checkLoggedIn, fetchUserProfile };
