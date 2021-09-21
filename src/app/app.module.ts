import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyDetailComponent } from './technology-detail/technology-detail.component';
import { TechnologyCreateComponent } from './technology-create/technology-create.component';
import { DeveloperCreateComponent } from './developer-create/developer-create.component';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { DevelopersComponent } from './developers/developers.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    TechnologiesComponent,
    TechnologyDetailComponent,
    TechnologyCreateComponent,
    DeveloperCreateComponent,
    DeveloperDetailComponent,
    DevelopersComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectCreateComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
