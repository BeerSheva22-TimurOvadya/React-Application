import { Box, Snackbar, Alert } from '@mui/material';
import { useState, useEffect, useRef, useCallback } from 'react';
import Employee from '../../model/Employee';
import { authService, employeesService } from '../../config/service-config';

import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import { StatusType } from '../../model/StatusType';
import { useSelectorAuth } from '../../redux/store';
import DeleteIcon from '@mui/icons-material/Delete';
import Confirm from '../common/Confirm';
import EditModal from '../common/EditModal';
import EditIcon from '@mui/icons-material/Edit';

const Employees: React.FC = () => {
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState('');
    const severity = useRef<StatusType>('error');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const currentUser = useSelectorAuth();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

    const handleEditClick = (id: GridRowId) => {
        const employee = employees.find((e) => e.id === id);
        if (employee) {
            setEmployeeToEdit(employee);
            setEditOpen(true);
        }
    };

    const handleSaveFunction = async (empl: Employee) => {
        try {
            empl.birthDate = new Date(empl.birthDate);
            const updatedEmployee: Employee = await employeesService.updateEmployee(empl);
            setEmployees(employees.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e)));
            setEditOpen(false);
        } catch (error: any) {
            if (typeof error == 'string' && error.includes('Authentication')) {
                authService.logout();
                dispatch(authActions.reset());
            } else {
                setAlertMessage(error);
            }
        }
    };
    const handleDeleteConfirm = async () => {
        if (employeeToDelete !== null) {
            try {
                await employeesService.deleteEmployee(employeeToDelete.id);
                setEmployees(employees.filter((e) => e.id !== employeeToDelete.id));
            } catch (error: any) {
                if (typeof error == 'string' && error.includes('Authentication')) {
                    authService.logout();
                    dispatch(authActions.reset());
                } else {
                    setAlertMessage(error);
                }
            }
        }
        setConfirmOpen(false);
    };

    const handleEditClose = () => {
        setEmployeeToEdit(null);
        setEditOpen(false);
    };

    const handleDeleteClick = (id: GridRowId) => {
        const employee = employees.find((e) => e.id === id);
        if (employee) {
            setEmployeeToDelete(employee);
            setConfirmOpen(true);
        }
    };

    const handleDeleteCancel = () => {
        setEmployeeToDelete(null);
        setConfirmOpen(false);
    };

    useEffect(() => {
        const subscription = employeesService.getEmployees().subscribe({
            next(emplArray: Employee[] | string) {
                if (typeof emplArray === 'string') {
                    //FIXME
                    if (emplArray.includes('Authentication')) {
                        authService.logout();
                        dispatch(authActions.reset());
                    } else {
                        setAlertMessage(emplArray);
                    }
                } else {
                    setEmployees(emplArray.map((e) => ({ ...e, birthDate: new Date(e.birthDate) })));
                }
            },
        });
        return () => subscription.unsubscribe();
    }, []);

    const render = () => {
        let columns: GridColDef[] = [
            {
                field: 'id',
                headerName: 'ID',
                flex: 0.5,
                headerClassName: 'data-grid-header',
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'name',
                headerName: 'Name',
                flex: 0.7,
                headerClassName: 'data-grid-header',
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'birthDate',
                headerName: 'Date',
                flex: 0.8,
                type: 'date',
                headerClassName: 'data-grid-header',
                align: 'center',
                headerAlign: 'center',
                valueGetter: (params) => new Date(params.value),
            },
            {
                field: 'department',
                headerName: 'Department',
                flex: 0.8,
                headerClassName: 'data-grid-header',
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'salary',
                headerName: 'Salary',
                type: 'number',
                flex: 0.6,
                headerClassName: 'data-grid-header',
                align: 'center',
                headerAlign: 'center',
            },
            {
                field: 'gender',
                headerName: 'Gender',
                flex: 0.6,
                headerClassName: 'data-grid-header',
                align: 'center',
                headerAlign: 'center',
            },
        ];
        if (currentUser?.role === 'admin') {
            columns = [
                ...columns,
                {
                    field: 'actions',
                    type: 'actions',
                    headerName: 'Tools',
                    width: 80,
                    getActions: (params) => [
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => handleDeleteClick(params.id)}
                        />,
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => handleEditClick(params.id)}
                        />,
                    ],
                },
            ];
        }

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ height: '50vh', width: '80vw' }}>
                    <DataGrid columns={columns} rows={employees} />
                    <EditModal
                        open={editOpen}
                        handleClose={handleEditClose}
                        employee={employeeToEdit}
                        handleSave={handleSaveFunction}
                    />

                    <Confirm
                        open={confirmOpen}
                        title="Confirm Delete"
                        text={`Are you sure you want to delete employee ${employeeToDelete?.name} with ID ${employeeToDelete?.id}?`}
                        onConfirm={handleDeleteConfirm}
                        onCancel={handleDeleteCancel}
                    />
                </Box>
                <Snackbar
                    open={!!alertMessage}
                    autoHideDuration={20000}
                    onClose={() => setAlertMessage('')}
                >
                    <Alert
                        onClose={() => setAlertMessage('')}
                        severity={severity.current}
                        sx={{ width: '100%' }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box>
        );
    };
    return render();
};
export default Employees;
