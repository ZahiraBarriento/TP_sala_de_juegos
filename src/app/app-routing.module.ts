import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';
import { AnagramaComponent } from './pages/juegos/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './pages/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { AdivinaNumeroComponent } from './pages/juegos/adivina-numero/adivina-numero.component';
import { TatetiComponent } from './pages/juegos/tateti/tateti.component';
import { AgilidadAritmeticaComponent } from './pages/juegos/agilidad-aritmetica/agilidad-aritmetica.component';
import { AhorcadoComponent } from './pages/juegos/ahorcado/ahorcado.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ErrorComponent } from './pages/error/error.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ListGameComponent } from './components/list-game/list-game.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path:'login' , component : LoginComponent, canActivate: [NologinGuard], children : [] },
  { path:'register', component: RegisterComponent, children: [] },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard], children: []},
  { path:'juegos/anagrama', component: AnagramaComponent, children: [] },
  { path:'juegos/piedra-papel-tijera', component: PiedraPapelTijeraComponent, children: [] },
  { path:'juegos/adivina-numero', component: AdivinaNumeroComponent, children: [] },
  { path:'juegos/tateti', component: TatetiComponent, children: [] },
  { path:'juegos/agilidad-aritmetica', component: AgilidadAritmeticaComponent, children: [] },
  { path:'juegos/ahorcado', component: AhorcadoComponent, children: [] },
  { path:'usuario', component: UsuarioComponent, children: [] },
  { path:'spinner', component: SpinnerComponent, children: [] },
  { path:'juegos', component: ListGameComponent, children: [] },
  { path:'info', component: InfoComponent, children: [] },
  { path:'', component: HomeComponent, children: [] },
  { path:'**', component: ErrorComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
