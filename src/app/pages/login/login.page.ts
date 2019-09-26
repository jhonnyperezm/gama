import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/services/rutas.service';
import { ToastController } from '@ionic/angular';

declare const $;




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [LoginService, RutasService]
})
export class LoginPage implements OnInit {
  token: any;
  DatosLogin: any;
  datosToken: any;
  app: any;
  datosTokenSec: any;
  privateIP: any;
  DataNewUser: any = [];

  @ViewChild('UsuarioForm')
  private UsuarioForm: NgForm;



  constructor(private http: HttpClient,
    public router: Router,
    public loginService: LoginService,
    public toastCtrl: ToastController) {
    this.privateIP = sessionStorage.getItem('IpLocal');
  }

  ngOnInit() {

  }

  LoginUser(e) {
    console.log(e);

    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;


    this.loginService.postLogin(username, password, this.privateIP).subscribe(
      data => {
        console.log(data.text());

        this.token = data.text();
        if (this.token == 'usuario o clave incorrecta') {
          this.msjContrIncorrecto();
          // this.toastr.error('Error! Usuario o  Contraseña  Incorrectos, verifique e intente nuevamente ');
        } else if (this.token == 'El usuario esta desctivado') {
          this.msjUserIncorrecto();
          //this.toastr.error('Error! El usuario esta desactivado'); 
        } else {
          this.loginService.decodeToken(this.token).subscribe(
            data2 => {
              this.datosToken = data2;
              localStorage.setItem('token', this.token);
              /* localStorage.setItem('token2', this.token);
              localStorage.setItem('user_email', this.datosToken.user_email);
              localStorage.setItem('user', this.datosToken.user);
              localStorage.setItem('rol', this.datosToken.rol);
              localStorage.setItem('id_rol', this.datosToken.id_rol);
              localStorage.setItem('creadoPor', this.datosToken.creadoPor);
              localStorage.setItem('cli', this.datosToken.idCliente);
              localStorage.setItem('logConf', '1'); */

              this.router.navigate(['viewinicial']);
            }
          );
        }

      }
    );
  }

  async msjContrIncorrecto() {
    const toast = await this.toastCtrl.create({
      message: 'Error! Usuario o  Contraseña  Incorrectos, verifique e intente nuevamente.',
      duration: 3000,
      position: 'top',
      mode: 'ios',
      color: 'danger',

    });
    toast.present();
  }

  async msjUserIncorrecto() {
    const toast = await this.toastCtrl.create({
      message: 'Error! El usuario esta desactivado',
      duration: 3000,
      position: 'top',
      mode: 'ios',
      color: 'danger',

    });
    toast.present();
  }

  // CambiarClave(DatosUsuario) {
  //   console.log(DatosUsuario);
  //   this.loginService.updateClave(DatosUsuario).subscribe(
  //     data => {
  //       console.log(data);
  //       if (data.text() === 'success al cambiar clave') {
  //         this.toastr.success('Exitoso! Se cambio la clave correctamente');
  //       } else if (data.text() === 'error al cambiar clave') {
  //         this.toastr.error('Error! No se pudo cambiar la clave');
  //       } else if (data.text() === 'las claves no son iguales') {
  //         this.toastr.info('Verificar! Las claves no son iguales');
  //       } else if (data.text() === 'no existe el usuario') {
  //         this.toastr.error('Error! No existe el usuario');
  //       }
  //     });
  // }

  LimpiarFormUsuarios() {
    this.UsuarioForm.reset();
  }









}
