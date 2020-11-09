import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserI } from '../../models/user';
import { LoginService } from '../../services/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService,
     private router: Router) { }

    enctexto: string;
    encPass: string;
    textoEncriptado: string;
    user: UserI = new UserI();

 

    ngOnInit() {
    }

    login(form: NgForm) {
        if (form.invalid) { return; }

        Swal.fire({
            text: "Espere por favor...",
            icon: 'info',
            allowOutsideClick: false
        });
        Swal.showLoading();

        this.loginService.login(this.user)
            .subscribe(res => {
                console.log(res);
                Swal.close();

                if (res['success'] === 0) {
                    Swal.fire({
                        title: 'Error al autenticar',
                        text: res['message'],
                        icon: 'error',
                        allowOutsideClick: false
                    });
                }

                this.router.navigateByUrl('/article');
                }, (err) => {
                console.log(err);
                Swal.fire({
                    title: 'Error al autenticar',
                    icon: 'error',
                    allowOutsideClick: false
                });
            });
    }
}
