import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getEvent(data) {	
	    return axios.post(url+'/getEvent',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addEvent(data) {
	    return axios.post(url+'/addEvent',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editEvent(data) {
	    return axios.post(url+'/editEvent',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	
export default {
    getEvent, addEvent, editEvent
     
};