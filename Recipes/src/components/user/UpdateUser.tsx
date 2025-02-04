import { Box, Button, IconButton, Modal, TextField } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react"
import { UserContext } from "../HomePage"
import { Action } from "../../types/action"
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"

const UpdateUser = () => {
    const [isupdate, setIsupdate] = useState(true)
    const [open, setOpen] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const userContext = useContext(UserContext)
    if (!userContext)
        throw new Error("Profile must be used within a UserContext.Provider");
    const { user, userDispatch } = userContext
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const action: Action = {
            type: "UPDATE",
            data: {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                phone: phoneRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value,
                id: user.id
            }
        }
        let res;
        try {
            res = await axios.put('http://localhost:3000/api/user/', action.data, {
                headers: { 'user-id': user.id }
            })
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404)
                    alert(`${e.response?.data.message}`)
            }
        }
        setIsupdate(false)
        if (res) {
            userDispatch(action)
        }
    }

    return (<>
        <Button sx={{ position: 'absolute', top: 80, right: 1400, zIndex: 1300, color: "white", border: "2px solid black", backgroundColor: "transparent", "&:hover": { border: "2px solid black", backgroundColor: "rgba(0, 0, 0, 0.1)" } }} variant="contained" color="primary" size="large" onClick={() => { setOpen(true); setIsupdate(true) }}>
            Update
        </Button>
        {isupdate && <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="update-modal-title" aria-describedby="update-modal-description">
            <Box sx={{ width: 500, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 24, margin: 'auto', mt: 5 }}>
                <IconButton sx={{ position: 'absolute', color: 'black' }} onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
                <h2 id="update-modal-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Update Details</h2>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="First Name" variant="outlined" margin="normal" inputRef={firstNameRef} required sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black', }, '&:hover fieldset': { borderColor: 'black', }, '&.Mui-focused fieldset': { borderColor: 'black', }, }, '& .MuiInputLabel-root': { color: 'black', }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', } }} />
                    <TextField fullWidth label="Last Name" variant="outlined" margin="normal" inputRef={lastNameRef} required sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black', }, '&:hover fieldset': { borderColor: 'black', }, '&.Mui-focused fieldset': { borderColor: 'black', }, }, '& .MuiInputLabel-root': { color: 'black', }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', } }} />
                    <TextField fullWidth label="Email" variant="outlined" margin="normal" inputRef={emailRef} required sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black', }, '&:hover fieldset': { borderColor: 'black', }, '&.Mui-focused fieldset': { borderColor: 'black', }, }, '& .MuiInputLabel-root': { color: 'black', }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', } }} />
                    <TextField fullWidth label="Phone" variant="outlined" margin="normal" inputRef={phoneRef} required sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black', }, '&:hover fieldset': { borderColor: 'black', }, '&.Mui-focused fieldset': { borderColor: 'black', }, }, '& .MuiInputLabel-root': { color: 'black', }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', } }} />
                    <TextField fullWidth label="Address" variant="outlined" margin="normal" inputRef={addressRef} required sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black', }, '&:hover fieldset': { borderColor: 'black', }, '&.Mui-focused fieldset': { borderColor: 'black', }, }, '& .MuiInputLabel-root': { color: 'black', }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', } }} />
                    <Button fullWidth variant="contained" color="primary" size="large" type="submit" endIcon={<SendIcon />} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' }, mt: 2 }}>
                        Send
                    </Button>
                </form>
            </Box>
        </Modal>}
    </>)
}

export default UpdateUser

