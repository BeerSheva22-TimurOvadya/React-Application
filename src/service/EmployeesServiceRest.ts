import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";

export default class EmployeesServiceRest implements EmployeesService {
    constructor(private url: string){}

    async addEmployee(empl: Employee): Promise<Employee> {
        const jwt = localStorage.getItem(AUTH_DATA_JWT);

        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({...empl, userId: "admin"}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }  
}
