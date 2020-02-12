import asyncAPI from '../api'

const getAction = processId => {
    return asyncAPI('getJSON', {
        url: `/get-actions`,
        params: { processId: processId },
    })
}

const getUser = user => {
    return asyncAPI('getJSON', {
        url: `/person/login`,
        params: { login: user },
    })
}

const postAction = (processId, actionType, comment) => {
    const action = {
        processId: processId,
        actionType: actionType,
        comment: comment,
    }
    return asyncAPI('postJSON', {
        url: `/process-action`,
        data: action,
    })
}

export default {
    getAction,
    getUser,
    postAction
}
