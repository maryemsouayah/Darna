import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageService } from 'src/app/front/services/image.service';
import Swal from 'sweetalert2';
import { Member } from '../models/member';
import { ListMemberService } from '../service/list-Member.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  connectedUser;
  birthDateUser;
  modalRef: BsModalRef;
  url: any;
  updateProfileForm: FormGroup;
  updatePasswordForm: FormGroup;
  submitted = false;
  photo;
  filesToUpload: Array<File>;
  deletedUploadedPhoto = false;
  updatedUser;
  notYetUpdatedPass=false;
  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.filesToUpload = event.target.files;
      this.photo = event.target.files[0].photo;
      console.log(this.photo)
    }
  }
  public delete() {
    this.url = null;
  }
  constructor(private modalService: BsModalService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private listMemberService: ListMemberService,) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getMemberById(id) {
    this.listMemberService.getMember(id).subscribe((res: Member) => {
      this.connectedUser = res;
      this.connectedUser.birthDate = res.birthDate.substring(0, 10);
      console.log(this.connectedUser);
      console.log(this.connectedUser.birthDate);
      this.updateProfileForm.setValue({
        fullName: this.connectedUser.fullName,
        email: this.connectedUser.email,
        phone: this.connectedUser.phone,
        birthDate: this.connectedUser.birthDate,
        job: this.connectedUser.job,
      });

    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.birthDateUser = this.user.birthDate.substring(0, 10);

    (this.updateProfileForm = this.formBuilder.group({
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
    }));
    this.getMemberById(this.user._id);

    (this.updatePasswordForm=this.formBuilder.group({
      oldPassword: [null, Validators.minLength(6)],
      newPassword: [null, Validators.minLength(6)],
      confirmNewPassword: [null, Validators.minLength(6)],

    },
    {
      // validator: this.MustMatch('newPassword', 'confirmPassword'),
    }
    ))

  }
  get updatePasswordControls() {
    return this.updatePasswordForm.controls;
  }
  editProfile() {

    let data = {}
    if ( this.filesToUpload === undefined) {
      data = {
        fullName: this.updateProfileForm.value.fullName,
        email: this.updateProfileForm.value.email,
        phone: this.updateProfileForm.value.phone,
        birthDate: this.updateProfileForm.value.birthDate,
        job: this.updateProfileForm.value.job,
        password: this.user.password,
        photo: this.user.photo,
      };
    } else {
      data = {
        fullName: this.updateProfileForm.value.fullName,
        email: this.updateProfileForm.value.email,
        phone: this.updateProfileForm.value.phone,
        birthDate: this.updateProfileForm.value.birthDate,
        job: this.updateProfileForm.value.job,
        password: this.user.password,
        photo: this.filesToUpload[0].name,
      };
    }

    this.listMemberService.updateMember(this.user._id, data).subscribe((res) => {
      if (res['code'] == 505) {
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: 'Cet email existe déja !',
        });
      } else {
        Swal.fire('votre profile modifié avec succès!', '', 'success');
        this.user.createDate = this.birthDateUser;
        this.user.fullName = this.updateProfileForm.value.fullName
        this.user.email = this.updateProfileForm.value.email
        this.user.phone = this.updateProfileForm.value.phone
        this.user.job = this.updateProfileForm.value.job

        if (this.filesToUpload !=undefined) {
          this.imageService
            .pushFileToStorage(this.filesToUpload[0])
            .subscribe((rest) => {

              this.user.photo = this.filesToUpload[0].name;
              sessionStorage.setItem('user', JSON.stringify(this.user));
              this.user = JSON.parse(sessionStorage.getItem('user'));
              window.location.reload()

            });
        }




      }

    })

  }
  EditPassword(){
    if( this.notYetUpdatedPass===false){
      this.listMemberService.checkPassword(this.user._id,this.updatePasswordForm.value.oldPassword).subscribe((res: any) => {
        console.log(res);
        // console.log(res.body.code);
  
        if (res.code == 204) {
          Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'Vous entrez un mot de passe incorrecte, Merci de réessayer',
          });
        } else if(res.code == 200){
          this.notYetUpdatedPass=true
        }
      });
    }


  }
  saveNewPass(){
    this.listMemberService.saveNewPassword(this.user._id,this.updatePasswordForm.value.newPassword).subscribe((res: any) => {
     console.log(res)
      if (res.code == 200) {
        Swal.fire('mot de passe modifié', '', 'success');
        this.modalRef.hide()
        this.notYetUpdatedPass=false


      } 
    });
  }
  mustMatch(controlName: string, matchingControlName: string) {
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
