import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EventComponent } from './event.component';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../service/event.service'
import { EventModel } from '../models/event';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageService } from '../../front/services/image.service';
//import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchEventPipe } from '../../back/pipes/search-event.pipe';
import 'jest-preset-angular';

describe('EventComponent test', () => {
  let eventComponent: EventComponent;
  let routerMock: any;
  let formBuilderMock: FormBuilder;
  let imageServices: ImageService;
  let NgxSpinnerService: any;
  let modalService: any;
  let EventServiceMock: any;
  let fixture: ComponentFixture<EventComponent>;
  let event: EventModel;
  let formAdd: FormGroup;
  let events: EventModel[];
  let ngbModal: NgbModal;
  let modalRef: BsModalRef;
  event = {
    _id: "5fce883e1988c3062048aef5",
    nameEvent: "",
    description: '',
    lieu: '',
    dateBeginEvent: '',
    dateEndEvent: '',
    numberMember: '',
    dateBeginRegister: '',
    dateEndRegister: '',
    photo: '',
    participants: '',
    publish: false,
  }
  events = [{
    _id: "5fce883e1988c3062048aef5",
    nameEvent: " ddd",
    description: 'dd',
    lieu: 'dd',
    dateBeginEvent: '',
    dateEndEvent: '',
    numberMember: '',
    dateBeginRegister: '',
    dateEndRegister: '',
    photo: '',
    participants: '',
    publish: false,
  }, {
    _id: "5fe12288dcee3b512cf65ae4",
    nameEvent: "test2 event",
    description: 'test2 desc',
    lieu: 'tunis',
    dateBeginEvent: '05-01-2021',
    dateEndEvent: '05-01-2021',
    numberMember: '50',
    dateBeginRegister: '05-01-2021',
    dateEndRegister: '05-01-2021',
    photo: '',
    participants: '',
    publish: false,
  }, {
    _id: "5fce88951988c3062048aef6",
    nameEvent: " ddd",
    description: 'dd',
    lieu: 'dd',
    dateBeginEvent: '',
    dateEndEvent: '',
    numberMember: '',
    dateBeginRegister: '',
    dateEndRegister: '',
    photo: '',
    participants: '',
    publish: false,
  }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserModule, NgxPaginationModule,
        NgxSpinnerModule, HttpClientTestingModule, FormsModule,
        ModalModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'event', component: EventComponent, pathMatch: 'full' }
        ])],
      declarations: [EventComponent, SearchEventPipe],
      providers: [EventService]
    });
    fixture = TestBed.createComponent(EventComponent);
    eventComponent = fixture.componentInstance;
    EventServiceMock = TestBed.get(EventService); // Here get the service
    fixture.detectChanges();
    ngbModal = TestBed.get(NgbModal);
  }));
  beforeEach(() => {
    EventServiceMock = {
      getAllEvents: jest.fn(),
      addNewEvent: jest.fn(),
      deleteEvent: jest.fn(),
      getEvent: jest.fn(),
      getEventByYear: jest.fn(),
      updateEvent: jest.fn(),
      participate: jest.fn(),
      publishEvent: jest.fn(),
      validP: jest.fn(),
      noValidP: jest.fn(),
    };
    window.scrollTo = jest.fn()
    formBuilderMock = new FormBuilder();
    routerMock = jest.fn();
    eventComponent = new EventComponent(routerMock, formBuilderMock, EventServiceMock, modalService, imageServices, NgxSpinnerService);
  });
  describe('Test: ngOnInit() ', () => {
    it('should call getLisEventsByYear function ', () => {
      const getLisEventsByYear = jest.spyOn(eventComponent, "getLisEventsByYear");
      const expected = jest.spyOn(EventServiceMock,'getEventByYear').mockReturnValue(true);
      expect(EventServiceMock.getEventByYear('07-01-2021')).toBeTruthy();
      expect(expected).toHaveBeenCalled();
      eventComponent.ngOnInit();
      expect(getLisEventsByYear).toHaveBeenCalled();
    })
  });
  describe('Test: event ', () => {
    it('session storage', () => {
      const mock = () => {
        let storage = {};
        return {
          getItem: key => (key in storage ? storage[key] : null),
          setItem: (key, value) => (storage[key] = value || ''),
          removeItem: key => delete storage[key],
          clear: () => (storage = {})
        };
      };
      Object.defineProperty(window, 'sessionStorage', { value: mock() });
    })
    it('should create component event', () => {
      expect(eventComponent).toBeTruthy();
    });
    it('"mocks entire module"', () => {
      EventServiceMock.deleteEvent = jest.fn();
      EventServiceMock.addNewEvent = jest.fn();
      EventServiceMock.getEventByYear = jest.fn();
      EventServiceMock.getAllEvents = jest.fn();

      expect(EventServiceMock.deleteEvent.mock).toBeTruthy();
      expect(EventServiceMock.addNewEvent.mock).toBeTruthy();
      expect(EventServiceMock.getEventByYear.mock).toBeTruthy();
      expect(EventServiceMock.getAllEvents.mock).toBeTruthy();
    });
    it("returns correct result", () => {      
    const expected = jest.spyOn(EventServiceMock,'deleteEvent').mockReturnValue(true);
    expect(EventServiceMock.deleteEvent(events[0]._id)).toBeTruthy();
    expect(expected).toHaveBeenCalled();
    });
  });
  it('should delete item on confirmation', (done) => {
    eventComponent.deleteEvent(events[0]._id);
    // expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toEqual('êtes-vous sûr?');
    expect(Swal.getConfirmButton().textContent).toEqual('Oui, supprimez-le!');
    expect(Swal.getCancelButton().textContent).toEqual('Annuler');
    expect(Swal.getContent().textContent).toEqual('Vous ne pourrez plus récupérer cela!');
    Swal.clickConfirm();
    const expected = jest.spyOn(EventServiceMock,'deleteEvent').mockReturnValue(true);
    expect(EventServiceMock.deleteEvent(events[0]._id)).toBeTruthy();
    expect(expected).toHaveBeenCalled();
    setTimeout(() => {   
      done();
    });
  });
  it('Form valid add event', () => {
  /*   spyOn(Swal, "fire").and.callFake(args => { args.onAfterClose(); });
    eventComponent.getLisEventsByYear((); */
  });
  it('should add item on confirmation', (done) => {
    let data = {
      nameEvent: "test add",
      description: "description test add",
      lieu: "tunis",
      dateBeginEvent: "20-21-2020",
      dateEndEvent: "",
      numberMember: "",
      dateBeginRegister: "",
      dateEndRegister: "",
    };
    eventComponent.addEvent();
    const exp = jest.spyOn(EventServiceMock, 'addNewEvent');
    expect(EventServiceMock.addNewEvent(data)).toBe(true);
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toEqual('Event ajouté avec succès!');
    Swal.clickConfirm();
    setTimeout(() => {
      done();
    });
  });
  describe('test ', () => {
    it('test', () => {
 
    })
  })

});