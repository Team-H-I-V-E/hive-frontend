import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HeritageListComponent } from './pages/heritage/heritage-list/heritage-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeComponentModule)
  },
  {
    path: 'heritage',
    loadChildren: () => import('./pages/heritage/heritage.module').then( m => m.HeritageComponentModule)
  },
  {
    path: 'panorama',
    loadChildren: () => import('./pages/panorama/panorama.module').then( m => m.PanoramaComponentModule)
  },
  {
    path: 'arexplore',
    loadChildren: () => import('./pages/arexplore/arexplore.module').then( m => m.ARExploreComponentModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./pages/article/article.module').then( m => m.ArticleComponentModule)
  },
  {
    path: 'mypage',
    loadChildren: () => import('./pages/mypage/mypage.module').then( m => m.MyPageComponentModule)
  },
  { 
    path: 'heritage/heritageList', component: HeritageListComponent 
  }, 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
