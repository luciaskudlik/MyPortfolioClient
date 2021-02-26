import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/api",
      withCredentials: true,
    });
  }

  getAllUsers = () => {
    const pr = this.api
      .get("/users")
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return pr;
  };

  getCurrentUser = () => {
    const pr = this.api
      .get("/user", { withCredentials: true })
      .then((response) => response.data)
      .catch((err) => console.log(err));
    return pr;
  };

  //   create = (data) => {
  //     const pr = this.api.post(`/example/${id}`, data);

  //     return pr;
  //   };

  //   deleteOne = (id) => {
  //     const pr = this.api.delete(`/example/${id}`);

  //     return pr;
  //   };
}

// Create instance (object) containing all axios calls as methods
const userService = new UserService();

export default userService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
