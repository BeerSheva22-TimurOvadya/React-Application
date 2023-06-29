import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import { employeesService } from '../../config/service-config';
import { ChangeEvent, FormEvent } from 'react';

type EmployeeState = {
    name: string;
    salary: number;
    birthDate: Date;
    department: string;
    gender: 'male' | 'female';
};

export default function AddEmployeeForm() {
    const [employee, setEmployee] = React.useState<EmployeeState>({
        name: '',
        salary: 0,
        birthDate: new Date(),
        department: '',
        gender: 'male',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.name === 'salary' ? parseInt(event.target.value) : event.target.value;
        setEmployee({ ...employee, [event.target.name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await employeesService.addEmployee(employee);
        setEmployee({
            name: '',
            salary: 0,
            birthDate: new Date(),
            department: '',
            gender: 'male',
        });
    };
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    id="outlined-input"
                    label="Name of employee"
                    type="input"
                />

                <TextField
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    id="outlined-number"
                    label="Salary of employee"
                    type="number"                   
                />

                <TextField
                    name="birthDate"
                    value={employee.birthDate}
                    onChange={handleChange}
                    id="outlined-input"
                    label="Bith Day of employee"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    id="outlined-input"
                    label="Department of employee"
                    type="input"
                />
                

                <FormControl >
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                            setEmployee({
                                name: '',
                                salary: 0,
                                birthDate: new Date(),
                                department: '',
                                gender: 'male',
                            })
                        }
                    >
                        Clear All
                    </Button>
                    <Button variant="contained" endIcon={<SaveIcon />} type="submit">
                        Save
                    </Button>
                </Stack>
            </div>
        </Box>
    );
}
