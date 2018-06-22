import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";


	function getStudents(data) {
		console.log(data);
	    return axios.post(url+'/getStudents', {usertype : "S"}).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getInstructor(data) {
	    return axios.post(url+'/getInstructor',{usertype : "I"}).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getOwners(data) {
	    return axios.post(url+'/getOwners',{usertype : "C"}).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function filterUser(data) {
	    return axios.post(url+'/filterUser',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function filterStudent(data) {
	    return axios.post(url+'/filterStudent',data).then(response => {
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

	function updateUser(data) {
	    return axios.post(url+'/updateUser',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function deleteUser(data) {
	    return axios.post(url+'/deleteUser',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    getStudents, register, assignSchool, getOwners, assignSchoolowner, getUser , addUser, getInstructor, filterUser, updateUser, deleteUser,
    filterStudent
};