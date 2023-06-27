// SignIn.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignInForm from "../forms/SignInForm";
import { authActions } from "../../redux/slices/authSlice";
import { Alert, Snackbar } from "@mui/material";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });   

      const data = await response.json();
      const payloadJson = atob(data.accessToken.split('.')[1]);
      const userData = JSON.parse(payloadJson);
      const username = userData.email;

      dispatch(authActions.set(username));
    
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
