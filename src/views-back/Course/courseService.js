import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getCategory(data) {
			
	    return axios.post(url+'/getCategory',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addCategory(data) {		
	    return axios.post(url+'/addCategory',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editCategory(data) {
	    return axios.post(url+'/editCategory',data).then(response => {
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

function getCategory(data) {
		return axios.post(url+'/getCategory').then(response => {
			return response.data;
		}).catch(error => {
			return error;
			console.log(error);
		});
	}

	function filtercurseCategory(data) {
		console.log(data);		
		return axios.post(url+'/filtercurseCategory').then(response => {
			return response.data;
		}).catch(error => {
			return error;
			console.log(error);
		});
	}

	function filterCourse(data) {
		return axios.post(url+'/filterCourse').then(response => {
			return response.data;
		}).catch(error => {
			return error;
			console.log(error);
		});
	}

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

	function editcourse(data) {
		return axios.post(url+'/editcourse',data).then(response => {
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
    getAuthors,  addcourse, getCourses, addAuthors,getLectures, getLecturedetails, addLecture , getCategory, getOwners, addCategory, editCategory, editcourse, filtercurseCategory, filterCourse
};