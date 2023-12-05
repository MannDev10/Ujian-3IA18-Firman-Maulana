import { Button, Icon, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { DeleteUsers } from './components/DeleteUsers';
import { DialogUsers } from './components/DialogUsers';
import { TableUsers } from './components/TableUsers';
import { HTTPGetUsers } from './controllers/UserContoller';

const App = () => {
  const [init, setInit] = React.useState(false)
  const [isDialog, setDialog] = React.useState(false)
  const [isDelete, setDelete] = React.useState(false)
  const [dialogType, setDialogType] = React.useState('add')
  const [InitData, setInitData] = React.useState<any>([])
  const [UsersData, setUsersData] = React.useState<any>([])
  const [isLoading, setLoading] = React.useState(true)
  const [SelectedItem, setSelectedItem] = React.useState({})
  const [Search, setSearch] = React.useState('')

  const GetUsers = async () => {
    setLoading(true)
    try {
      const result = await HTTPGetUsers()
      setInitData(result.data)
      setUsersData(result.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Terjadi Kesalahan')
    }
  }

  const onSearch = (value: string) => {
    setSearch(value)
    const result = InitData.filter((item: any) => (
      item.name.toLowerCase().includes(value.toString().toLowerCase())
    ));
    setUsersData(result)
  }

  React.useEffect(() => {
    async function Initial() {
      await GetUsers()
    }
    Initial().then().catch()
  }, [init])

  return (
    <div style={{ width: '100%', backgroundColor: '#000', minHeight: '100vh' }}>
      <Stack direction={'column'} gap={5} padding={4} alignItems={"flex-start"}>
        <Stack direction={"row"} alignItems={"center"} gap={3}>
          <Typography variant="h4" fontWeight={'700'} color="#fff">Daftar Pengguna</Typography>
          <TextField
            placeholder="Cari Pengguna...."
            size="small"
            value={Search}
            onChange={(text) => onSearch(text.target.value)}
            sx={{ backgroundColor: "#717171", width: '20vw', borderRadius: 5, color: '#fff' }}
            InputProps={{
              startAdornment: <Icon fontSize={"medium"} sx={{ color: '#fff', marginRight: 1 }}>search</Icon>,
              sx: { borderRadius: 5, color: '#fff' }
            }}
          />
        </Stack>
        <Button
          variant={'contained'}
          color={'secondary'}
          startIcon={<Icon sx={{ color: '#fff' }} fontSize={'small'}>add</Icon>}
          onClick={() => {
            setDialogType('add')
            setDialog(true)
          }}
        >
          Tambah Pengguna
        </Button>
        <TableUsers
          onUpdate={() => {
            setDialogType('edit')
            setDialog(true)
          }}
          onDelete={() => setDelete(true)}
          item={(item: any) => setSelectedItem(item)}
          data={UsersData}
          isLoading={isLoading}
        />
      </Stack>

      {/* ============================== POPUP ========================= */}

      <DialogUsers
        isOpen={isDialog}
        onClose={() => setDialog(false)}
        type={dialogType}
        getData={(value: any, type: string) => {
          if (type === 'add') {
            setInitData([value, ...UsersData])
            setUsersData([value, ...UsersData])
          } else {
            const result = UsersData.map((item: any) =>
              item.id === value.id ? value : item
            );
            setInitData(result)
            setUsersData(result)
          }
        }}
        item={SelectedItem}
      />
      <DeleteUsers
        isOpen={isDelete}
        onClose={() => setDelete(false)}
        getData={(value: any) => {
          const result = UsersData.filter((item: any) => item.id !== value.id)
          setInitData(result)
          setUsersData(result)
        }}
        item={SelectedItem}
      />
    </div>
  );
}

export default App;
