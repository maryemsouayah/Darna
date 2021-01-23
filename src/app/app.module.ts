import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClient,  HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { NavbarComponent } from './shared/home/navbar/navbar.component';
import { FooterComponent } from './shared/home/footer/footer.component';
import { ContainerComponent } from './shared/home/container/container.component';
import { LoginComponent } from './front/login/login.component';
import { RegisterComponent } from './front/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListeDemandeComponent } from './back/liste-demande/liste-demande.component';
import { ListmembersComponent } from './back/listmembers/listmembers.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DetailsmembreComponent } from './back/listmembers/detailsmembre/detailsmembre.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchMemberPipe } from './back/pipes/search-member.pipe';
import { EventComponent } from './back/event/event.component';
import { DetailsEventsComponent } from './back/event/details-events/details-events.component';
import {  NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { SearchEventPipe } from './back/pipes/search-event.pipe';
import { ContactFormComponent } from './front/contact-form/contact-form.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProfileComponent } from './back/profile/profile.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InterceptorProvider } from './back/interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ContainerComponent,
    LoginComponent,
    RegisterComponent,
    ListeDemandeComponent,
    ListmembersComponent,
    DetailsmembreComponent,
    SearchMemberPipe,
    EventComponent,
    DetailsEventsComponent,
    SearchEventPipe,
    ContactFormComponent,
    ProfileComponent,
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule ,
    MatSelectModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
   ],
  // entryComponents: [ChildBoxComponent],

  providers: [InterceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
