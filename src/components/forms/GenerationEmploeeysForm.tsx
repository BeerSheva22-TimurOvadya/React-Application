import React, { useRef, useState } from "react";
import {  Grid, TextField, Box,  Button,  Snackbar, Alert } from '@mui/material';
import Employee from "../../model/Employee";
import InputResult from "../../model/InputResult";
import { StatusType } from "../../model/StatusType";

type Props = {
    submitFn: (empl: Employee) => Promise<InputResult>,

}
const initialDate: any = 0;
const initialGender: any = '';
const minEmployees: number = 1;
const maxEmployees: number = 50;
const initialEmployee: Employee = {
    id: 0, birthDate: initialDate, name: '',department: '', salary: 0,
     gender: initialGender
};
export const GenerationEmploeeysForm: React.FC<Props> = ({ submitFn }) => {
    
       
    const [employee, setEmployee] =
        useState<Employee>(initialEmployee);
        const [errorMessage, setErrorMessage] = useState('');
        const [alertMessage, setAlertMessage] = useState('')
        const severity = useRef<StatusType>('success')
    
    function handlerSalary(event: any) {
        const salary: number = +event.target.value;
        const emplCopy = { ...employee };
        emplCopy.salary = salary;
        setEmployee(emplCopy);
    }
   
    async function onSubmitFn(event: any) {
        event.preventDefault();
        if(!employee.gender) {
            setErrorMessage("Please select gender")
        } else {
             const res =  await submitFn(employee);
             severity.current = res.status;
             res.status === "success" && event.target.reset();
             setAlertMessage(res.message!);
        }
       
        
    }
    function onResetFn(event: any) {
        setEmployee(initialEmployee);
    }

    return <Box sx={{ marginTop: { sm: "25vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">              
                <Grid item xs={8} sm={4} md={5} >
                    <TextField label="number of employees" fullWidth required
                        type="number" onChange={handlerSalary}
                        value={employee.salary || ''}
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