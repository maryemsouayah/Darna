import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ListeDemandeService } from '../service/liste-demande.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Demand } from '../models/demand';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css'],
})
export class ListeDemandeComponent implements OnInit {
  demands: Demand[];
  pd;
  public listeDemands: any;
  constructor(
    private router: Router,
    private listDemandService: ListeDemandeService,
    private SpinnerService: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.getListDemands();
  }
  getListDemands() {
   // this.SpinnerService.show();
    this.listDemandService.getListDemand().subscribe((res: any) => {
      console.log(res[0]);
      this.demands = res;
     // this.SpinnerService.hide();
    });
  }
  // ngOnChanges(){
  //   this.getListDemands();
  // }
  refuseDemand(_id) {
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
        this.listDemandService.deleteDemand(_id).subscribe((res: any) => {
          this.demands = res;
          this.ngOnInit();
        });
        Swal.fire(
          'Supprimé',
          'Cette demande a été supprimée avec succés',
          'success'
        );
      }
    });
  }

  acceptDemand(demand) {
    this.listDemandService.deleteDemand(demand._id).subscribe((res: any) => {
      console.log(res);
      this.demands = res;
      this.ngOnInit();
    });
    this.listDemandService.acceptDemand(demand).subscribe((res: any) => {
      Swal.fire(
        "Demande d'adhesion a été acceptée avec succés!",
        '',
        'success'
      );
    });
  }
}
