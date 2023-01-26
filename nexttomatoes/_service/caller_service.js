import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3010",
});
// const AxiosFilter = axios.create({
//     baseURL: 'http://localhost:3000'
// })

// export default {Axios, AxiosFilter}
export default Axios;
