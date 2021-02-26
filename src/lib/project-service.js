import axios from "axios";

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getAll = () => {
    const pr = this.api.get("/example");

    return pr;
  };

  getOne = (id) => {
    const pr = this.api.get(`/example/${id}`);

    return pr;
  };

  create = (data) => {
    const pr = this.api.post(`/example/${id}`, data);

    return pr;
  };

  deleteOne = (id) => {
    const pr = this.api.delete(`/example/${id}`);

    return pr;
  };
}

// Create instance (object) containing all axios calls as methods
const projectService = new ProjectService();

export default projectService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
