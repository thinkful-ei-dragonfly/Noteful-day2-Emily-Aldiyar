import React from "react";
import {Link} from 'react-router-dom';


export default function SideBarMain(props) {
  const folderList = props.state.folders.map(folder => {
    return (
      <div className='folder' key={folder.id}>
        <Link to ={`/folder/${folder.id}`} >
          <h4>{folder.name}</h4>
        </Link>
      </div>
    );
  });
  return (
    <div>
      {folderList}
      <button className="addFolder">Add Folder</button>
    </div>
  );
}
