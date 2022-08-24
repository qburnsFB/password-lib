import {EntryLibrary} from "../EntryLibrary";
import {useState} from "react";
import "./EntryLibraryApp.css";

export const EntryLibraryApp = () => {
    const [success, setSuccess] = useState<Boolean>(false);
    const handleSubmitSuccess = () => setSuccess(true);

  return (
    <div className="EntryLibraryApp">
        <main>
        {success ? <h1>Successfully reset!</h1> :
        <><h1>Password Reset</h1><EntryLibrary handleSubmit={handleSubmitSuccess} /></>}</main>
    </div>
  )
}