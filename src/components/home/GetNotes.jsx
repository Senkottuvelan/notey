import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "../../pages/firebase";
import Notes from "./Notes_backup";
import NotesLoader from "./NotesLoader";

export default function GetNotes() {
  const Loader = NotesLoader(Notes);
  const [state, setState] = useState({
    isLoaded: false,
    notes: null,
  });
  const notes = [];
  useEffect(() => {
    var card_id=0;
    var db = firebase.firestore();
    db.collection("notes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          card_id=card_id+1;
          const docData = {
            card_id:card_id,
            id: doc.id,
            created: doc.data().created,
            note: doc.data().note,
          };
          notes.push(docData);
        });
        setState({ isLoaded: true, notes: notes });
      });
  }, [setState]);
  return (
    <div className="container mt-5">
      <Loader isLoaded={state.isLoaded} notes={state.notes} />
    </div>
  );
}
