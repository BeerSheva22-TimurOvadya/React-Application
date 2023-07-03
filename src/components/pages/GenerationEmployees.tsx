import { GenerationEmploeeysForm } from '../forms/GenerationEmploeeysForm';
import { authService, employeesService } from '../../config/service-config';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import { StatusType } from '../../model/StatusType';
import { getRandomEmployee, getRandomInt } from '../../util/random';
import employeesConfig from '../../config/employees-config.json';
import Employee from '../../model/Employee';

const GenerationEmployees: React.FC = () => {
    const dispatch = useDispatch();

    async function submitFn(employeesNumber: number): Promise<StatusType> {
        const employees = Array.from({ length: employeesNumber }, () => {
            const randomEmployee = getRandomEmployee(
                employeesConfig.minSalary,
                employeesConfig.maxSalary,
                employeesConfig.minYear,
                employeesConfig.maxYear,
                employeesConfig.departments,
            );
            const birthDate = new Date(
                randomEmployee.birthYear,
                getRandomInt(0, 12),
                getRandomInt(1, 28),
            );
            const employee: Employee = {
                id: 0,
                birthDate: birthDate,
                name: randomEmployee.name,
                department: randomEmployee.department,
                salary: randomEmployee.salary,
                gender: randomEmployee.gender,
            };
            return employee;
        });

        try {
            await Promise.all(employees.map((employee) => employeesService.addEmployee(employee)));
            return 'success';
        } catch (error: any) {
            if (typeof error == 'string' && error.includes('Authentication')) {
                authService.logout();
                dispatch(authActions.reset());
                return 'error';
            }
        }
        return 'error';
    }

    return <GenerationEmploeeysForm submitFn={submitFn} />;
};

export default GenerationEmployees;
