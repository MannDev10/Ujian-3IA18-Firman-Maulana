import React from 'react'
import { Icon, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Skeleton } from '@mui/material';
import { SkeletonLoader } from './SkeletonLoader';

interface ITable {
    onUpdate: any;
    onDelete: any;
    item: any;
    data: any[];
    isLoading: boolean;
}

export const TableUsers = (props: ITable) => {
    const onUpdate = async (value: any) => {
        props.item(value)
        props.onUpdate()
    }

    const onDelete = async (value: any) => {
        props.item(value)
        props.onDelete()
    }
    return (
        <TableContainer>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '700', whiteSpace: 'nowrap', color: '#fff', width: '10%' }} align="center">No.</TableCell>
                        <TableCell sx={{ fontWeight: '700', whiteSpace: 'nowrap', color: '#fff', width: '20%' }} align="center">Nama Lengkap</TableCell>
                        <TableCell sx={{ fontWeight: '700', whiteSpace: 'nowrap', color: '#fff', width: '15%' }} align="center">Username</TableCell>
                        <TableCell sx={{ fontWeight: '700', whiteSpace: 'nowrap', color: '#fff', width: '20%' }} align="center">Email</TableCell>
                        <TableCell sx={{ fontWeight: '700', whiteSpace: 'nowrap', color: '#fff', width: '20%' }} align="center">Telepon</TableCell>
                        <TableCell sx={{ fontWeight: '700', whiteSpace: 'nowrap', color: '#fff', width: '15%' }} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.isLoading ?
                            <SkeletonLoader />
                            :
                            <>
                                {
                                    props.data.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ color: '#fff' }} align="center">{index + 1}</TableCell>
                                            <TableCell sx={{ color: '#fff' }} align="center">{item.name}</TableCell>
                                            <TableCell sx={{ color: '#fff' }} align="center"><b>{item.username}</b></TableCell>
                                            <TableCell sx={{ color: '#fff' }} align="center">{item.email.toLowerCase()}</TableCell>
                                            <TableCell sx={{ color: '#fff' }} align="center">{item.phone}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction={'row'} gap={1} alignItems={'center'} justifyContent={'center'}>
                                                    <IconButton sx={{ backgroundColor: '#f49918' }} onClick={() => onUpdate(item)}>
                                                        <Icon fontSize={'medium'} sx={{ color: '#fff' }}>edit</Icon>
                                                    </IconButton>
                                                    <IconButton sx={{ backgroundColor: '#d90000' }} onClick={() => onDelete(item)}>
                                                        <Icon fontSize={'medium'} sx={{ color: '#fff' }}>delete</Icon>
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}