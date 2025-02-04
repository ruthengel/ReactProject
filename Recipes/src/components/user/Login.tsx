import { FormEvent, useContext, useRef, useState } from "react";
import { Modal, Box, Button, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { UserContext } from "../HomePage";
import { Action } from "../../types/action";

const Login = ({ Verified }: { Verified: Function }) => {
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(true);
    const [notlogin, setNotlogin] = useState(true);
    const [typebutton, setTypebutton] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const passswordRef = useRef<HTMLInputElement>(null);
    const userContext = useContext(UserContext);
    if (!userContext) throw new Error("Profile must be used within a UserContext.Provider");
    const { userDispatch } = userContext;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let res;
        const action: Action = { type: "CREATE", data: { firstName: nameRef.current?.value, password: passswordRef.current?.value } };
        setLogin(false);
        if (typebutton) {
            try {
                res = await axios.post("http://localhost:3000/api/user/register", action.data);
                action.data.id = res.data.userId;
            } catch (e) {
                if (axios.isAxiosError(e) && e.response?.status === 400) alert(`${e.response.data.message}`);
            }
        } else {
            try {
                res = await axios.post("http://localhost:3000/api/user/login", action.data);
                action.data.id = res.data.user.id;
            } catch (e) {
                if (axios.isAxiosError(e) && e.response?.status === 401) alert(`${e.response.data.message}`);
            }
        }
        if (res) {
            setNotlogin(false);
            Verified(true);
            userDispatch(action);
        }
    };

    return (
        <>
            {notlogin && (
                <Button sx={{ position: "absolute", top: 15, right: 1305, zIndex: 1350, color: "white", border: "2px solid white", backgroundColor: "transparent", "&:hover": { border: "2px solid black", backgroundColor: "rgba(0, 0, 0, 0.1)" } }} variant="contained" size="large" onClick={() => { setOpen(true); setLogin(true); setTypebutton(true); }}>LogUp</Button>
            )}
            {notlogin && (
                <Button sx={{ position: "absolute", top: 15, right: 1420, zIndex: 1350, color: "white", border: "2px solid white", backgroundColor: "transparent", "&:hover": { border: "2px solid black", backgroundColor: "rgba(0, 0, 0, 0.1)" } }} variant="contained" size="large" onClick={() => { setOpen(true); setLogin(true); }}>LogIn</Button>
            )}
            {login && (
                <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
                    <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24, margin: "auto", mt: 5 }}>
                        <IconButton sx={{ position: "absolute", color: "black" }} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                        <h2 id="login-modal-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Hi! Let's Get Started</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth label="Name" variant="outlined" margin="normal" inputRef={nameRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                            <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" inputRef={passswordRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                            <Button fullWidth variant="contained" color="primary" size="large" type="submit" endIcon={<SendIcon />} sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "black" }, mt: 2 }}>Send</Button>
                        </form>
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default Login;
