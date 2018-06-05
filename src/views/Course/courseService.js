import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://localhost:3001";


	function getAuthors(data) {
	    return axios.post(url+'/getAuthors',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addAuthors(data) {
	    return axios.post(url+'/addAuthors',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addcourse(data) {
	    return axios.post(url+'/addcourse',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addLecture(data) {
	    return axios.post(url+'/addLecture',data).then(response => {
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

	function getLectures(data) {
	    return axios.post(url+'/getLectures',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getLecturedetails(data) {
	    return axios.post(url+'/getLecturedetails',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    getAuthors,  addcourse, getCourses, addAuthors,getLectures, getLecturedetails, addLecture
};