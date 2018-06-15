import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getEmailtemplte() {	
	    return axios.get(url+'/getEmailtemplte').then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addEmailtemplte(data) {	
	    return axios.post(url+'/addEmailtemplte', data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editEmailtemplte(data) {	
	    return axios.post(url+'/editEmailtemplte', data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	
export default {
    getEmailtemplte, addEmailtemplte, editEmailtemplte
     
};