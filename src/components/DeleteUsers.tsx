import React from 'react'
import { Dialog, DialogContent, Slide, Stack, Typography, Button, Divider, CircularProgress } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { toast } from 'react-toastify';
import { HTTPDeleteUsers } from '../controllers/UserContoller';

interface IDialog {
    isOpen: boolean,
    onClose: any,
    getData: any,
    item: any
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteUsers = (props: IDialog) => {
    const [isLoading, setLoading] = React.useState(false)
    const DeleteUsers = async () => {
        setLoading(true)
        try {
            await HTTPDeleteUsers({ id: props.item.id })
            props.getData(props.item)
            toast.success('Berhasil manghapus data Pengguna')
            setLoading(false)
            props.onClose()
        } catch (error) {
            setLoading(false)
            toast.error('Terjadi Kesalahan')
        }
    }

    return (
        <Dialog
            open={props.isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onClose}
        >
            <DialogContent>
                <Stack direction={"column"} alignItems={'center'} gap={2}>
                    <Typography variant="h6" fontWeight={'600'}>Perhatian!</Typography>
                    <Typography variant="body2">Anda yakin untuk menghapus data ini?</Typography>
                    <Divider sx={{ width: '100%' }}></Divider>
                    <Stack direction={'row'} gap={3} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            color={"secondary"}
                            variant={'contained'}
                            onClick={DeleteUsers}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                    <CircularProgress color="secondary" size={20} />
                                    : 'HAPUS'
                            }
                        </Button>
                        <Button
                            color={"error"}
                            variant={'text'}
                            onClick={props.onClose}
                        >Tidak</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}