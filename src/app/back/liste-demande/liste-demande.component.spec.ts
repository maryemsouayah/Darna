import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ListeDemandeComponent } from './liste-demande.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Demand } from '../models/demand';
import { ListeDemandeService } from '../service/liste-demande.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

describe('ListeDemandeComponent', () => {
  let componentDemandes: ListeDemandeComponent;
  let fixture: ComponentFixture<ListeDemandeComponent>;
  let NgxSpinnerService: any
  let listeDemandeServiceMock: any;
  let routerMock: any;
  let demand: Demand;
  let demands: Demand[];
  let debugElement;
  let h1: HTMLElement;



  //  password: "$2b$10$P6ZJiL5uGOTwUp25BSwL..ZbzuZsuT1NhbOWL41zsVVYGJ.KjzYdq", 

  demand = {
    _id: "5fe9e990c0aa7122180c3c21",
    fullName: "Chrigui Intissar",
    email: "chrigui@gmail.com",
    phone: 333333333,
    birthDate: "2020-12-12",
    job: "ingénieur",
    // password: "123456",
    photo: "intissar.jpg",
    // __v: 0
  }
  demands = [{
    _id: "5fe9e990c0aa7122180c3c21",
    fullName: "Chrigui Intissar",
    email: "chrigui@gmail.com",
    phone: 333333333,
    birthDate: "2020-12-12",
    job: "ingénieur",
    // password: "123456",
    photo: "intissar.jpg",
    // __v: 0
  },]
  const http = { get: jest.fn(() => of(demands)) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDemandeComponent],
      imports: [BrowserModule, NgxPaginationModule, NgxSpinnerModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'listeDemandes', component: ListeDemandeComponent, pathMatch: 'full' }
        ]),
      ],
      providers: [
         ListeDemandeService
      ],
    });
    fixture = TestBed.createComponent(ListeDemandeComponent);
    componentDemandes = fixture.componentInstance;
    listeDemandeServiceMock = TestBed.get(ListeDemandeService); // Here get the service
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });
  beforeEach(() => {
    listeDemandeServiceMock = {
      getListDemand: jest.fn(),
      deleteDemand: jest.fn(),
      acceptDemand: jest.fn()
    };

    routerMock = jest.fn();

    componentDemandes = new ListeDemandeComponent(
      routerMock,
      listeDemandeServiceMock,
      NgxSpinnerService,
    );
    // listeDemandeServiceMock.getListDemand();
    //  componentDemandes.ngOnInit();
  });
  describe('Test: demand ', () => {
    it('should create component demand', () => {
      expect(componentDemandes).toBeTruthy();
    });
    test('should exist', () => {
      expect(listeDemandeServiceMock).toBeDefined();
  });
    it('should display page title', () => {
      h1 = fixture.nativeElement.querySelector('h1');

      expect(h1.textContent).toContain("Liste des demandes");
    });
    it('should call demands list', () => {

      const expected = jest
        .spyOn(listeDemandeServiceMock, 'getListDemand').mockReturnValue(demands);
      expect(listeDemandeServiceMock.getListDemand()).toEqual(demands);
      expect(expected).toBeCalled();
      expect(expected).toHaveBeenCalledWith();

    });

    it('should call accept function from service', () => {

      const expected = jest
        .spyOn(listeDemandeServiceMock, 'acceptDemand')
        .mockReturnValue(true);
      expect(listeDemandeServiceMock.acceptDemand(demand)).toBeTruthy();
      expect(expected).toHaveBeenCalledWith(demand);
    });
    it('should call Delete demand function from service', () => {
      const expected = jest
        .spyOn(listeDemandeServiceMock, 'deleteDemand')
        .mockReturnValue(true);
      expect(listeDemandeServiceMock.deleteDemand(demand._id)).toBe(true);
      expect(expected).toHaveBeenCalledWith(demand._id);
      expect(expected).toBeCalledTimes(1);
      
    });
    

  });

});