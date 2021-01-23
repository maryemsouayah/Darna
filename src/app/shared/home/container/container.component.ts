import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import  socketIO from 'socket.io-client';
import {timeout} from 'q';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../../../front/services/image.service';
import { homeModel } from '../../models/home';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { HomeService  } from '../../service/home.service';
import { goalModel } from '../../models/goal';
import {GoalService } from '../../service/goal.service';
import { LoginService } from '../../../front/services/login.service';
import { sponsorModel } from '../../models/sponsors';
import { SponsorsService } from '../../service/sponsors.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  private socket: any;
  public data: any;
  modalRef: BsModalRef;
  home : homeModel[];
  goal : goalModel[];
  sponsor : sponsorModel[];
  user;
  currentGoal : goalModel ;
  currentHome: homeModel;
  currentSponsor : sponsorModel ;
  addForm: FormGroup;
  addGoalForm: FormGroup;
  addSponsorForm: FormGroup;
  updateForm: FormGroup;
  updateGoalForm : FormGroup ;
  updateSponsorForm : FormGroup ;
  submitted = false;
  idHome ;
  photo;
  imageSrc: string = "../../../../assets/images/home.png";
  filesToUpload: Array<File>;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private HomeService: HomeService,
    private GoalService: GoalService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private loginService: LoginService,
    private SponsorsService : SponsorsService ,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let isLoggedIn = this.loginService.isLoggedIn();
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (isLoggedIn && this.user.role === 'admin') {
      this.router.navigate(['/']);
    } else if (isLoggedIn && this.user.role === 'member') {
      this.router.navigate(['/']);

    }
    this.idHome = this.route.snapshot.paramMap.get('id');

    this.getHome();
    this.getAllGoals();
    this.getAllSponsors();
    (this.addForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.minLength(8),
        ],
      ],
      rib: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.maxLength(20),
          Validators.minLength(20),

        ],
      ],
      photo: [
        null,
        [
          Validators.required,

        ],
      ],

    })) ,
    (this.addGoalForm = this.formBuilder.group({
      goal: [null, Validators.required],

    })) ,
    (this.updateForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.minLength(8),
        ],
      ],
      rib: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.maxLength(20),
          Validators.minLength(20),

        ],
      ],
      presentation: [null, Validators.required],

    })),
    (this.updateGoalForm = this.formBuilder.group({
      goal: [null, Validators.required],

    }))
    ,
    (this.addSponsorForm = this.formBuilder.group({
      lien: [null, Validators.required],

    })) ,

    (this.updateSponsorForm = this.formBuilder.group({
      lien: [null, Validators.required],

    }))
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


    get addFormControls() {
      return this.addForm.controls;
    }
    get addGoalFormControls() {
      return this.addGoalForm.controls;
    }
    get addSponsorFormControls() {
      return this.addSponsorForm.controls;
    }
    get updateFormControls() {
      return this.updateForm.controls;
    }
    get updateGoalFormControls() {
      return this.updateGoalForm.controls;
    }
    get updateSponsorFormControls() {
      return this.updateSponsorForm.controls;
    }


  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
  resetForm() {
      this.addForm.reset();
      this.modalRef.hide();
    }

  getHome() {
      this.HomeService.getAllHome().subscribe((res: any) => {
        this.home= res;
      });
    }

  addHomePage() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addForm.invalid) {
        return;
      }
      let data = {};
      if (this.filesToUpload === undefined) {
        data = {
          title: this.addForm.value.title,
          description: this.addForm.value.description,
          phone: this.addForm.value.phone,
          rib: this.addForm.value.rib,
          photo: "home.png",
          };
      } else {
        data = {
          title: this.addForm.value.title,
          description: this.addForm.value.description,
          phone: this.addForm.value.phone,
          rib: this.addForm.value.rib,
          photo: this.filesToUpload[0].name,
        };
      }
      this.HomeService.addHome(data).subscribe((res) => {
        Swal.fire('ajouté avec succès!', '', 'success');
        if (this.filesToUpload != undefined) {
          this.imageService
            .pushFileToStorage(this.filesToUpload[0])
            .subscribe((rest) => {
              console.log(rest);
            });
        }
        console.log(data);

    this.resetForm();
    this.getHome();
      });

}

  getHomeById(id) {
  this.HomeService.getById(id).subscribe((res: homeModel) => {
    this.currentHome= res;
    console.log(this.currentHome);
    this.updateForm.setValue({
          title: this.currentHome.title,
          description: this.currentHome.description,
          phone: this.currentHome.phone,
          rib:   this.currentHome.rib,
          presentation : this.currentHome.presentation,
          photo:   this.currentHome.photo,

    });
  });
  }


  editHomePage() {
  this.HomeService.updateHome(this.currentHome._id, this.updateForm.value)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire('modifié avec succés', '', 'success');
        this.getHome();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
}

  deleteHome(id) {
  this.HomeService.getById(id).subscribe((res: homeModel) => {
    this.currentHome = res;
    this.currentHome.title= "";
    this.currentHome.description = "";
    this.currentHome.phone = null;
    this.currentHome.rib = null;
    this.currentHome.photo = "";
    let obj = this.currentHome ;
      Swal.fire({
        title: 'êtes-vous sûr pour publier cet  événement?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Supprimer-le!',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) {
          this.HomeService.deleteSection(id,obj).subscribe((res: homeModel) => { });
          Swal.fire('supprimé', 'supprimé avec succés', 'success');
          this.getHome();
        }
      });

  });
}

   deletePresentation(id) {
  this.HomeService.getById(id).subscribe((res: homeModel) => {
    this.currentHome = res;
    this.currentHome.presentation = ""; ;
      Swal.fire({
        title: 'êtes-vous sûr pour publier cet  événement?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Supprimer-le!',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) {
          this.HomeService.deletePres(id,this.currentHome.presentation).subscribe((res: homeModel) => { });
          Swal.fire('supprimé', 'supprimé avec succés', 'success');
          this.getHome();
        }
      });

  });
}

  getAllGoals() {
  this.GoalService.getGoals().subscribe((res: any) => {
    this.goal= res;
  });
}


