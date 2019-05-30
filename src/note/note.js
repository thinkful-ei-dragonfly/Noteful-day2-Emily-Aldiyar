import React from 'react';

export default function Note(props) {
  const noteId = props.match.params.noteId;
  const filteredNotes = props.state.notes.filter(note => note.id === noteId);
  const note = filteredNotes.map(note => {
    return (<div className='note' key={note.id}>
      <h3>{note.name}</h3>
      <p>{note.modified}</p>
      <button type="delete">Delete Note</button>
      <p>{note.content}</p>
    </div>)
  })
  
  return <div>{note}</div>
}