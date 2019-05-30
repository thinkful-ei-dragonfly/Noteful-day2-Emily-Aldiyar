import React from 'react';
import { Link } from 'react-router-dom';

export default function Folder(props) {
  const folderId = props.match.params.folderId;
  // console.log(folderId);
  const filteredNotes = props.state.notes.filter(note => note.folderId === folderId);
  const notes = filteredNotes.map(note => {
    return (
      <div className='note'>
        <Link to={`/note/${note.id}`} key={note.id}>
        <h3>{note.name}</h3>
        <p>{note.modified}</p>
        <button type="delete">Delete Note</button>
        </Link>
      </div>
    )
  })

  return <div>{notes}</div>
}