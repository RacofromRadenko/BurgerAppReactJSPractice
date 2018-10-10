import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-app-reactjs-17b8b.firebaseio.com/'
});

export default instance;
