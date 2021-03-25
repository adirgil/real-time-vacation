const axios = require('axios')

export default {
    get: options => {
        return axios.get(`http://localhost:4000/${options.entity}`)
            .then((response) => {
                // handle success
                //console.log(response);
                return response.data.result.deals
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    },
    create: options => {
        return axios.post(`http://localhost:4000/${options.entity}`, options.deal)
            .then(response => {
                console.log('post', response);
                return response
            })
            .catch(error => {
                console.log(error);
            });
    },
    remove: options => {
        return axios.delete(`http://localhost:4000/${options.entity}/${options.id}`)
            .then(response => {
                console.log('delete', response);
                return response
            })
            .catch(error => {
                console.log(error);
            });
    },
    update: options => {
        return axios.put(`http://localhost:4000/${options.entity}/${options.id}`, options.deal)
            .then(response => {
                console.log('put', response);
                return response
            })
            .catch(error => {
                console.log(error);
            });
    },
    getDealById: options=>{
        return axios.get(`http://localhost:4000/${options.entity}/${options.id}`)
            .then((response) => {
                // handle success
                console.log('hhiii' , response);
                return response.data.result[0]
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }
}