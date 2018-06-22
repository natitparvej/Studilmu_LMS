
import axios from 'axios';
const url = "http://localhost:3001";


	function login(data) {
	    return axios.post(url+'/login',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    login,
};