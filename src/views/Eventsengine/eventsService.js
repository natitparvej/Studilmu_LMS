import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getNotificationtemplate(data) {	
	    return axios.post(url+'/getNotificationtemplate',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editNotificationtemplate(data) {
	    return axios.post(url+'/editNotificationtemplate',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addNotificationtemplate(data) {
	    return axios.post(url+'/addNotificationtemplate',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}


	function getNotificationhistory(data) {	
	    return axios.post(url+'/getNotificationhistory',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    getNotificationtemplate, editNotificationtemplate, addNotificationtemplate,
    getNotificationhistory , 
};