import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { ServiceBookService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  public libroId: number
  public usuarioId: number
  public titulo: string
  public type: string
  public autor: string
  public precio: number
  public imagenUrl: string
  public libroEncontrado: Book

  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService,  public usuarioService: UsuarioService) { 

  }

  public async agregarLibro() {
    
    const nuevoLibro = new Book(this.libroId  = null , this.usuarioId = this.usuarioService.user.id_user, this.titulo, this.type, this.autor, this.precio, this.imagenUrl);

    this.titulo = ''
    this.type = ''
    this.autor = ''
    this.precio = null
    this.imagenUrl = ''

    await this.serviceBookService.add(nuevoLibro);

    if (this.serviceBookService.respuesta !== 200) {
      this.toastr.error('No se puso agregar el   libro', 'ERROR', {
        toastClass: 'ngx-toastr toast-denegado'
      });
    }
    this.toastr.success('Libro agregado con exito', 'EXITO', {
      toastClass: 'ngx-toastr toast-validacion'
    });
  }

  ngOnInit() {
  }

}
