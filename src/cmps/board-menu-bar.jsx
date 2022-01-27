
import React, {useState} from "react";
import { useDispatch } from 'react-redux';


export const MenuBar = (props) => {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);


  return (
    <React.Fragment>
      <span onClick={() => setIsMenuBarOpen(true)} className='span-width'>Show menu</span>
    <section className="menu-bar-section">
    </section>
    </React.Fragment>
  );
};