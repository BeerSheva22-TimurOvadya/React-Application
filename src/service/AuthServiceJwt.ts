import UserData from "../model/UserData";
import AuthService from "./AuthService";
import { store } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";

export default class AuthServiceJwt implements AuthService {
    constructor(private url: string){}

    async login(loginData: { email: string; password: string; }): Promise<UserData | null> {
        try {
            const response = await fetch(this.url + "/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });   
            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            const payloadJson = atob(data.accessToken.split('.')[1]);
            const userData: UserData = JSON.parse(payloadJson);
            return userData;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async logout(): Promise<void> {
        store.dispatch(authActions.reset());
    }
}
