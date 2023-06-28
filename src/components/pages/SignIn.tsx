// SignIn.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignInForm from "../forms/SignInForm";
import { authActions } from "../../redux/slices/authSlice";
import { Alert, Snackbar } from "@mui/material";
import AuthServiceJwt from "../../service/AuthServiceJwt";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  
  const authService = new AuthServiceJwt("http://localhost:3500");

  const handleSignIn = async (email: string, password: string) => {
    try {
        const user = await authService.loginAndGetUsername({ email, password });
        if (!user) {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        setOpen(true);
    }
};

  return (
    <>
      <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          "Invalid email or password"
        </Alert>
      </Snackbar>
      <SignInForm onSubmit={handleSignIn} />
    </>
  );
};

export default SignIn;
