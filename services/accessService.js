import requests from '../requests'


const { getAction } = requests.common_requests

const loadAccessActions = (accessKey, scopeId) => {
    return new Promise(function(resolve, reject) {
        getAction(accessKey, scopeId)
            .then(response => {
                //localStorage.setItem(accessKey, JSON.stringify(response))
                resolve(true)
            })
            .catch(error => {
                reject('error')
            })
    })
}

const { getUser } = requests.common_requests

const loadAccessActions2 = (login) => {
    return new Promise(function(resolve, reject) {
        getUser(login)
            .then(response => {
                //localStorage.setItem(accessKey, JSON.stringify(response))
                resolve(true)
            })
            .catch(error => {
                reject('error')
            })
    })
}


const checkAccess = (accessKey, actionKey) => {
    return (
        localStorage.getItem(accessKey) &&
        localStorage.getItem(accessKey).includes(actionKey)
    )
}

export default {
    loadAccessActions,
    checkAccess,
}
