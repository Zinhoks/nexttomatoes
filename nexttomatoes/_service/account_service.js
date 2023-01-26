import Axios from "./caller_service";
import AxiosFilter from"./caller_service";

let login = (credentials) => {
  return Axios.post("/users/signin", credentials);
};

let saveToken = (_id) => {
  localStorage.setItem("id", _id);
};
let getToken = () => {
  return localStorage.getItem("id");
};

let getUsername = () => {
  return localStorage.getItem("name");
}

let isAdmin = () => {
  if (typeof window !== "undefined") {
    let status = localStorage.getItem("statut");
    if (status !== "user") {
      return true;
    }
  }
};

let register = (user) => {
  return Axios.post("/users/signup", user);
};

let getGenre = (genre) => {
  return AxiosFilter.get('/api/CallFilter?genreIdCat=', genre)
 }

let logout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("name")
  localStorage.removeItem("statut");
};

let isLogged = () => {
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("id");
    return !!token;
  }
};

export const accountService = {
  register,
  login,
  saveToken,
  logout,
  isLogged,
  getToken,
  getUsername,
  isAdmin,
  getGenre
};
