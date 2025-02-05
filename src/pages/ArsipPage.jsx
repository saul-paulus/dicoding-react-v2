import React, { useState, useEffect } from "react";
import NoteItemList from "@/componets/cardNote/NoteItemList";
import SearchNotes from "@/componets/Input/SearchNotes";
import PropTypes from "prop-types";
import { getNoteArchive } from "../utils/api";
import { useSearchParams } from "react-router-dom";

function ArsipPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyboard = searchParams.get("keyboard") || "";

  const changeSearchParams = (newKeyboard) => {
    setSearchParams({ keyboard: newKeyboard });
  };

  return (
    <ArsipPage defaultKeyboard={keyboard} keyboardChange={changeSearchParams} />
  );
}

function ArsipPage({ defaultKeyboard, keyboardChange }) {
  const [notes, setNotes] = useState([]);
  const [keyboard, setKeyboard] = useState(defaultKeyboard || "");

  useEffect(() => {
    async function fetchNoteArchive() {
      try {
        const { data } = await getNoteArchive();
        setNotes(data);
      } catch (error) {
        console.error("Gagal mendapatkan notes:", error);
      }
    }
    fetchNoteArchive();
  }, []);

  const onKeyboardChangeHandler = (newKeyboard) => {
    setKeyboard(newKeyboard);
    keyboardChange(newKeyboard);
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

ArsipPage.propTypes = {
  defaultKeyboard: PropTypes.string,
  keyboardChange: PropTypes.func.isRequired,
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

export default ArsipPageWrapper;