addGoal() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.addGoalForm.invalid) {
    return;
  }
  let data =
  { goal: this.addGoalForm.value.goal};

  this.GoalService.addNewGoal(data).subscribe((res) => {
    Swal.fire('ajouté avec succès!', '', 'success');

  this.resetForm();
  this.getAllGoals();
  });

}
getGoal(id) {
  this.GoalService.getGoalById(id).subscribe((res: goalModel) => {
    this.currentGoal = res;
    this.updateGoalForm.setValue({
      goal : this.currentGoal.goal

    });
  });
}

editGoal() {
  this.GoalService
    .updateGoal(this.currentGoal._id, this.updateGoalForm.value)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire('objectif  modifié avec succés', '', 'success');
        this.getAllGoals();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
}
deleteGoal(_id) {
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
      this.GoalService.deleteGoal(_id).subscribe((res: any) => {
        this.goal = res;
        this.ngOnInit();
      });
      Swal.fire(
        'Supprimé',
        'Objectif supprimé avec succés',
        'success'
      );
    }
  });
}


getAllSponsors() {
  this.SponsorsService.getSponsors().subscribe((res: any) => {
    this.sponsor= res;
  });
}


addSponsors() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.addSponsorForm.invalid) {
    return;
  }
  let data = {};
    data = {
      lien: this.addSponsorForm.value.lien,
      photo: this.filesToUpload[0].name,
    };

  this.SponsorsService.addNewSponsor(data).subscribe((res) => {
    Swal.fire('Sponsor ajouté avec succès!', '', 'success');
    if (this.filesToUpload != undefined) {
      this.imageService
        .pushFileToStorage(this.filesToUpload[0])
        .subscribe((rest) => {
          console.log(rest);
        });
    }
    console.log(data);
    this.addSponsorForm.reset();
    this.modalRef.hide();
    this.getAllSponsors();
  });

}

getSponsor(id) {
  this.SponsorsService.getSponsorById(id).subscribe((res: sponsorModel) => {
    this.currentSponsor= res;
    this.updateSponsorForm.setValue({
      lien : this.currentSponsor.lien ,
      photo : this.currentSponsor.photo,
    });
  });
}

editSponsor() {
  this.SponsorsService
    .updateSponsor(this.currentSponsor._id, this.updateSponsorForm.value)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Sponsor  modifié avec succés', '', 'success');
        this.getAllGoals();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
}
deleteSponsor(_id) {
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
      this.SponsorsService.deleteSponsor(_id).subscribe((res: any) => {
        this.sponsor = res;
        this.ngOnInit();
      });
      Swal.fire(
        'Supprimé',
        'Sponsor supprimé avec succés',
        'success'
      );
    }
  });
}
}
