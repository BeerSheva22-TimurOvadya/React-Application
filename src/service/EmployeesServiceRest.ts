import { Observable } from 'rxjs';
import Employee from '../model/Employee';
import { AUTH_DATA_JWT } from './AuthServiceJwt';
import EmployeesService from './EmployeesService';

export default class EmployeesServiceRest implements EmployeesService {
    constructor(private url: string) {}

    getEmployees(): Observable<Employee[]> {
        const res = new Observable<Employee[]>((subscriber) => {
            fetch(this.url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem(AUTH_DATA_JWT),
                },
            })
                .then((response) => response.json())
                .then((data) => subscriber.next(data));
        });
        return res;
    }

    async addEmployee(empl: Employee): Promise<Employee> {
        let responseText = '';
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`,
                },
                body: JSON.stringify({ ...empl, userId: 'admin' }),
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status === 401 || status === 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {
            throw responseText ? responseText : 'Server is unavailable. Repeat later on';
        }
    }
}
