import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { ImageService } from '../services/image.service';
import { RegisterService } from '../services/register.service';
import { HttpClient } from '@angular/common/http';

describe('RegisterComponent', () => {
  let CompReg: RegisterComponent;
  let authServiceMock: any;
  let formBuilder: FormBuilder;
  let imageService:any;
  let routerMock: any;
  beforeEach(() => {

    authServiceMock = {
      postDemand: jest.fn(),
       isLoggedIn: jest.fn(),
    };

    formBuilder = new FormBuilder();
    routerMock = jest.fn();
    CompReg = new RegisterComponent(formBuilder,routerMock, authServiceMock, imageService)
    authServiceMock.isLoggedIn = false
    CompReg.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('initialisation  du form Inscription', () => {
      const RegForm = {
        fullName: null,
        email: null,
        phone: null,
        birthDate: null,
        job: null,
        password: null,
        confirmPassword: null,
      };
      expect(CompReg.InscriptionForm.value).toEqual(RegForm);
    });
  });
  describe('Test: Registre Form', () => {
    it('should invalidate the form', () => {
      CompReg.InscriptionForm.controls.email.setValue('');
      CompReg.InscriptionForm.controls.password.setValue('');
      CompReg.InscriptionForm.controls.birthDate.setValue('');
      CompReg.InscriptionForm.controls.phone.setValue('');
      CompReg.InscriptionForm.controls.job.setValue('');
      CompReg.InscriptionForm.controls.confirmPassword.setValue('');
      CompReg.InscriptionForm.controls.fullName.setValue('');
      expect(CompReg.InscriptionForm.valid).toBeFalsy();
    });

    it('Form valid', () => {
      CompReg.InscriptionForm.controls.email.setValue('eslem@gmail.com');
      CompReg.InscriptionForm.controls.password.setValue('12345678');
      CompReg.InscriptionForm.controls.birthDate.setValue('22-20-1995');
      CompReg.InscriptionForm.controls.phone.setValue('55124145');
      CompReg.InscriptionForm.controls.job.setValue('etudiante');
      CompReg.InscriptionForm.controls.confirmPassword.setValue('12345678');
      CompReg.InscriptionForm.controls.fullName.setValue('islem khemiri');
      expect(CompReg.InscriptionForm.valid).toBeTruthy();
    });
  });
  describe('Test: Form valid', () => {
    it('should call register', () => {
      const formData = {
        fullName: 'emna',
        email: 'emna@gmail.com',
        phone: '52147854',
        birthDate: '30-9-1996',
        job: 'prof',
        password: '123456789',
        confirmPassword: '123456789',
      };
      const expected = jest
        .spyOn(authServiceMock, 'postDemand')
        .mockReturnValue(true);

      expect(authServiceMock.postDemand(formData)).toBe(true);
      expect(expected).toHaveBeenCalledWith(formData);
    });
  });
  describe('Test: champs', () => {
    it('mot de passe confirme incorrect', () => {
      const formData = {
        fullName: 'emna',
        email: 'emna@gmail.com',
        phone: '52147854',
        birthDate: '30-9-1996',
        job: 'prof',
        password: '123456789',
        confirmPassword: '1111',
      };
      expect(CompReg.InscriptionForm.valid).toBeFalsy();
    });
  });
  describe('Test: champs', () => {
    it('mot de passe lenght inferieur a 6 caractere ', () => {
      const formData = {
        fullName: 'emna',
        email: 'emna@gmail.com',
        phone: '52147854',
        birthDate: '30-9-1996',
        job: 'prof',
        password: '1111',
        confirmPassword: '1111',
      };
      expect(CompReg.InscriptionForm.valid).toBeFalsy();
    });
  });
  describe('Test: champs', () => {
    it('num tel invalid  ', () => {
      const formData = {
        fullName: 'emna',
        email: 'emna@gmail.com',
        phone: 'test',
        birthDate: '30-9-1996',
        job: 'prof',
        password: '123456',
        confirmPassword: '123456',
      };
      expect(CompReg.InscriptionForm.valid).toBeFalsy();
    });
  });
  describe('Test: champs', () => {
    it('email invalid  ', () => {
      const formData = {
        fullName: 'maryem',
        email: 'maryem',
        phone: '145214748',
        birthDate: '30-9-1996',
        job: 'prof',
        password: '123456',
        confirmPassword: '123456',
      };
      expect(CompReg.InscriptionForm.valid).toBeFalsy();
    });
  });
});
