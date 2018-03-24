import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CopyRightComponent } from './copyright/copyright.component';
import { ProjectsComponent } from './projects/projects.component';
import { PhotosComponent } from './photos/photos.component';
import { LinksComponent } from './links/links.component';
import { ExtrasComponent } from './extras/extras.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'extras',
    component: ExtrasComponent
  },
  {
    path: 'links',
    component: LinksComponent
  },
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
    path: 'photos',
    component: PhotosComponent
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
