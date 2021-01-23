import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../front/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import  socketIO from 'socket.io-client';
import {timeout} from 'q';
import { Member } from 'src/app/back/models/member';
import { ListMemberService } from 'src/app/back/service/list-Member.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user;
  connectedUser;
  isLoggedIn: Boolean;
  private socket: any;
  public data: any;

  constructor(private loginService: LoginService, private router: Router,private toastr: ToastrService,private listMemberService: ListMemberService) {
    this.socket = socketIO('http://127.0.0.1:8080');
  }



  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user){
      this.getMemberById(this.user._id)

    }
    // console.log("consolleeee3")

    // console.log(this.user)
    this.isLoggedIn = this.loginService.isLoggedIn();
  /*   if(this.isLoggedIn && this.user.role=='member'){
      this.socket.on('publishEvent', data => {
        this.data = data

        //call function : show toastr
        this.showSuccess(this.data.name, this.data.lieu);
        console.log(this.data)
      })
    } */
  }
  logout() {
    this.loginService.logout();
    sessionStorage.setItem('UserConnect', null);
    sessionStorage.setItem('user', null);
  }
  getMemberById(id) {
    this.listMemberService.getMember(id).subscribe((res: Member) => {
      this.connectedUser = res;
    });
  }

  /*  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);

  } */
  showSuccess(eventName: string, eventPlace: string) {
    this.toastr.success(eventName +'  '+ eventPlace, 'Nouvel évenement !',{ timeOut: 500000} );
  }

}
