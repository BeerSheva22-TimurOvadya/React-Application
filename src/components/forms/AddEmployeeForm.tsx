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

export default function FormPropsTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField id="outlined-input" label="Name of employee" type="input" />

                <TextField id="outlined-number" label="Salary of employee" type="number" />
                <TextField
                    id="outlined-input"
                    label="Bith Day of employee"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField id="outlined-input" label="Department of employee" type="input" />
                <TextField id="outlined-input" label="Role of employee" type="input" />

                <FormControl>
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
                    <Button variant="outlined" startIcon={<DeleteIcon />} type="submit">
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
