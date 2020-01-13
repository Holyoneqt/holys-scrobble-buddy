import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PromptDialogComponent } from './components/prompt-dialog/prompt-dialog.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AddSongComponent } from './routes/add-song/add-song.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { PlaylistsDetailComponent } from './routes/playlists-detail/playlists-detail.component';
import { PlaylistsComponent } from './routes/playlists/playlists.component';
import { metaReducers, reducers } from './store/index.store';
import { HolysErrorHandler } from './util/HolysErrorHandler';
import { ConfigComponent } from './routes/config/config.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        PlaylistsComponent,
        PlaylistsDetailComponent,
        AddSongComponent,
        
        InfoDialogComponent,
        PromptDialogComponent,
        LoadingComponent,
        DateSelectorComponent,
        ConfigComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
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
        InfoDialogComponent,
        PromptDialogComponent,
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: HolysErrorHandler,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
