import axios from "axios";

export async function addUser(payload) {
  let response = await axios
    .post(
      "https://formvalidation-fc8be-default-rtdb.firebaseio.com/First_Real.json",
      payload
    )
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
}
