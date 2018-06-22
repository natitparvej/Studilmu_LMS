import axios from 'axios';
const url = "http://13.251.15.73:8080";


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