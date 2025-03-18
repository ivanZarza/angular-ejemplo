import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UsuarioService } from '../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public user: User;
  public miClase: string = '';
  public mensaje: string = '';

  constructor(public usuarioService: UsuarioService, private toastr: ToastrService) {
    this.user = new User(usuarioService.user.id_user, usuarioService.user.name, usuarioService.user.last_name, usuarioService.user.email, usuarioService.user.photo, usuarioService.user.password = null);
  }

  nombreCompleto(): string {
    console.log(this.usuarioService);
    console.log(this.usuarioService.user);
    return this.usuarioService.user.name + ' ' + this.user.last_name;
  }

  public async actualizarUsuario(nuevoNombre: string, nuevoApellido: string, nuevoEmail: string, nuevaFoto: string, password1: string, password2: string) {
    if (nuevoNombre === '' && nuevoApellido === '' && nuevoEmail === '' && nuevaFoto === '') {
      this.toastr.error('No se ha modificado ningún campo', 'ERROR', {
        toastClass: 'ngx-toastr toast-denegado'
      });
      return;
    }

    if (password1 !== password2) {
      this.toastr.error('Las contraseñas no coinciden', 'ERROR', {
        toastClass: 'ngx-toastr toast-denegado'
      });
      return;
    }

    this.user.name = nuevoNombre || this.user.name || '';
    this.user.last_name = nuevoApellido || this.user.last_name || '';
    this.user.email = nuevoEmail || this.user.email || '';
    this.user.photo = nuevaFoto || this.user.photo || '';
    this.user.password = password1 || this.user.password;


    await this.usuarioService.actualizarUsuario(this.user);

    console.log(this.user.name);
    this.user.name = this.usuarioService.user.name;
    this.user.last_name = this.usuarioService.user.last_name;
    this.user.email = this.usuarioService.user.email;
    this.user.photo = this.usuarioService.user.photo;
    console.log(this.user.name);

    this.toastr.success('Usuario registrado correctamente', 'EXITO', {
      toastClass: 'ngx-toastr toast-validacion'
    });

  }

  ngOnInit(): void {
  }
}

