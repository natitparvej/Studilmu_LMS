
import axios from 'axios';
const url = "http://localhost:3001";


	function setUser(data) {
	    sessionStorage.setItem('lms_login_user', JSON.stringify(data));
	}

	function getUser() {
	    return JSON.parse(sessionStorage.getItem('lms_login_user'));
	}

export default {
    setUser, getUser
};