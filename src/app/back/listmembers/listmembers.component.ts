import { Component, OnInit, ɵConsole } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ListMemberService } from '../service/list-Member.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { Member } from '../models/member'
import { ImageService } from '../../front/services/image.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-listmembers',
  templateUrl: './listmembers.component.html',
  styleUrls: ['./listmembers.component.css'],
})
export class ListmembersComponent implements OnInit {
  members: Member[];
  closeResult: string;
  addForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  currentMember: Member;
  public listMembers: any;
  modalRef: BsModalRef;
  filesToUpload: Array<File>;
  photo;
  pm;
  createDate;
  memberValue;
  cr;
  CY:Boolean;
  // archiver: Boolean;
  currentYear;
  imageSrc: string = "assets/images/ct.png";
  years = [];
  currentYearr;
  tabyear= [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private listMemberService: ListMemberService,
    private modalService: BsModalService,
    private imageService: ImageService,
    private SpinnerService: NgxSpinnerService
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {

    this.currentYear = (new Date()).getFullYear();
    this.currentYearr = (new Date()).getFullYear();
    this.getYears();
    this.getMembersByYear();
    (this.addForm = this.formBuilder.group({
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
    })),
      (this.updateForm = this.formBuilder.group({
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
        // Adresse:[this.currentMember.Adresse,Validators.required],
      }));
  }

  getYears() {
    for (let y = 2014; y <= this.currentYear; y++) {
      this.years.push(y)
/* if (this.years['y']=this.currentYear){
      console.log(this.years['y'])
      this.CY=true}
      else {this.CY=false
            } */
    }

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
  getMembersByYear() {
    // this.SpinnerService.show();
    this.listMemberService.getMembers(this.currentYear).subscribe((res: Member[]) => {
      console.log(res)
      // this.members = res.filter((t) => t.role === 'member' &&t.Create_date.toString() !== this.currentYear.toString());
     this.members = res.filter((t) => t.role === 'member');
     /* res.forEach((e) => {

          this.tabyear.push(e.createDate);
          console.log(this.tabyear);

      });
      for (let i = 0; i <= this.tabyear.length; i++) {
        if (this.tabyear[i] === this.currentYearr) {
          this.cr = 'true';

        }
        else {
          this.cr = 'false';
        }}
 */

   /*    res.forEach(element => console.log(element.createDate)
       tabele=element.createDate
      );
      let tabele=element.createDate*/
  /*     for (let i = 0; i <= this.tabyear.length; i++) {
        if (this.tabyear[i] === this.currentYear) {
          this.cr = 'true';
          break;
        }
        else {
          this.cr = 'false';
        }} */
      /*    if (this.members['Create_date']!== this.currentYear){
           this.renouv =false;
           console.log(this.renouv)
         }*/
      //  this.archiv=true;
      // this.SpinnerService.hide();

    });


  }

  get addFormControls() {
    return this.addForm.controls;
  }
  get updateFormControls() {
    return this.updateForm.controls;
  }
  deleteMember(_id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.listMemberService.deleteMember(_id).subscribe((res: any) => {
          this.members = res;
          this.ngOnInit();
        });
        Swal.fire(
          'Supprimé',
          'Ce Membre a été supprimé avec succés',
          'success'
        );
      }
    });
  }


  addNewMember() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    //  const data = {
    //     photo: this.filesToUpload[0].name,
    //   };
    let data = {}
    if (this.filesToUpload === undefined) {
      data = {
        fullName: this.addForm.value.fullName,
        email: this.addForm.value.email,
        phone: this.addForm.value.phone,
        birthDate: this.addForm.value.birthDate,
        job: this.addForm.value.job,
        password: this.addForm.value.password,
        confirmPassword: this.addForm.value.confirmPassword,
        photo: "anynoyme.png",
      };
    } else {
      data = {
        fullName: this.addForm.value.fullName,
        email: this.addForm.value.email,
        phone: this.addForm.value.phone,
        birthDate: this.addForm.value.birthDate,
        job: this.addForm.value.job,
        password: this.addForm.value.password,
        confirmPassword: this.addForm.value.confirmPassword,
        photo: this.filesToUpload[0].name,
      };
    }

    this.listMemberService.addMember(data).subscribe((res) => {
      if (res['code'] == 505) {
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: 'Cet email existe déja !',
        });
      } else {
        Swal.fire('Membre ajouté avec succès!', '', 'success');
        if (this.filesToUpload != undefined) {
          this.imageService
            .pushFileToStorage(this.filesToUpload[0])
            .subscribe((rest) => {
              console.log(rest);

            });
        }
        this.getMembersByYear();
        this.addForm.reset();
        this.modalRef.hide();
      }

    });
  }
  getMemberById(id) {
    this.listMemberService.getMember(id).subscribe((res: Member) => {
      this.currentMember = res;
      this.currentMember.birthDate = res.birthDate.substring(0, 10);
      console.log(this.currentMember);
      console.log(this.currentMember.birthDate);
      this.updateForm.setValue({
        fullName: this.currentMember.fullName,
        email: this.currentMember.email,
        phone: this.currentMember.phone,
        birthDate: this.currentMember.birthDate,
        job: this.currentMember.job,
      });
    });
  }

  editMember() {
    this.listMemberService
      .updateMember(this.currentMember._id, this.updateForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          Swal.fire('Ce Member a été modifié avec succés', '', 'success');
          this.getMembersByYear();
          this.modalRef.hide();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  renewMember(id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Revouveler !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.listMemberService.renewMember(id, this.createDate).subscribe((res) => {
          Swal.fire('Renouvelé', 'Ce membre a été renouvelé avec succés', 'success');
          this.getMembersByYear();
        });

      }
    });
  }
  resetFormAddMember(){
    this.addForm.reset();
    this.modalRef.hide();
  }

}
