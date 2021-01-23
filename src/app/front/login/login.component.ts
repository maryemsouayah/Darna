import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import  socketIO from 'socket.io-client';
import {timeout} from 'q';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  // role;
  // connectedUser;
  token: string;
  jwt: string;
  // status: string;
  currentYear: Number;
  renew;
  user;
  private socket: any;
  public data: any;

  // createDate;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    let isLoggedIn = this.loginService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  // this.socket = socketIO('http://127.0.0.1:9000');
  }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    this.router.navigate(['/']);
    console.log(this.loginForm.value);
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.loginForm.value).subscribe((res: any) => {
      console.log("ress",res);
      console.log(res.status);
      if (res.status == 204) {
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: 'nom utilisateur ou mot de passe incorrecte !',
        });
      } else {
        this.token = res.body.token;
        console.log(this.token);
        this.user = res.body.user;
        // console.log(this.role);
        this.loginService.saveToken(this.token, this.user);
        // this.status = res.body.user.status;
        // this.createDate = res.body.user.createDate;
        // this.renew=res.body.user.renew;

        if (this.user.status === 'banni') {
          Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'user banni',
          });
          this.router.navigate['/login'];
        }
        else {
          if (this.user.role === 'admin') {
            this.router.navigate(['/']);
          }
          else if (this.user.role === 'member' && this.user.renew == false) {
            Swal.fire({
              icon: 'error',
              title: 'oops...',
              text: 'Votre abonnement est epuisé',
              //votre adhésion doit être renouvelée, merci d'attendre que l'administrateur vous renouvelle
            });
            this.router.navigate['/login'];
          } else {
            this.router.navigate(['/']);
            // this.connectedUser = res.body.user.email;
            sessionStorage.setItem('UserConnect', this.user.email);
            console.log(this.user);



          }
        }
      }
    });
  }

}
