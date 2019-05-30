import React from 'react';
import UserContext from '../UserContext';
import config from '../config';


export default class Note extends React.Component {
  static contextType = UserContext;
  handleDeleteNote = noteId => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(() => {
        console.log('test')
        this.props.history.push('/')
        this.context.deleteNote(noteId)
        
      })
      .catch(error => {
        console.error({error})
      })
  }
  
  render() { 
    const noteId = this.props.match.params.noteId;
    const filteredNotes = this.props.state.notes.filter(note => note.id === noteId);
    const note = filteredNotes.map(note => {
      return (<div className='note' key={note.id}>
        <h3>{note.name}</h3>
        <p>{note.modified}</p>
        <button
          onClick={() => {
            this.handleDeleteNote(noteId)
          }}
          type="button">Delete Note</button>
        <p>{note.content}</p>
      </div>)
    })
    return <div>{note}</div>
  }
}