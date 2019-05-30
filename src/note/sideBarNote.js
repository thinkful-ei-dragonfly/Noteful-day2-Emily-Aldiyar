import React from 'react';

export default function SideBarNote(props) {
  const noteId = props.match.params.noteId;
  const note = props.state.notes.filter(note => note.id === noteId);
  const folderName = props.state.folders.filter(folder => folder.id === note[0].folderId);
  return (
    <div className='folder'>
      <button>Go Back</button>
      <h3>{folderName[0].name}</h3>
    </div>
  )
}