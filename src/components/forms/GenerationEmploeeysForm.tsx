import React, { useRef, useState } from "react";
import { Grid, TextField, Box, Button, Snackbar, Alert } from '@mui/material';
import { StatusType } from "../../model/StatusType";

type Props = {
    submitFn: (numOfEmployees: number) => Promise<StatusType>,
}

export const GenerationEmploeeysForm: React.FC<Props> = ({ submitFn }) => {
    const minEmployees: number = 1;
    const maxEmployees: number = 50;

    const [numOfEmployees, setNumOfEmployees] = useState<number | null>(null);
    const [alertMessage, setAlertMessage] = useState('');
    const severity = useRef<StatusType>('success');
    
    async function onSubmitFn(event: any) {
        event.preventDefault();
        if(!numOfEmployees || numOfEmployees < minEmployees || numOfEmployees > maxEmployees) {
            setAlertMessage("Please enter a valid number of employees")
        } else {
            const res = await submitFn(numOfEmployees);
            severity.current = res;
            setAlertMessage(res === 'success' ? `${numOfEmployees} Employees successfully added` : "An error occurred");
            setNumOfEmployees(null); 
        }
    }
    
    function onResetFn(event: any) {
        setNumOfEmployees(null);  
    }
    
    function onNumOfEmployeesChange(event: any) {
        setNumOfEmployees(event.target.value);
    }

    return <Box sx={{ marginTop: { sm: "25vh" } }}>
        
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">              
                <Grid item xs={8} sm={4} md={5} >
                    <TextField label="number of employees" fullWidth required
                        type="number" onChange={onNumOfEmployeesChange}
                        value={numOfEmployees || ''}
                        helperText={`enter employees in range [${minEmployees}-${maxEmployees}]`}
                        inputProps={{
                            min: minEmployees,
                            max: maxEmployees
                        }} />
                </Grid>               
            </Grid>
            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit" >Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>
        </form>
        <Snackbar open={!!alertMessage} autoHideDuration={20000}
                     onClose={() => setAlertMessage('')}>
                        <Alert  onClose = {() => setAlertMessage('')} severity={severity.current} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
    </Box>
}
