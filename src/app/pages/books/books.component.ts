import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../models/book';
import { CardComponent } from '../../components/card/card.component';
import { ServiceBookService } from '../../shared/books.service';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  public libroId: number;
  public arrayBooks: Book[];

  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService, public usuarioService: UsuarioService) {
    this.arrayBooks = null;
    this.libroId = null;
  } 

  public async buscarLibro() {
    try {
      if (this.libroId) {
        await this.serviceBookService.getBooks({ id_book: this.libroId, id_user: this.usuarioService.user.id_user });
        this.arrayBooks = this.serviceBookService.arrayBooks;

        if (this.arrayBooks.length === 0) {
          this.toastr.error('No se encontro el libro', 'ERROR', {
            toastClass: 'ngx-toastr toast-denegado'
          });
        } else {
          this.toastr.success('Libro encontrado','EXITO',{
            toastClass: 'ngx-toastr toast-validacion'
          });
        }
      } else {
        await this.serviceBookService.getBooks({ id_user: this.usuarioService.user.id_user });
        this.arrayBooks = this.serviceBookService.arrayBooks;

        if (this.arrayBooks.length === 0) {
          this.toastr.error('No se encontraron libros', 'ERROR', {
            toastClass: 'ngx-toastr toast-denegado'
          });
        } else {
          this.toastr.success('Libros encontrados','EXITO',{
            toastClass: 'ngx-toastr toast-validacion'
          });
        }
      }
    } catch (error) {
      this.toastr.error('Error al buscar el libro o conectar con el servidor', 'ERROR', {
        toastClass: 'ngx-toastr toast-denegado',
      });
    }
  }

  public async borrarLibro(id_libro: number) {
    console.log('Borrando libro con id: ', id_libro);
    await this.serviceBookService.delete(id_libro,this.usuarioService.user.id_user);
    if (this.serviceBookService.respuesta !== 200) {
      this.toastr.error('Error al borrar el libro', 'ERROR', {
        toastClass: 'ngx-toastr toast-denegado'
      });
    } else {
      await this.toastr.success('Libro borrado', 'ÉXITO', {
        toastClass: 'ngx-toastr toast-validacion'
      });
      this.buscarLibro();
    }
  }
}
