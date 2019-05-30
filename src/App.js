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
import UserContext from "./UserContext";

class App extends React.Component {
  static contextType = UserContext
  render() {
   
    return (
     
      <div className="App">
        <header>
          <Link to={`/`}>Noteful</Link>
        </header>
        <div className='flexBox'>
          <div className='sideBar'>
            <Route exact path='/' render={()=> <SideBarMain state={this.context} />}/>
            <Route path='/folder/:folderId' render={()=> <SideBarFolder state={this.context}/>} />
            <Route path='/note/:noteId' render={({match, history, location}) =>
              <SideBarNote
                match={match}
                history={history}
                location={location}
                state={this.context} />
            }/>
          </div>
          <main>
            <Route exact path='/' render={()=> <Main state={this.context} />} />
            <Route path='/folder/:folderId' render={({match, history, location})=> <Folder 
            match={match}
            history={history}
            location={location}
            state={this.context} />}/>
            <Route path='/note/:noteId' render={({match, history, location}) => <Note
              match={match}
              history={history}
              location={location}
              state={this.context} />}/>
          </main>
        </div>
      </div>
     
    );
  }
}


export default App;
