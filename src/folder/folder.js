import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
// import config from '../config';

export default class Folder extends React.Component{
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
 
  static contextType = UserContext



  // fetch(`${config.API_ENDPOINT}/folders`, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json'
  //   },
  //   body: JSON.stringify(folder),
  // })
  //   .then(res => {
  //     if(!res.ok)
  //       return res.json().then(e => Promise.reject(e))
  //     return res.json()
  //   })
  //   .then(folder => {
  //     this.context.addFolder(folder)
  //     this.props.history.push(`/folder/${folder.id}`)
  //   })
  //   .catch(error => {
  //     console.error({error})
  //   })
  // }
  render() {
  
    const folderId = this.props.match.params.folderId;
    console.log(folderId);
    const filteredNotes = this.props.state.notes.filter(note => note.folderId === folderId);
    const notes = filteredNotes.map(note => {
    return (
   
      <div className='note' key={note.id}>
        <Link to={`/note/${note.id}`} >
        <h3>{note.name}</h3>
        <p>{note.modified}</p>
        <button type="delete">Delete Note</button>
        </Link>
      </div>
    )
      })
   

   

    return <div>{notes}</div>
  
    }
}