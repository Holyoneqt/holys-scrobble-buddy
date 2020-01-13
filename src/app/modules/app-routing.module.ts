import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../routes/auth.guard';
import { ConfigComponent } from '../routes/config/config.component';
import { HomeComponent } from '../routes/home/home.component';
import { LoginComponent } from '../routes/login/login.component';
import { PlaylistsDetailComponent } from '../routes/playlists-detail/playlists-detail.component';
import { PlaylistsComponent } from '../routes/playlists/playlists.component';



const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'playlists',
        component: PlaylistsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'playlists/:id',
        component: PlaylistsDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'config',
        component: ConfigComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
