import React from "react";
import { Link } from 'react-router-dom';
import UserContext from "../UserContext";


export default function Main(props) {

  const noteList = props.state.notes.map((note) => {
    return (
      <div className='note'>
        <Link to={`/note/${note.id}`} key={note.id}>
          <h3>{note.name}</h3>
          <p>{note.modified}</p>
          <button type="delete">Delete Note</button>
        </Link>
      </div>
    );
  });
  return (
    <UserContext.Consumer>
      {function renderProp() {
        return (
    <div className='noteList'>{noteList}
      <button className='addNote'>Add Note</button>
    </div>
        )
  }}  
    </UserContext.Consumer>);
}
