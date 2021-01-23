import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn,
  NgModel,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/register.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  InscriptionForm: FormGroup;
  submitted = false;
  photo;
  filesToUpload: Array<File>;
  imageSrc: string = "assets/images/ct.png";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private imageService: ImageService
  ) {
     let isLoggedIn= this.registerService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/listeDemandes']);
    }
  }

  ngOnInit(): void {
    this.InscriptionForm = this.formBuilder.group(
      {
        fullName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phone: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[0-9]\d*$/),
            Validators.minLength(8),
          ],
        ],
        birthDate: [null, Validators.required],
        job: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.InscriptionForm.controls;
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      this.filesToUpload = event.target.files;
      this.photo = event.target.files[0].photo;
    }
  }
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.InscriptionForm.invalid) {
      return;
    }

    //  const data = {
    //     photo: this.filesToUpload[0].name,
    //   };
    let data = {}
    if (this.filesToUpload === undefined) {
      data = {
        fullName: this.InscriptionForm.value.fullName,
        email: this.InscriptionForm.value.email,
        phone: this.InscriptionForm.value.phone,
        birthDate: this.InscriptionForm.value.birthDate,
        job: this.InscriptionForm.value.job,
        password: this.InscriptionForm.value.password,
        confirmPassword: this.InscriptionForm.value.confirmPassword,
        photo: "anynoyme.png",
      };
    } else {
      data = {
        fullName: this.InscriptionForm.value.fullName,
        email: this.InscriptionForm.value.email,
        phone: this.InscriptionForm.value.phone,
        birthDate: this.InscriptionForm.value.birthDate,
        job: this.InscriptionForm.value.job,
        password: this.InscriptionForm.value.password,
        confirmPassword: this.InscriptionForm.value.confirmPassword,
        photo: this.filesToUpload[0].name,
      };
    }
    this.registerService.postDemand(data).subscribe((res) => {
      console.log(res);
      if (res['code'] == 505) {
        this.router.navigate(['/register']);
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: 'Cet Email existe déja !',
        });
      } else {
        this.router.navigate(['/login']);
        Swal.fire('Votre demande a été envoyée avec succés!', '', 'success');

        if (this.filesToUpload != undefined) {
          this.imageService
            .pushFileToStorage(this.filesToUpload[0])
            .subscribe((rest) => {
              // console.log(rest);
            });
        }
      }

    });

  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
