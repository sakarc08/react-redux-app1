import axios from 'axios';
import { setAlert } from './alert';
import { GET_REPOS, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES } from './types'


export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const getProfileById = (userId) => async dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    try {
        const res = await axios.get(`/api/profile/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const getGithubRepos = (username) => async dispatch => {
    // dispatch({ type: CLEAR_PROFILE})
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'content-type': "application/json"
        }
    }

    try {
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : ' Profile Created', 'success'));
        //if(!edit) {
            history.push('/dashboard');
        //}
    } catch (error) {
        console.log(error.message);
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'content-type': "application/json"
        }
    }

    try {
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(' Experience Added', 'success'));
        history.push('/dashboard');
    } catch (error) {
        console.log(error.message);
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'content-type': "application/json"
        }
    }

    try {
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(' Education Added', 'success'));
        history.push('/dashboard');
    } catch (error) {
        console.log(error.message);
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience removed', 'success'))
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education removed', 'success'))
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete ? This cannot be undone')) {
        try {
            await axios.delete('/api/profile');
            dispatch({ type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
            dispatch(setAlert('Account deleted successfully'))
        } catch (error) {
            console.log(error.message)
            dispatch({
                type: PROFILE_ERROR,
                payload: { message: error.response.statusText, status: error.response.status }
            })
        }
    }
}