import React from 'react';
import config from './config'

const UserContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export class UserProvider extends React.Component {

  state = {
    notes: [],
    folders: [],
  }
 
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })

  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }
  
  deleteNote = noteId => {
    console.log('delete note from context')
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
    
  }


  render() {
    const values = {
      notes: this.state.notes,
      folders: this.state.folders,
      handleAddFolder: this.handleAddFolder,
      deleteNote: this.deleteNote,
    }
    return (
      <UserContext.Provider value={values}>
        {this.props.children}
      </UserContext.Provider>
    )
  }

}


export default UserContext
