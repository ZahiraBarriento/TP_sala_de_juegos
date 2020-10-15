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
import { MemotestComponent } from './pages/juegos/memotest/memotest.component';
import { AhorcadoComponent } from './pages/juegos/ahorcado/ahorcado.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path:'login' , component : LoginComponent, canActivate: [NologinGuard], children : [] },
  { path:'register', component: RegisterComponent, children: [] },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard], children: []},
  { path:'anagrama', component: AnagramaComponent, children: [] },
  { path:'piedra-papel-tijera', component: PiedraPapelTijeraComponent, children: [] },
  { path:'adivina-numero', component: AdivinaNumeroComponent, children: [] },
  { path:'tateti', component: TatetiComponent, children: [] },
  { path:'agilidad-aritmetica', component: AgilidadAritmeticaComponent, children: [] },
  { path:'memotest', component: MemotestComponent, children: [] },
  { path:'ahorcado', component: AhorcadoComponent, children: [] },
  { path:'usuario', component: UsuarioComponent, children: [] },
  { path:'', component: HomeComponent, children: [] },
  { path:'**', component: ErrorComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
