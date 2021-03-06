import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";


	function editSetting(data) {
		console.log(data);
	    return axios.post(url+'/editSetting',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function getSetting(data) {
		return axios.post(url+'/getSetting',data).then(response => {
			return response.data;
		}).catch(error => {
			return error;
			console.log(error);
		});
}

function getPackage(data) {
	return axios.get(url+'/getPackage').then(response => {
		return response.data;
	}).catch(error => {
		return error;
		console.log(error);
	});
}

function addPackage(data) {
	return axios.post(url+'/addPackage',data).then(response => {
		return response.data;
	}).catch(error => {
		return error;
		console.log(error);
	});
}
function updatePackage(data) {
	return axios.post(url+'/updatePackage',data).then(response => {
		return response.data;
	}).catch(error => {
		return error;
		console.log(error);
	});
}

function deletePackage(data) {
	return axios.post(url+'/deletePackage',data).then(response => {
		return response.data;
	}).catch(error => {
		return error;
		console.log(error);
	});
}


export default {
	editSetting, getSetting, getPackage, addPackage, updatePackage, deletePackage
};