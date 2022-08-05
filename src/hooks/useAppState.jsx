import { useState } from 'react'
import axios from "axios";

import {BASE_URL} from '../config';

const INITIAL_STATE = {
  user: null,
  world: null,
  lastNote: null,
  listNotes: [],
  error: null
}

export function useAppState() {
  const [state, setState] = useState(INITIAL_STATE);

  const loadUser = async (data) => {
    try {
      setState({ ...state, user: {image:"sss"} });
      if (data.user) {
        setState((prevState) => ({
          ...prevState,
          user : data.user,
          error: null,
        }));
        const res = await axios.get(`${BASE_URL}/auth/local/info/${data.user._id}`)
        setState((prevState) => ({
          ...prevState,
          user : res.data.data,
          error: null,
        }));
      }
    } catch (err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const updateUser = async (payload) => {
    try {
      const {firstName,lastName,uri} = payload
      const formData = new FormData();
      if (payload.firstName) { formData.append('firstName', payload.firstName) }
      if (payload.lastName) { formData.append('lastName', payload.lastName) }
      formData.append('_id', state.user._id)
      if (payload.uri) {
        formData.append('fileData',{
          uri: payload.uri,
          name: payload.uri.split('/').pop(),
          type: `image/${payload.uri.split('.').pop()}`,
        })
      }

      const baseUrl = `${BASE_URL}/auth/local/${state.user._id}`
      const res = await axios.put(baseUrl, 
        formData, 
        { headers:{
          'Content-Type': 'multipart/form-data; boundary=some string'
        },
        });
      setState((prevState) => ({
        ...prevState,
        user : {
          ...prevState.user,
          image: res.data.data.image,
        },
        error: null,
      }));
    } catch (err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }
  
  const loadWorld = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/world`,
      { params: { userId: state.user._id },
       headers: { 'Authorization':`Bearer ${state.user.token}` },
      });
      setState((prevState) => ({
        ...prevState,
        world: res.data.data,
        error: null,
      }))
    } catch(err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const saveWorld = async (world) => {
    const {name, description} = world
    try {
      await axios.post(`${BASE_URL}/api/world`,
      { name,description },
      { headers: { 'Authorization':`Bearer ${state.user.token}` },
      });
      setState((prevState) => ({
        ...prevState,
        error: null,
      }))
    } catch(err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const getLastNote = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/note/last_note`,
      { params: { userId: state.user._id },
        headers: { 'Authorization':`Bearer ${state.user.token}` },
      });
      setState((prevState) => ({
        ...prevState,
        lastNote: res.data.data,
        error: null,
      }))
    } catch(err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const getNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/note/${state.user.id}`,
      { headers: { 'Authorization':`Bearer ${state.user.token}` },
      });
      setState((prevState) => ({
        ...prevState,
        listNotes: res.data.data,
        error: null,
      }))
    } catch(err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const newNote = async (note) => {
    const {title, description} = note
    try {
      await axios.post(`${BASE_URL}/api/note`,
      { title,description },
      { headers: { 'Authorization':`Bearer ${state.user.token}` },
      });
      setState((prevState) => ({
        ...prevState,
        lastNote: res.data.data,
        error: null,
      }))
    } catch(err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const updateNote = async (note, newBody) => {
    const {_id} = note;
    const {title, description} = newBody;
    
    try {
      await axios.patch(`${BASE_URL}/api/note/${_id}`,
      { title, description },
      { headers: { 'Authorization':`Bearer ${state.user.token}` },
      });
    } catch(err) {
      setState({
        ...state,
        error: err.response
      })
    }
  }

  const logOut = () => {
    setState(INITIAL_STATE);
  }

  return {
    state,
    loadUser,
    updateUser,
    logOut,
    loadWorld,
    saveWorld,
    getLastNote,
    getNotes,
    newNote,
    updateNote
  }
}