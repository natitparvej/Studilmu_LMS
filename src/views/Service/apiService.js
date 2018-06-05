import axios from 'axios';
const url = "http://localhost:3001";


	function get(aurl) {
	    axios.post(url+'/'+aurl).then(response => {
	      console.log(response);
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function post(aurl,data) {
	    return axios.post(url+'/'+aurl,data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    get, post
};