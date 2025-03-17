import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { ServiceBookService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {

  public id_book: number;
  public id_user: number;
  public title: string;
  public type: string;
  public author: string;
  public price: number;
  public photo: string;
  public libroEncontrado: Book;
  public libroModificado: Book;

  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService) {}

  async encontrarLibro() {
    await this.serviceBookService.getBooks({ id_book: this.id_book });
    console.log(this.serviceBookService.arrayBooks);
    if (this.serviceBookService.arrayBooks.length === 0) {
      this.toastr.error('No se encontró el libro');
      return;
    } else {
      this.toastr.success('Libro encontrado');
    }
    this.libroEncontrado = this.serviceBookService.arrayBooks[0];
    console.log(this.libroEncontrado);

    this.id_user = this.libroEncontrado.id_user;
    this.title = this.libroEncontrado.title;
    this.type = this.libroEncontrado.type;
    this.author = this.libroEncontrado.author;
    this.price = this.libroEncontrado.price;
    this.photo = this.libroEncontrado.photo;
  }

  modificarLibro() {
    const libroModificado = new Book(this.id_book, this.id_user, this.title, this.type, this.author, this.price, this.photo);

    this.id_book = null;
    this.id_user = null;
    this.title = '';
    this.type = '';
    this.author = '';
    this.price = null;
    this.photo = '';

    this.serviceBookService.edit(libroModificado);
    this.toastr.success('Libro modificado con éxito');
  }

  ngOnInit() {}
}
