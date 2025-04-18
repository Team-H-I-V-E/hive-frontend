import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HeritageListComponent } from './pages/heritage/heritage-list/heritage-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layouts/layouts.component';
import { HeritageDetailComponent } from './pages/heritage/heritage-detail/heritage-detail.component';
import { Heritage3DViewerComponent } from './pages/heritage/heritage3d-viewer/heritage3d-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,  // 공통 레이아웃 (헤더 포함)
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeComponentModule)
      },
      {
        path: 'heritage',
        loadChildren: () => import('./pages/heritage/heritage.module').then(m => m.HeritageComponentModule)
      },
      {
        path: 'panorama',
        loadChildren: () => import('./pages/panorama/panorama.module').then(m => m.PanoramaComponentModule)
      },
      {
        path: 'arexplore',
        loadChildren: () => import('./pages/arexplore/arexplore.module').then(m => m.ARExploreComponentModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleComponentModule)
      },
      {
        path: 'mypage',
        loadChildren: () => import('./pages/mypage/mypage.module').then(m => m.MyPageComponentModule)
      },
      {
        path: 'heritage/heritagedetail/:id',
        component: HeritageDetailComponent
      },
      {
        path: 'heritage',
        children: [
          {
            path: 'heritagedetail/:id',
            component: HeritageDetailComponent
          }
        ]
      },
      { path: 'heritage-viewer/:id', component: Heritage3DViewerComponent },

    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
