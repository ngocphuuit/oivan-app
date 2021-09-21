import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyDetailComponent } from './technology-detail/technology-detail.component';
import { TechnologyCreateComponent } from './technology-create/technology-create.component';
import { DevelopersComponent } from './developers/developers.component';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { DeveloperCreateComponent } from './developer-create/developer-create.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';

const routes: Routes = [
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'technologies/new', component: TechnologyCreateComponent },
  { path: 'technologies/:id', component: TechnologyDetailComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'developers/new', component: DeveloperCreateComponent },
  { path: 'developers/:id', component: DeveloperDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: ProjectCreateComponent },
  { path: 'projects/:id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
