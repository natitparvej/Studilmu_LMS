import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";


	function login(data) {
	    return axios.post(url+'/login',data).then(response => {
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

	function setOtp(data) {
	    return axios.post(url+'/setOtp',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}
	function resetPassword(data) {
	    return axios.post(url+'/resetPassword',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

export default {
    login, register, setOtp, resetPassword
};