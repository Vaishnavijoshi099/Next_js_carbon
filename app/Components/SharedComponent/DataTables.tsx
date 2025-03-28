// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
// import React from 'react'

// function DataTables() {
//     type Row = {
//         id: string;
//         name: string;
//         rule: string;
//         status?: string;
//         Status?: string;
//         other: string;
//         example: string;
//     };

//     const rows: Row[] = [{
//         id: 'load-balancer-1',
//         name: 'Load Balancer 1',
//         rule: 'Round robin',
//         Status: 'Starting',
//         other: 'Test',
//         example: '22'
//       }, {
//         id: 'load-balancer-2',
//         name: 'Load Balancer 2',
//         rule: 'DNS delegation',
//         status: 'Active',
//         other: 'Test',
//         example: '22'
//       }, {
//         id: 'load-balancer-3',
//         name: 'Load Balancer 3',
//         rule: 'Round robin',
//         status: 'Disabled',
//         other: 'Test',
//         example: '22'
//       }, {
//         id: 'load-balancer-4',
//         name: 'Load Balancer 4',
//         rule: 'Round robin',
//         status: 'Disabled',
//         other: 'Test',
//         example: '22'
//       }, {
//         id: 'load-balancer-5',
//         name: 'Load Balancer 5',
//         rule: 'Round robin',
//         status: 'Disabled',
//         other: 'Test',
//         example: '22'
//       }, {
//         id: 'load-balancer-6',
//         name: 'Load Balancer 6',
//         rule: 'Round robin',
//         status: 'Disabled',
//         other: 'Test',
//         example: '22'
//       }, {
//         id: 'load-balancer-7',
//         name: 'Load Balancer 7',
//         rule: 'Round robin',
//         status: 'Disabled',
//         other: 'Test',
//         example: '22'
//       }];
//       const headers = ['Name', 'Rule', 'Status', 'Other', 'Example'];
      
//   return (
//     <div>
//       return <Table aria-label="sample table">
//               return <TableCell key={key}>{row[key as keyof Row]}</TableCell>;
//             <TableRow>
//               {headers.map(header => <TableHeader id={header.key} key={header}>
//                   {header}
//                 </TableHeader>)}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map(row => <TableRow key={row.id}>
//                 {Object.keys(row).filter(key => key !== 'id').map(key => {
//               return <TableCell key={key}>{row[key]}</TableCell>;
//             })}
//               </TableRow>)}
//           </TableBody>
//         </Table>;
//     }
//     </div>
//   )
// }

// export default DataTables
