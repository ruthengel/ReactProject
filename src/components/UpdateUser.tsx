import { Box, Button, IconButton, Modal, TextField } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react"
import { UserContext } from "./HomePage"
import { Action } from "../types/action"
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close';

const UpdateUser = () => {
    const [isupdate, setIsupdate] = useState(true)
    const [open, setOpen] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const userContext = useContext(UserContext)
    if (!userContext)
        throw new Error("Profile must be used within a UserContext.Provider");
    const { user, userDispatch } = userContext
    const handleSubmit = (e: FormEvent) => {
        const action: Action = {
            type: "UPDATE",
            data: {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                password: passwordRef.current?.value,
                phone: phoneRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value
            }
        }
        setIsupdate(false)
        userDispatch(action)
    }

    return (<>
        <Button
            sx={{
                position: 'absolute',
                top: 100,
                left: 20,
                zIndex: 1300,
            }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => { setOpen(true); setIsupdate(true) }}
        >
            Update
        </Button>
        {isupdate && <Modal

            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="update-modal-title"
            aria-describedby="update-modal-description"
        >
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
                        color:'primary.main'
                    }}
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
                <h2 id="update-modal-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    Update Details
                </h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        inputRef={firstNameRef}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        inputRef={lastNameRef}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        inputRef={passwordRef}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        inputRef={emailRef}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Phone"
                        type="tel"
                        variant="outlined"
                        margin="normal"
                        inputRef={phoneRef}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        inputRef={addressRef}
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
export default UpdateUser