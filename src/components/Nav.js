import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const Nav = ({libraryIsOpen, setLibraryIsOpen}) => {
    return(
        <nav>
            <h1>MuseApp</h1>
            <button onClick={() => setLibraryIsOpen(!libraryIsOpen)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}

export default Nav;