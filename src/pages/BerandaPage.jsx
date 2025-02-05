import React, { useState,useEffect } from "react";
import SearchNotes from "../componets/Input/SearchNotes";
import NoteItemList from "../componets/cardNote/NoteItemList";
import { getNotes } from "../utils/api";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";


function BerandaPageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyboard = searchParams.get("keyboard") || "";
  
    const changeSearchParams = (newKeyboard) => {
      setSearchParams({ keyboard: newKeyboard });
    };
  
    return (
      <BerandaPage defaultKeyboard={keyboard} onKeyboardChange={changeSearchParams} />
    );
  }
  
  function BerandaPage({ defaultKeyboard, onKeyboardChange }) {
    const [notes, setNotes] = useState([]);
    const [keyboard, setKeyboard] = useState(defaultKeyboard || "");
  
    useEffect(() => {
      async function fetchNotes() {
        try {
          const { data } = await getNotes();
          setNotes(data);
        } catch (error) {
          console.error("Gagal mendapatkan notes:", error);
        }
      }
      fetchNotes();
    }, []);
  
    const onKeyboardChangeHandler = (newKeyboard) => {
      setKeyboard(newKeyboard);
      onKeyboardChange(newKeyboard);
    };
  
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyboard.toLowerCase())
    );
  
    return (
      <>
        <SearchNotes 
          keyboard={keyboard} 
          onKeyboardChange={onKeyboardChangeHandler} 
        />
        <NoteItemList notes={filteredNotes} />
      </>
    );
  }
  
  BerandaPage.propTypes = {
    defaultKeyboard: PropTypes.string,
    onKeyboardChange: PropTypes.func.isRequired,
  };
  
  SearchNotes.propTypes = {
    keyboard: PropTypes.string.isRequired,
    onKeyboardChange: PropTypes.func.isRequired,
  };
  
  NoteItemList.propTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  export default BerandaPageWrapper;