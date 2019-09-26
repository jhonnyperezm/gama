import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule'},
  { path: 'gruposventa/:idGrupo/:nombreGrupo', loadChildren: './pages/gruposventa/gruposventa.module#GruposventaPageModule' },
  { path: 'carrito', loadChildren: './pages/carrito/carrito.module#CarritoPageModule' },
  { path: 'gruposventaseleccion/:idGrupo/:nombreGrupo/:idArt', loadChildren: './pages/gruposventaseleccion/gruposventaseleccion.module#GruposventaseleccionPageModule' },
  { path: 'viewfinal', loadChildren: './pages/viewfinal/viewfinal.module#ViewfinalPageModule' },
  { path: 'viewinicial', loadChildren: './pages/viewinicial/viewinicial.module#ViewinicialPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

 
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
