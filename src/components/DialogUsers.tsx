import React from 'react'
import { Dialog, DialogTitle, DialogContent, Slide, Stack, Typography, IconButton, Icon, TextField, Button, Divider, CircularProgress } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { toast } from 'react-toastify';
import { HTTPAddUsers, HTTPEditUsers } from '../controllers/UserContoller';

interface IDialog {
    isOpen: boolean,
    onClose: any,
    type: string,
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

export const DialogUsers = (props: IDialog) => {
    const [FirstName, setFirstName] = React.useState('')
    const [LastName, setLastName] = React.useState('')
    const [Username, setUsername] = React.useState('')
    const [Email, setEmail] = React.useState('')
    const [Phone, setPhone] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const onClose = () => {
        props.onClose()
        setFirstName('')
        setLastName('')
        setUsername('')
        setEmail('')
        setPhone('')
    }

    const onSubmit = async () => {
        setLoading(true)
        try {
            if (props.type === 'add') {
                const result = await HTTPAddUsers({
                    name: FirstName + ' ' + LastName,
                    username: Username,
                    email: Email.toLowerCase() + '@gmail.com',
                    phone: Phone
                })
                props.getData(result.data, 'add')
                onClose()
                toast.success('Berhasil menambah data Pengguna')
            } else {
                const result = await HTTPEditUsers({
                    id: props.item.id,
                    name: FirstName + ' ' + LastName,
                    username: Username,
                    email: Email.toLowerCase() + '@gmail.com',
                    phone: Phone
                })
                props.getData(result.data, 'edit')
                onClose()
                toast.success('Berhasil mengubah data Pengguna')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('Terjadi Kesalahan')
        }
    }

    React.useEffect(() => {
        function Initial() {
            if (props.isOpen === true) {
                if (props.type === 'edit') {
                    const name = props.item.name.split(/(\s+)/)
                    setFirstName(name[0])
                    setLastName(name[2])
                    setUsername(props.item.username)
                    setEmail(props.item.email)
                    setPhone(props.item.phone)
                }
            }
        }
        Initial()
    }, [props.isOpen])

    return (
        <Dialog
            open={props.isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperProps={{ sx: { width: '100%', maxWidth: '30vw' } }}
        >
            <DialogTitle>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant="h6" fontWeight={'600'}>{props.type === 'add' ? 'Tambah Pengguna' : 'Edit Pengguna'}</Typography>
                    <IconButton onClick={onClose}>
                        <Icon fontSize={'medium'} sx={{ color: '#000' }}>close</Icon>
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={"column"} gap={3}>
                    <Divider></Divider>
                    <Stack direction={'row'} gap={3} alignItems={'center'}>
                        <TextField
                            type="text"
                            label="Nama Depan"
                            size="small"
                            color='secondary'
                            sx={{ bgcolor: "white", width: '50%' }}
                            InputProps={{ sx: { borderRadius: 1 } }}
                            value={FirstName}
                            onChange={(text) => setFirstName(text.target.value)}
                        />
                        <TextField
                            type="text"
                            label="Nama Belakang"
                            size="small"
                            color='secondary'
                            sx={{ bgcolor: "white", width: '50%' }}
                            InputProps={{ sx: { borderRadius: 1 } }}
                            value={LastName}
                            onChange={(text) => setLastName(text.target.value)}
                        />
                    </Stack>
                    <TextField
                        type="text"
                        label="Username"
                        size="small"
                        color='secondary'
                        sx={{ bgcolor: "white", width: '100%' }}
                        InputProps={{ sx: { borderRadius: 1 } }}
                        value={Username}
                        onChange={(text) => setUsername(text.target.value)}
                    />
                    <TextField
                        type="email"
                        label="Email"
                        size="small"
                        color='secondary'
                        sx={{ bgcolor: "white", width: '100%' }}
                        InputProps={{
                            sx: { borderRadius: 1 },
                            endAdornment: <Typography variant="body1" color="#ababab">@gmail.com</Typography>
                        }}
                        value={Email}
                        onChange={(text) => setEmail(text.target.value)}
                    />
                    <TextField
                        label="Telepon"
                        size="small"
                        color='secondary'
                        sx={{ bgcolor: "white", width: '100%' }}
                        InputProps={{ sx: { borderRadius: 1 } }}
                        value={Phone}
                        onChange={(text) => setPhone(text.target.value)}
                    />
                    <Stack alignItems={'center'} sx={{ width: '100%' }}>
                        <Button
                            onClick={onSubmit}
                            color={"secondary"}
                            variant={'contained'}
                            disabled={isLoading}
                            sx={{ width: '30%' }}
                            startIcon={isLoading ?
                                <CircularProgress color="secondary" size={20} />
                                : <Icon fontSize={'small'}>save</Icon>}
                        >SIMPAN</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}