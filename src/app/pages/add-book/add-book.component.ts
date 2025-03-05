import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { ServiceBookService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from '../../models/respuesta';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  public libroId: number;
  public usuarioId: number;
  public titulo: string;
  public estilo: string;
  public autor: string;
  public precio: number;
  public imagenUrl: string;

  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService) {}

  agregarLibro() {
    this.serviceBookService.getAll().subscribe((resp: Respuesta) => {
      if (resp.ok === false) {
        this.toastr.error(resp.message, 'Error', {
          toastClass: 'ngx-toastr custom-toast-error',
          positionClass: 'toast-bottom-right'
        });
        return;
      }
      this.serviceBookService.books = resp.data;

      const libroEncontrado = this.serviceBookService.books.find(book => book.id_book === this.libroId);

      if (libroEncontrado) {
        alert('El id del libro ya existe');
        return;
      }

      if (!this.libroId) {
        alert('El id del libro no puede estar vacio');
        return;
      }

      const nuevoLibro = new Book(this.libroId, this.usuarioId, this.titulo, this.estilo, this.autor, this.precio, this.imagenUrl);

      this.libroId
      this.usuarioId
      this.titulo
      this.estilo
      this.autor
      this.precio
      this.imagenUrl

      this.serviceBookService.add(nuevoLibro).subscribe((resp: Respuesta) => {;

      this.toastr.success('Libro agregado con exito', 'Exito', {
        toastClass: 'ngx-toastr custom-toast'
      });
    });
  })
  }


  ngOnInit() {
  }

}
