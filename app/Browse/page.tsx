"use client";
import React, { useState } from "react";
import TextInput from "../Components/SharedComponent/TextInput";
import Dropdown from "../Components/SharedComponent/Dropdown";
import {  TableContainer } from "@carbon/react";

import "./browse.scss";
import "../navbar.scss";
import DataTables from "../Components/SharedComponent/DataTables";

const Page = () => {
  const [empId, setEmpId] = useState("");
  const[name,setName]=useState("");
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="container">
      <div className="textInput1">
        <TextInput
          className="textInput"
          label="Emp_Id"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          placeholder="Enter your Employee_Id"
        />
      </div>

      <br />

      <TextInput label="Name: " value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your Name" />

      <Dropdown
        options={[
          { value: "", label: "Select an option" },
          { value: "show_table", label: "Show Table" },
          { value: "create_table", label: "Create Table" },
        ]}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      />

      {selectedOption === "show_table" && (
        <TableContainer title="Employee Records">
          <DataTables/>
        </TableContainer>
      )}
    </div>
  );
};

export default Page;
