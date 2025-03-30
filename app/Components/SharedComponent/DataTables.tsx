
import { DataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react'
import React from 'react'

function DataTables() {
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
      
    

  return (
    <div>
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
    </div>
  )
}

export default DataTables
