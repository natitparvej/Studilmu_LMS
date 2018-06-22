
import axios from 'axios';
const url = "http://13.251.15.73:8080";


	function setUser(data) {
	    sessionStorage.setItem('lms_login_user', JSON.stringify(data));
	}

	function getUser() {
	    return JSON.parse(sessionStorage.getItem('lms_login_user'));
	}

export default {
    setUser, getUser
};