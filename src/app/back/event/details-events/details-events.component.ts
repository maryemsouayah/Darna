import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { EventModel } from '../../models/event';
import { Comment } from '../../models/comment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { textSpanIsEmpty } from 'typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../service/comments.service';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.css'],
})
export class DetailsEventsComponent implements OnInit {
  idEvent;
  modalRef: BsModalRef;
  currentEvent: EventModel;
  selectedValue: String;
  currentYear;
  updateFormComment: FormGroup;
  parValid = [];
  comments: string;
  comm;
  count: number;
  years = [];
  tableComment = [];
  participants = [];
  childForm: FormGroup;
  submitted: Boolean = false;
  currentComm: Comment;
  currentDate = new Date();
  user;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private EventService: EventService, private modalService: BsModalService,

    private SpinnerService: NgxSpinnerService,
    private CommentService: CommentsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.count = 0;
    this.participants = [];
    this.parValid = [];
    this.currentYear = new Date().getFullYear();
    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.idEvent = this.route.snapshot.paramMap.get('idEvent');
    console.log('this.user : ', this.user );
    this.getEventById(this.idEvent);
    this.getCommentById(this.idEvent);
    (this.childForm = this.formBuilder.group({
      text: [null, [Validators.required]],
    })),
      (this.updateFormComment = this.formBuilder.group({
        text: [null, Validators.required],
      }));
  }
  get updateCommentControls() {
    return this.updateCommentControls.controls;
  }
  getEventById(id) {
    this.SpinnerService.show();
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;
      res.participants.forEach((p) => {
        if (p.etat !== 'refusé') {
          this.participants.push({ emailP: p.emailP, fullName: p.fullName, etat: p.etat });
        }
      });
      res.participants.forEach((p) => {
        if (p.etat === 'valide') {
          this.parValid.push({ emailP: p.emailP, fullName: p.fullName, etat: p.etat });
        }
      });
      console.log('part test21', this.participants);
      this.SpinnerService.hide();
    });
  }
  validParticipant(id, emailP) {
    this.EventService.validP(id, emailP).subscribe((res: EventModel) => { });
    Swal.fire('Participant a été validé avec succés!', '', 'success');
    this.ngOnInit();
  }
  refuserParticipant(id, emailP) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, refuser-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.EventService.noValidP(id, emailP).subscribe((res: any) => {

        });
        Swal.fire(
          'Refusé',
          'Ce participant a été refusé avec succés',
          'success'
        );
        this.ngOnInit();
      }

    });
  }
  AddComment(id) {
    let data = {
      user: this.user.fullName,
      text: this.childForm.value.text,
      date: this.currentDate,
      photo: this.user.photo
    };
    this.CommentService.addNewComment(id, data).subscribe((res) => {
      console.log("result", res)
    })
    this.getCommentById(id);
    this.childForm.reset();
    window.location.reload();
  }
  getCommentById(id) {
    this.CommentService.getCommentById(id).subscribe((res: Comment) => {
      this.currentComm = res;
      this.count = Object.keys(this.currentComm).length
      console.log('this.currentComm: ', this.currentComm);
      this.currentComm.date = this.currentDate;

    });
  }

  deleteComment(_id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récupérer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.CommentService.deleteComment(_id).subscribe((res: any) => {
          this.ngOnInit();
        });
        Swal.fire(
          'Supprimé',
          'Ce commentaire a été supprimé avec succés',
          'success'
        );
      }
    });
  }

  updateComment() {
    this.CommentService.updateComment(
      this.currentEvent._id,
      this.updateFormComment.value
    ).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Cet événement a été modifié avec succés', '', 'success');
        this.getCommentById(this.currentEvent._id);
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}

