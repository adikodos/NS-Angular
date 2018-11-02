import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { User } from "../shared/user.model";
import { UserService } from "../shared/user.service";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    isLoggingIn = true;
    user: User;
    processing = false;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(
        private page: Page,
        private userService: UserService,
        private router: Router
    ) {
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.userService.login(this.user)
            .then(() => {
                this.processing = false;
                this.router.navigate(["/home"]);
            })
            .catch((err) => {
                this.processing = false;
                this.alert("Unfortunately we could not find your account.");
            });
    }

    register() {
        if (this.user.password ! = this.user.confirmPassword) {
            this.alert("Your password do not match.");
            return;
        }

        this.userService.register(this.user)
            .then(() => {
                this.processing = false;
                this.alert("Your account was successfully created.");
                this.isLoggingIn = true;
            })
            .catch(() => {
                this.processing = false;
                this.alert("Unfortunately we were unable to create your account")
            });
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for NS NG",
            inputType: "email",
            defaultText: "",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        })
        .then((data) => {
            if (data.result) {
                this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Your password was successfuly reset. please check your email for instructions on choosing a new password");
                    })
                    .catch(() => {
                        this.alert("Unfortunately, an error occured resetting your password.");
                    })
            }
        })
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this,this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "ns-ng",
            okButtonText: "OK",
            message: message
        })
    }
}
