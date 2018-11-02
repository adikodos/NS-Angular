import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class UserService {
    register(user: User) {
        return new Promise<Object>((resolve, reject) => {
            
        });
    }

    login(user: User) {
        return new Promise<Object>((resolve, reject) => {

        });
    }

    resetPassword(email) {
        return new Promise<Object>((resolve, reject) => {

        });
    }

    handleErrors() {

    }
}
