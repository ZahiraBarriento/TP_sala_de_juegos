import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//firebase
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

//componentes
import { MainNavComponent } from './components/main-nav/main-nav.component';

//paginas
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnagramaComponent } from './pages/juegos/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './pages/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { AdivinaNumeroComponent } from './pages/juegos/adivina-numero/adivina-numero.component';
import { TatetiComponent } from './pages/juegos/tateti/tateti.component';
import { AhorcadoComponent } from './pages/juegos/ahorcado/ahorcado.component';
import { AgilidadAritmeticaComponent } from './pages/juegos/agilidad-aritmetica/agilidad-aritmetica.component';
import { MemotestComponent } from './pages/juegos/memotest/memotest.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

//material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AnagramaComponent,
    PiedraPapelTijeraComponent,
    AdivinaNumeroComponent,
    TatetiComponent,
    AgilidadAritmeticaComponent,
    MemotestComponent,
    AhorcadoComponent,
    MainNavComponent,
    UsuarioComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
