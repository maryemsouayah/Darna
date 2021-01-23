import {Component, OnInit} from '@angular/core';
import socketIO from "socket.io-client";
import {ToastrService} from 'ngx-toastr';
import { LoginService } from './front/services/login.service';
import { NotificationService } from '../app/utility/notification.service'
import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Darna';
   socket: any;
  public data: any;
  sound;
  user;
  isLoggedIn: Boolean;
  constructor(private toastr: ToastrService,private loginService: LoginService,private notifyService : NotificationService) { 
    this.socket = socketIO('http://127.0.0.1:8080') ;
  }
   ngOnInit(): void {
    this.sound = new Howl({
      src: ['../assets/sound.mp3']
    });
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.isLoggedIn = this.loginService.isLoggedIn();
      if (this.user.role === 'member') {
        this.socket.on('publishEvent', data => {
          this.data = data
  
          //call function : show toastr
          this.showSuccess(data.name, data.lieu);
          //sound play
          this.sound.play();
  
          console.log(data)
        })
    }



  }

  // corp function show toaster
  showSuccess(eventName: string, eventPlace: string) {
    this.toastr.success(eventName +'  '+ eventPlace, 'Nouvel évenement !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
  }




}

