'use client';
import React, { useState } from 'react';
import './table.scss';
import '/app/navbar.scss';

import {
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableToolbar,
    TableToolbarContent,
    TableBatchActions,
    TableBatchAction,
    TableToolbarSearch,
    TableToolbarMenu,
    TableToolbarAction,
    Button,
    TableSelectAll,
    TableSelectRow,
    Modal,
} from '@carbon/react';
import { TrashCan, Save, Download } from '@carbon/icons-react';
import Link from 'next/link';

const headers = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
];

const rows = [
    { id: '1', name: 'Vaishnavi', email: 'vaish@test.com' },
    { id: '2', name: 'test', email: 'test@test.com' },
    { id: '3', name: 'test1', email: 'test1@test.com' },

];

export default function Page() {
    const [open, setOpen] = useState(true);
    return (
        <>
        
           <div className='dataModal'>
           <DataTable rows={rows} headers={headers} isSortable>
                {({
                    rows,
                    headers,
                    getHeaderProps,
                    getRowProps,
                    getSelectionProps,
                    getTableProps,
                    getBatchActionProps,
                    selectedRows,
                }) => (
                    <TableContainer title="Archived Data" description="The Data to be Archived">
                        <TableToolbar>
                            <TableBatchActions {...getBatchActionProps()}>
                                <TableBatchAction renderIcon={Save} onClick={() => setOpen(true)}>
                                    Save
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch />
                                <TableToolbarMenu>
                                    <TableToolbarAction onClick={() => alert('Saved')}>Save</TableToolbarAction>
                                    <TableToolbarAction onClick={() => alert('Canceled')}>Cancel</TableToolbarAction>
                                </TableToolbarMenu>
                                <Button kind="primary">Add New</Button>
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    <TableSelectAll {...getSelectionProps()} />
                                    {headers.map((header) => {
                                        const headerProps = getHeaderProps({ header });
                                        const { key, ...rest } = headerProps;

                                        return (
                                            <TableHeader key={header.key} {...rest}>
                                                {header.header}
                                            </TableHeader>
                                        );
                                    })}

                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {rows.map((row) => {
                                    const rowProps = getRowProps({ row });

                                    return (
                                        <TableRow {...rowProps}>
                                            <TableSelectRow {...getSelectionProps({ row })} />
                                            {row.cells.map((cell) => (
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>



                        </Table>
                    </TableContainer>
                )}

            </DataTable>
           </div>
           <Modal open={open} onRequestClose={() => setOpen(false)} passiveModal modalHeading="Your data has been saved successfully!!!" >
                
                </Modal>
           

               <Link href={"/Dashboard"}><Button>Back</Button></Link>
        </>

    );
}
