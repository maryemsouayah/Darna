import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './front/register/register.component';
import { LoginComponent } from './front/login/login.component';
import { ListeDemandeComponent } from './back/liste-demande/liste-demande.component';
import { AuthGuard } from './front/guards/auth.guard';
import { ListmembersComponent } from './back/listmembers/listmembers.component';
import { DetailsmembreComponent } from './back/listmembers/detailsmembre/detailsmembre.component';
import { EventComponent } from './back/event/event.component'
import { DetailsEventsComponent } from './back/event/details-events/details-events.component'
import { ContactFormComponent } from './front/contact-form/contact-form.component';
import { HomeComponent } from './shared/home/home.component';
import { ContainerComponent } from './shared/home/container/container.component';
import { ProfileComponent } from './back/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ContainerComponent,
      },
      {
        path: 'listmembers',
        component: ListmembersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listeDemandes',
        component: ListeDemandeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detailsMember/:idMember',
        component: DetailsmembreComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Event',
        component: EventComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'details-event/:idEvent' ,
        component: DetailsEventsComponent ,
      },
      { path: 'contact',
      component:  ContactFormComponent
    },

    {
      path: 'profile',
      component: ProfileComponent ,
      canActivate: [AuthGuard],
    },

    ],
  },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
