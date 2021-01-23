import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client'

import { AppComponent } from './app.component';
import { LoginService } from './front/services/login.service';
import { NotificationService } from './utility/notification.service';


describe('AppComponent', () => {
  let CompApp: AppComponent;
  let toastrMock: ToastrService;
  let loginServiceMock: LoginService;
  let notifyServiceMock: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot(), HttpClientTestingModule,
      ],
      declarations: [AppComponent],
      providers: [ToastrService, NotificationService]
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.socket = io('http://127.0.0.1:8080')
    expect(app).toBeTruthy();

  });

  it(`should have as title 'Darna'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Darna');
  });
});
