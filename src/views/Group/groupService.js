import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getOwners(data) {
	    return axios.post(url+'/getOwners',{usertype : "C"}).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getGroups(data) {
		console.log(data);
	    return axios.post(url+'/getGroups', {usertype : "S"}).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addGroup(data) {
		console.log(data);
	    return axios.post(url+'/addGroup', data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editGroup(data) {
		console.log(data);
	    return axios.post(url+'/editGroup', data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getStudents(data) {
		console.log(data);
	    return axios.post(url+'/getGroupstudent', {usertype : "S"}).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getCourses(data) {
	    return axios.post(url+'/getCourses',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function studentAddgroup(data) {
		console.log(data);
	    return axios.post(url+'/studentAddgroup',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function courseAddgroup(data) {
	    return axios.post(url+'/courseAddgroup',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getFiles(data) {
	    return axios.post(url+'/getFiles',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}


export default {
    getOwners, getGroups, addGroup, editGroup, studentAddgroup, courseAddgroup, getFiles,
    getStudents, getCourses
};