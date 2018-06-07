import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://localhost:3001";


	function getStudents(data) {
	    return axios.post(url+'/getStudents',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getOwners(data) {
	    return axios.post(url+'/getOwners',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getUser(data) {
	    return axios.post(url+'/getUser',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function register(data) {
	    return axios.post(url+'/register',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function assignSchool(data) {
	    return axios.post(url+'/asigneSchool',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function assignSchoolowner(data) {
	    return axios.post(url+'/asigneSchoolowner',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addUser(data) {
	    return axios.post(url+'/addUser',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    getStudents, register, assignSchool, getOwners, assignSchoolowner, getUser , addUser
};