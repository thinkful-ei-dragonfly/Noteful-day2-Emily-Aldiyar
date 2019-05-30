import React from "react";
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./App.css";
import Main from './main/main';
import SideBarMain from './main/sideBarMain';
import Note from './note/note';
import SideBarNote from './note/sideBarNote';
import Folder from './folder/folder';
import SideBarFolder from './folder/sideBarFolder';
import config from './config';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`)
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes,foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes,folder]) => m{
        this.setState({notes,folders})
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link to={`/`}>Noteful</Link>
        </header>
        <div className='flexBox'>
          <div className='sideBar'>
            <Route exact path='/' render={()=> <SideBarMain state={this.state} />}/>
            <Route path='/folder/:folderId' render={()=> <SideBarFolder state={this.state}/>} />
            <Route path='/note/:noteId' render={({match, history, location}) =>
              <SideBarNote
                match={match}
                history={history}
                location={location}
                state={this.state} />
            }/>
          </div>
          <main>
            <Route exact path='/' render={()=> <Main state={this.state} />} />
            <Route path='/folder/:folderId' render={({match, history, location})=> <Folder 
            match={match}
            history={history}
            location={location}
            state={this.state} />}/>
            <Route path='/note/:noteId' render={({match, history, location}) => <Note
              match={match}
              history={history}
              location={location}
              state={this.state} />}/>
          </main>
        </div>
      </div>
    );
  }
}


export default App;
