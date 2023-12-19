import axios from "axios";

//axios.defaults.baseURL = 'https://recipe-share-pp5-ea6d44d9d1e0.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;
