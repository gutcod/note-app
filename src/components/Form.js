import React, { useContext, useState } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show("The Note was created", "success");
        })
        .catch(() => {
          alert.show("Something is wrong", "danger");
        });
      setValue("");
    } else {
      alert.show("Put something");
    }
  };

  return (
    <form>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Note"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <button
          onClick={submitHandler}
          type="button"
          className="btn btn-block btn-outline-success"
        >
          ADD NOTE
        </button>
      </div>
    </form>
  );
};
