export default class Api{

    function DoAxiosCall(callback){
            axios.get(`/https://exampleService.com/${e.target.value}`)
                .then(function (response) {
                    callback(response.data['name']);
                })
                .catch(function (error) {
                    if (error.response) {
                        if (error.response.status === 404) {
                            callback(`\u2014`)
                        }
                    }
                })
    }
}