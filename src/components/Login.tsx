import { FormEvent, useContext, useRef, useState } from "react"
import { Modal, Box, Button, Fab, TextField, Stack, IconButton } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import { UserContext } from "./HomePage"
import { Action } from "../types/action"
import CloseIcon from '@mui/icons-material/Close';


const Login = ({ Verified }: { Verified: Function }) => {

    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(true)
    const [notlogin, setNotlogin] = useState(true)
    const nameRef = useRef<HTMLInputElement>(null)
    const passswordRef = useRef<HTMLInputElement>(null)
    const userContext = useContext(UserContext)

    if (!userContext)
        throw new Error("Profile must be used within a UserContext.Provider");
    const { user, userDispatch } = userContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLogin(false)
        if (nameRef.current?.value === user.firstName && passswordRef.current?.value == user.password) {
            Verified(true)
            setNotlogin(false)
            const action: Action = {
                type: "CREATE",
                data: {}
            }
            userDispatch(action)
        }
    }

    return (<>
        {notlogin && <Button sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1300,
        }} variant="contained" size="large" color="primary" onClick={() => { setOpen(true); setLogin(true) }}>Login</Button>}
        {login && <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description" >
            <Box
                sx={{
                    width: 500,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                    margin: 'auto',
                    mt: 5
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        color: 'primary.main'
                    }}
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
                <h2 id="login-modal-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        inputRef={nameRef}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        inputRef={passswordRef}
                        required
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        endIcon={<SendIcon />}
                        sx={{ mt: 2 }}
                    >
                        Send
                    </Button>
                </form>
            </Box>
        </Modal>}
    </>)
}
export default Login