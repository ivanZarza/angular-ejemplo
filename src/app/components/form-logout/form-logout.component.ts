import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../shared/usuario.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-logout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-logout.component.html',
  styleUrl: './form-logout.component.css'
})
export class FormLogoutComponent {

  public user: User;

  constructor(public usuario: UsuarioService, private router: Router, private toastr: ToastrService) {
    this.user = new User(null, '', '', '', '', '');
  }

  public async onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    await this.usuario.logout(this.user);
    if (this.usuario.logueado === false) {
      this.toastr.success('Sesión cerrada');
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1100);
    } else {
      this.toastr.error('Error al cerrar sesión');
    }
    form.resetForm();
  }
}

