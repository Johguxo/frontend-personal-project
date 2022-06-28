import { useState } from 'react'
import axios from "axios";

import {BASE_URL} from '../config';

const INITIAL_STATE = {
  user:null,
  world: null,
  lastNote: null,
  listNotes: [],
  error: null
}

export function useAppState() {
  const [state, setState] = useState(INITIAL_STATE);

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
    console.log(newBody)
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
    logOut,
    loadWorld,
    saveWorld,
    getLastNote,
    getNotes,
    newNote,
    updateNote
  }
}