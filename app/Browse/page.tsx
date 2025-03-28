"use client";
import React, { useState } from "react";
import TextInput from "../Components/SharedComponent/TextInput";
import Dropdown from "../Components/SharedComponent/Dropdown";
import Button from "../Components/SharedComponent/Button";
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@carbon/react";
import "/app/navbar.scss";
import "./browse.scss";

const Page = () => {
  const [empId, setEmpId] = useState("");
  const[name,setName]=useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Sample Data
  const headers = [
    { key: "id", header: "Employee Id" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  const rows = [
    { id: "101", name: "John Doe", email: "john@example.com" },
    { id: "102", name: "Jane Smith", email: "jane@example.com" },
    { id: "103", name: "Alice Johnson", email: "alice@example.com" },
    { id: "104", name: "Michael Brown", email: "michael@example.com" },
    { id: "105", name: "Emily Davis", email: "emily@example.com" },
    { id: "106", name: "David Wilson", email: "david@example.com" },
    { id: "107", name: "Sophia Martinez", email: "sophia@example.com" },
    { id: "108", name: "James Anderson", email: "james@example.com" },
    { id: "109", name: "Olivia Thomas", email: "olivia@example.com" },
    { id: "110", name: "Daniel White", email: "daniel@example.com" },
  ];
  

  const handleButtonClick = () => {
    alert(`Name: ${empId}, Selected: ${selectedOption}`);
  };

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
        <Button className="btn1" label="Submit" onClick={handleButtonClick} />
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
          <DataTable rows={rows} headers={headers}>
            {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })} key={header.key}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })} key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </TableContainer>
      )}
    </div>
  );
};

export default Page;
