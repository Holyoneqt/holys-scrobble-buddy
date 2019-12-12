import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PromptDialogComponent } from './components/prompt-dialog/prompt-dialog.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { PlaylistsDetailComponent } from './routes/playlists-detail/playlists-detail.component';
import { PlaylistsComponent } from './routes/playlists/playlists.component';
import { metaReducers, reducers } from './store/index.store';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        PlaylistsComponent,
        PlaylistsDetailComponent,
        
        PromptDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        AppMaterialModule,
        AppRoutingModule,

        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
    ],
    entryComponents: [
        PromptDialogComponent,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
