import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import * as React from 'react';

export const SkeletonLoader = () => {
    return (
        <>
            {
                [...Array(10)].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell colSpan={6}>
                            <Skeleton
                                variant="rounded"
                                width={'100%'}
                                height={60}
                                sx={{ backgroundColor: '#717171' }}
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}