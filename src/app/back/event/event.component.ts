import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../../front/services/image.service';
import { EventModel } from '../models/event';
import Swal from 'sweetalert2';
import { EventService } from '../service/event.service';
import  socketIO from 'socket.io-client';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  showModal(showModal: any) {
    throw new Error('Method not implemented.');
  }
  modalRef: BsModalRef;
  events: EventModel[];
  minDate = null;
  maxDate = null;
  minDateIn = null;
  maxDateIn = null;
  BeginDate = null;
  EndDate = null;
  photo;
  imageSrc: string = 'assets/images/eventDefault.jpg';

  addFormEvent: FormGroup;
  updateFormEvent: FormGroup;
  filesToUpload: Array<File>;
  submitted = false;
  currentEvent: EventModel;
  user;
  pm;
  years = [];
  currentYear;
  etat = false;
  alreadyParti = false;
  userConnect: string;
  currentDate = '';
  tabPubEvent;
  today = new Date();
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;
  private socket: any;
  public data: any;
  eventValue = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private EventService: EventService,
    private modalService: BsModalService,
    private imageServices: ImageService,
    private SpinnerService: NgxSpinnerService
  ) {   this.socket = socketIO('http://127.0.0.1:8080');
    }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // console.log(' this.user : ',  this.user );
    this.userConnect = sessionStorage.getItem('UserConnect');
    this.currentYear = new Date().getFullYear();
    this.tabPubEvent = [];
    this.getYears();
    this.getLisEventsByYear();
    (this.addFormEvent = this.formBuilder.group({
      nameEvent: [null, Validators.required],
      description: [null, [Validators.required]],
      numberMember: [null, [Validators.required]],
      lieu: [null, [Validators.required]],
      dateBeginEvent: [null, Validators.required],
      dateEndEvent: [null, Validators.required],
      dateBeginRegister: [null, [Validators.required]],
      dateEndRegister: [null, [Validators.required]],
    })),
      (this.updateFormEvent = this.formBuilder.group({
        nameEvent: [null, Validators.required],
        description: [null, [Validators.required]],
        numberMember: [null, [Validators.required]],
        lieu: [null, [Validators.required]],
        dateBeginEvent: [null, Validators.required],
        dateEndEvent: [null, Validators.required],
        dateBeginRegister: [null, [Validators.required]],
        dateEndRegister: [null, [Validators.required]],
      }));
    this.addFormEvent.get('dateBeginEvent').valueChanges.subscribe((valueChanges) => {
        this.minDate = valueChanges;
      });
    this.addFormEvent.get('dateEndEvent').valueChanges.subscribe((valueChanges) => {
        this.maxDate = valueChanges;
      });
    this.addFormEvent.get('dateBeginRegister').valueChanges.subscribe((valueChanges) => {
        this.minDateIn = valueChanges;
      });
    this.addFormEvent.get('dateEndRegister').valueChanges.subscribe((valueChanges) => {
        this.maxDateIn = valueChanges;
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.filesToUpload = event.target.files;
      this.photo = event.target.files[0].photo;
    }
/*
    this.socket.on('publishEvent', data => {
      this.data = data;
      console.log(this.data)
    }); */
  }
  getYears() {
    for (let y = 2014; y <= this.currentYear; y++) {
      this.years.push(y);
    }
  }
  getLisEventsByYear() {
    ///this.SpinnerService.show();
    this.EventService.getEventByYear(this.currentYear).subscribe((res: any) => {
      console.log(res);
      this.events = res;
      console.log('this.events: ', this.events);
      res.forEach((e) => {
        if (e.publish === true) {
          this.tabPubEvent.push(e);
        }
      });
      console.log('this publisheed events: ', this.events);

      //this.SpinnerService.hide();
    });
  }
  get AddEventControls() {
    return this.addFormEvent.controls;
  }
  get updateEventControls() {
    return this.updateFormEvent.controls;
  }
  resetForm() {
    this.addFormEvent.reset();
    this.modalRef.hide();
  }
  addEvent() {
    this.submitted = true;
    // stop here if form is invalid
     if (this.addFormEvent.invalid) {
      return;
    }
    let data = {};
    if (this.filesToUpload === undefined) {
      data = {
        nameEvent: this.addFormEvent.value.nameEvent,
        description: this.addFormEvent.value.description,
        lieu: this.addFormEvent.value.lieu,
        dateBeginEvent: this.addFormEvent.value.dateBeginEvent,
        dateEndEvent: this.addFormEvent.value.dateEndEvent,
        numberMember: this.addFormEvent.value.numberMember,
        dateBeginRegister: this.addFormEvent.value.dateBeginRegister,
        dateEndRegister: this.addFormEvent.value.dateEndRegister,
        photo: 'eventDefault.jpg',
      };
    } else {
      data = {
        nameEvent: this.addFormEvent.value.nameEvent,
        description: this.addFormEvent.value.description,
        lieu: this.addFormEvent.value.lieu,
        dateBeginEvent: this.addFormEvent.value.dateBeginEvent,
        dateEndEvent: this.addFormEvent.value.dateEndEvent,
        numberMember: this.addFormEvent.value.numberMember,
        dateBeginRegister: this.addFormEvent.value.dateBeginRegister,
        dateEndRegister: this.addFormEvent.value.dateEndRegister,
        photo: this.filesToUpload[0].name,
      };
    }
    this.EventService.addNewEvent(data).subscribe((res) => {

      Swal.fire('Event ajouté avec succès!', '', 'success');
      if (this.filesToUpload != undefined) {
        this.imageServices
          .pushFileToStorage(this.filesToUpload[0])
          .subscribe((rest) => {
            console.log(rest);
          });
      }
      this.resetForm();
      this.getLisEventsByYear();
    });
  }
  deleteEvent(_id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récupérer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
   /*    onAfterClose: () => {
        this.getLisEventsByYear();
      } */
    }).then((result) => {
      if (result.value) {
        this.EventService.deleteEvent(_id).subscribe((res: any) => {
          this.events = res;
          this.ngOnInit();
        });
        Swal.fire(
          'Supprimé',
          'Ce événement a été supprimé avec succés',
          'success' )
    }
  })
}
  publishEvent(id) {
   console.log('id event; ')
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;

      if (this.currentEvent.publish === true) {
        Swal.fire('Déja Publié', ':)', 'error');

      }
      if (this.currentEvent.publish === false) {
        let name=this.currentEvent.nameEvent
        let lieu=this.currentEvent.lieu
        this.socket.emit('publishEvent',{id,name,lieu})
        Swal.fire({
          title: 'êtes-vous sûr pour publier cet  événement?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, Publier-le!',
          cancelButtonText: 'Annuler',
        }).then((result) => {
          if (result.value) {
            this.EventService.publishEvent(id,true).subscribe((res: EventModel) => {

             });
            Swal.fire('Publier', 'événement publié', 'success');
            this.getLisEventsByYear();
          }
        });
      }
    });
  }
  getEventById(id) {
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;
      this.currentEvent.nameEvent = res.nameEvent;
      this.currentEvent.description = res.description;
      this.currentEvent.lieu = res.lieu;
      this.currentEvent.dateBeginEvent = res.dateBeginEvent;
      this.currentEvent.dateEndEvent = res.dateEndEvent;
      this.currentEvent.numberMember = res.numberMember;
      this.currentEvent.dateBeginRegister = res.dateBeginRegister;
      this.currentEvent.dateEndRegister = res.dateEndRegister;
      console.log(this.currentEvent.publish);
      this.updateFormEvent.setValue({
        nameEvent: this.currentEvent.nameEvent,
        description: this.currentEvent.description,
        lieu: this.currentEvent.lieu,
        dateBeginEvent: this.currentEvent.dateBeginEvent.substring(0, 10),
        dateEndEvent: this.currentEvent.dateEndEvent.substring(0, 10),
        numberMember: this.currentEvent.numberMember,
        dateBeginRegister: this.currentEvent.dateBeginRegister.substring(0, 10),
        dateEndRegister: this.currentEvent.dateEndRegister.substring(0, 10),
      });
    });
  }
  participate(id) {
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      let part = '';
      this.currentEvent = res;
      let tabP = [];
      res.participants.forEach((p) => {
        tabP.push(p.emailP);
      });
      this.userConnect = sessionStorage.getItem('UserConnect');
        for (let i = 0; i <= tabP.length; i++) {
          if (tabP[i] === this.userConnect) {
            part = 'true';
            break;
          }
          else {
            part = 'false';
          }
        }
        if (part === 'false') {
          this.EventService.participate(
            id,
            this.userConnect
          ).subscribe((res) => { });
          Swal.fire(
            'participer',
            'Vous avez participé à cet évènement avec succès',
            'success'
          );
          this.getLisEventsByYear();
        }
        else if (part === 'true') {
          Swal.fire(
            'Deja participer',
            'Vous avez déja participé à cet évènement',
            'error'
          );
          this.getLisEventsByYear();
        }
    });
  }
  editEvent() {
    this.EventService.updateEvent(
      this.currentEvent._id,
      this.updateFormEvent.value
    ).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Cet événement a été modifié avec succés', '', 'success');
        this.getLisEventsByYear();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
