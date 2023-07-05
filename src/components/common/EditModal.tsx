import React, { useEffect, useState } from 'react';
import { 
  Box, Modal, Typography, Button, FormControl, Grid, TextField, 
  InputLabel, Select, MenuItem 
} from '@mui/material';
import Employee from "../../model/Employee";
import employeeConfig from "../../config/employees-config.json";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  employee: Employee | null;
  handleSave: (empl: Employee) => Promise<void>; // updated here
}

const EditModal: React.FC<EditModalProps> = ({ open, handleClose, employee, handleSave }) => {
  const { minSalary, maxSalary, departments } = employeeConfig;
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (employee) {
      setEditedEmployee({ ...employee });
    }
  }, [employee]);

  if (!editedEmployee) return null;

  const onSubmitFn = async (event: any) => {
    event.preventDefault();
    if(editedEmployee) {
      await handleSave(editedEmployee);
    }
  }

  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit employee with ID: {editedEmployee.id}
        </Typography>
        <form onSubmit={onSubmitFn}>
          <Grid container spacing={4} justifyContent="center" marginTop={2}>
            <Grid item xs={8} sm={5}>
              <FormControl fullWidth required>
                <InputLabel id="select-department-id">Department</InputLabel>
                <Select 
                  labelId="select-department-id" 
                  label="Department"
                  value={editedEmployee.department} 
                  onChange={e => setEditedEmployee({...editedEmployee, department: e.target.value})}
                >
                  <MenuItem value=''>None</MenuItem>
                  {departments.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField 
                type="text" 
                required 
                fullWidth 
                label="Employee name"
                helperText="Enter name" 
                onChange={e => setEditedEmployee({...editedEmployee, name: e.target.value})}
                value={editedEmployee.name} 
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField 
                label="Birthday" 
                fullWidth 
                disabled 
                value={new Date(editedEmployee.birthDate).toLocaleDateString()}
                
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField 
                label="Gender" 
                fullWidth 
                disabled 
                value={editedEmployee.gender} 
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField 
                label="Salary" 
                fullWidth 
                required 
                type="number" 
                onChange={e => setEditedEmployee({...editedEmployee, salary: Number(e.target.value)})}
                value={editedEmployee.salary || ''}
                inputProps={{
                  min: `${minSalary}`,
                  max: `${maxSalary}`
                }} 
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={handleClose}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModal;
