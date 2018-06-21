import apiService from '../Service/apiService.js';
import axios from 'axios';
const url = "http://13.251.15.73:8080";

	
	function getCoupon(data) {	
	    return axios.post(url+'/getCoupon',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function addCoupon(data) {
	    return axios.post(url+'/addCoupon',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}

	function editCoupon(data) {
	    return axios.post(url+'/editCoupon',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}
function deleteCoupon(data) {
	    return axios.post(url+'/deleteCoupon',data).then(response => {
	      return response.data;
	    }).catch(error => {
	    	return error;
	      console.log(error);
	    });
	}
	
export default {
    getCoupon, addCoupon, editCoupon,deleteCoupon
     
};