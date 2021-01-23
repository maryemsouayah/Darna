import { FormBuilder } from '@angular/forms';
import { ListmembersComponent } from './listmembers.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

describe('ListmembersComponent', () => {
  let CompListMember: ListmembersComponent;
  let listmemberServiceMock: any;
  let formBuilder: FormBuilder;
  let routerMock: any;
  let ModalServiceMock: BsModalService;

  let listmemberservice: any;
  let NgxSpinnerService: any
  let modalref: BsModalRef;
  let imageserviceMock: any;
  let currentYear;

  beforeEach(() => {
    currentYear = (new Date()).getFullYear();
    listmemberServiceMock = {
      // getmembersbyYear: jest.fn(),
      getmembers: jest.fn()
    };
    formBuilder = new FormBuilder();
    routerMock = jest.fn();

    CompListMember = new ListmembersComponent(
      routerMock,
      formBuilder,
      listmemberServiceMock,
      ModalServiceMock,
      imageserviceMock,
      NgxSpinnerService,
    );
    CompListMember.ngOnInit();
  });
  /*   describe('Test: ngOnInit', () => {
      it('initialisation  du form add member', () => {
        const AddmemerForm = {
          NomPrenom: null,
          Email: null,
          Tel: null,
          DateNaissance: null,
          Job: null,
          Password: null
        };
        expect(CompListMember.addForm.value).toEqual(AddmemerForm);
      });
    }); */
  describe('Test: ngOnInit', () => {
    xit('fetchAll$: should return a sorted list', () => {
      let listMembers =[
        {_id:"5fabe7ab6571c21a001669d4",
        NomPrenom:"test admin",
        Email:"testadmin@gmail.com",
        Password:"$2b$10$hNMtIukUEy1bB/81OpjQvuIPq2u1ls5BU/Mm5reBzGoGuHwtBbVNm",
        Job:"student",
        Tel:25416387,
        DateNaissance:"1993-08-01T00:00:00.000Z",
        role:"admin",
        Create_date:"2020-11-11T13:31:23.802Z",
        __v:0},
        {Create_date: 2020,
        DateNaissance: "2020-10-30T00:00:00.000Z",
        Email: "email@gmail.com",
        Job: "st",
        NomPrenom: "nom prenom",
        Password: "$2b$10$.VpXHAv3YyS63RQlnk/DaezhNcmv2lE23mvT1N7zzijcfRooZx/x2",
        Tel: 8888888888,
        photo: "♥KimYumi♥.jpg",
        role: "member",
        statut: "actif",
        __v: 0,
        _id: "5fc4c906ec934202d435ee63"},{
        Create_date: 2020,
        DateNaissance: "2020-11-05T00:00:00.000Z",
        Email: "a@p",
        Job: "w",
        NomPrenom: "dddd",
        Password: "$2b$10$MBF/lXEy2OW9vrVoi0cGuu1nwL1lf9MMYLsZDlLXSTgRBfxSvZpaK",
        Tel: 22222222222222,
        photo: "intissar.jpg",
        role: "member",
        statut: "actif",
        __v: 0,
        _id: "5fc51416261a6517a44046d6"
        },{
        Create_date: 2020,
        DateNaissance: "2020-11-21T00:00:00.000Z",
        Email: "yes@yes",
        Job: "qqqqwx",
        NomPrenom: "testhello",
        Password: "$2b$10$VJakTmHqHfXPdOsy8oGMwu01e1lZ.bT8T.sVf6V4FE.eS2qzUxaXa",
        Tel: 111111111,
        photo: "anynoyme.png",
        role: "member",
        statut: "actif",
        __v: 0,
        _id: "5fc55fbdc096123bd0cbeff4"}
        ];
      const expected = jest
        .spyOn(listmemberServiceMock, 'getmembers')
        .mockReturnValue(listMembers);
      // expect(CompListMember.listMembers).toBe(listMembers);
      expect(listmemberServiceMock.getmembers(currentYear)).toEqual(listMembers);
      // expect(expected).toHaveBeenCalledWith(currentYear);
      //expect(listmemberServiceMock.getmembers.toEqual(dataArray));
      // expect(airports[2][0]).toBe('WRO');
    });

  });

});
