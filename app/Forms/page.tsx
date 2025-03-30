'use client';  // <-- Ensuring the component is a client-side component

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../actions/formActions';
import { useNavigate } from 'react-router-dom';
import { Column, Dropdown, Row, TextInput, Button } from '@carbon/react';

const Page = () => {  // <-- Change the component name to a capitalized "Page"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formData = useSelector((state: { form: { dropdown1: string; dropdown2: string; textInput1: string; textInput2: string; textInputButton: string; } }) => state.form);
  
  const [dropdown1, setDropdown1] = useState(formData.dropdown1);
  const [dropdown2, setDropdown2] = useState(formData.dropdown2);
  const [textInput1, setTextInput1] = useState(formData.textInput1);
  const [textInput2, setTextInput2] = useState(formData.textInput2);
  const [textInputButton, setTextInputButton] = useState(formData.textInputButton);
  
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on submit
    const formValues = {
      dropdown1,
      dropdown2,
      textInput1,
      textInput2,
      textInputButton,
    };
    dispatch(submitForm(formValues));
    navigate('/dashboard');  // Redirect to Dashboard
  };

  // Toggle read-only state when the 4th tile is clicked
  const handleTileClick = () => {
    setIsReadOnly((prevState) => !prevState);  // Toggle the read-only state
  };

  return (
    <div>
      <div onClick={handleTileClick}>
        {/* This tile is clickable to toggle read-only mode */}
        <div className="tile">Tile 4</div>
      </div>

      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Dropdown
              id="dropdown1"
              label="Dropdown 1"
              titleText="Dropdown 1 Title"
              items={['Option 1', 'Option 2', 'Option 3']}
              selectedItem={dropdown1}
              onChange={({ selectedItem }) => setDropdown1(selectedItem ?? '')}
              disabled={isReadOnly}
            />
          </Column>
          <Column>
            <Dropdown
              id="dropdown2"
              label="Dropdown 2"
              titleText="Dropdown 2 Title"
              items={['Option A', 'Option B', 'Option C']}
              selectedItem={dropdown2}
              onChange={({ selectedItem }) => setDropdown2(selectedItem ?? '')}
              disabled={isReadOnly}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInput
              id="textInput1"
              labelText="Text Input 1"
              value={textInput1}
              onChange={(e) => setTextInput1(e.target.value)}
              disabled={isReadOnly}
            />
          </Column>
          <Column>
            <TextInput
              id="textInput2"
              labelText="Text Input 2"
              value={textInput2}
              onChange={(e) => setTextInput2(e.target.value)}
              disabled={isReadOnly}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInput
              id="textInputButton"
              labelText="Text Input with Button"
              value={textInputButton}
              onChange={(e) => setTextInputButton(e.target.value)}
              disabled={isReadOnly}
            />
            <Button onClick={() => console.log(textInputButton)} disabled={isReadOnly}>
              Button
            </Button>
          </Column>
        </Row>
        {/* Render submit button only if the form is not in read-only mode */}
        {!isReadOnly && (
          <Button type="submit">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default Page;
