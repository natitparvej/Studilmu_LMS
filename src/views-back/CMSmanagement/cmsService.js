import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getCms(data) {	
	    return axios.get(url+'/getCms').then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addCms(data) {	
	    return axios.post(url+'/addCms', data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editCms(data) {	
	    return axios.post(url+'/editCms', data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	
export default {
    getCms, addCms, editCms
     
};