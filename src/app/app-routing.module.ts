import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CopyRightComponent } from './copyright/copyright.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'copyright',
    component: CopyRightComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: '',
    component: HomeComponent,
	pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
