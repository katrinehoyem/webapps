import { type FormEvent, useState } from "react";
import type { ContactProps } from "./Types";
import React from "react";

export default function Contact(props: Readonly<ContactProps>) {
  const { email } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert("Mail:" + " " + email);
  };


  const [nameValid, setNameValid] = useState(false);
  const [nameIsDirty, setNameIsDirty] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);

  const [textareaValid, setTextAreaValid] = useState(false);
  const [textareaIsDirty, setTextAreaIsDirty] = useState(false);
  const [textareaIsTouched, setTextAreaIsTouched] = useState(false);

  const [name, setName] = useState("");
  const [textarea, setTextarea] = useState("");

  const [input, setInput] = useState<
    { id: string; name: string; textarea: string }[]
  >([]);

  const updateFormName = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setNameIsDirty(true);
    setName(input.value);
  };

  const updateFormTextArea = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setTextAreaIsDirty(true);
    setTextarea(input.value);
  };

  const validateNameInput = (name: string) => {
    if (nameIsTouched && nameIsDirty) {
      setNameValid(name.trim().length > 2);
    }
  };

  const validateTextAreaInput = (textarea: string) => {
    if (textareaIsTouched && textareaIsDirty) {
      setTextAreaValid(textarea.trim().length > 2);
    }
  };

  const contactStudent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !textarea) return;

    const form = event.target as HTMLFormElement | null;

    if (!form) return;

    console.log(name, textarea);

    setInput((prevInput) => [
      ...prevInput,
      { id: crypto.randomUUID(), name, textarea },
    ]);

    setName("");
    setTextarea("");
    setNameIsDirty(false);
    setNameIsTouched(false);
    setNameValid(false);
    setTextAreaIsDirty(false);
    setTextAreaIsTouched(false);
    setTextAreaValid(false);
  };

  return (
    <section id="Contact">
      <p>Contact infomation: {email}</p>
      <button id="Contactinfo" onClick={handleClick}>
        Show my Contact infomation 
      </button>
      <pre>{JSON.stringify({ name, textarea })}</pre>
      <form onSubmit={contactStudent}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name."
            onChange={updateFormName}
            onFocus={() => {
              console.log("onFocus");
              setNameIsTouched(true);
            }}
            onBlur={() => {
              console.log("onBlur");
              validateNameInput(name);
            }}
            value={name}
          />
          {!nameValid && nameIsDirty ? (
            <p className="warning">NB! Name must be over 3 characters long</p>
          ) : null}
        </label>
        <label htmlFor="textarea">
          Text:
          <input
            type="text"
            id="textarea"
            name="textarea"
            placeholder="Your text "
            onChange={updateFormTextArea}
            onFocus={() => {
              console.log("onFocus");
              setTextAreaIsTouched(true);
            }}
            onBlur={() => {
              console.log("onBlur");
              validateTextAreaInput(textarea);
            }}
            value={textarea}
          />
          {!textareaValid && textareaIsDirty ? (
            <p className="warning">NB! Input must be over 3 characters long</p>
          ) : null}
        </label>
        <button id="contactsubmit" type="submit">
          Send contactform
        </button>
      </form>
    </section>
  );
}