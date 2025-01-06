import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  public book: Book;
  public book2: Book;
  public arrayBooks: Book[] = [];

  public libroId: number = 0;
  public usuarioId: number = 0;
  public titulo: string = '';
  public estilo: string = '';
  public autor: string = '';
  public precio: number = 0;
  public imagenUrl: string = '';

  constructor() { 
    this.book = new Book(1, 1, 'El Señor de los Anillos', 'Fantasia', 'J.R.R. Tolkien', 20, 'https://m.media-amazon.com/images/I/81Hx32a745L._SL1500_.jpg');
    this.book2 = new Book(2, 1, 'El Hobbit', 'Fantasia', 'J.R.R. Tolkien', 15, 'https://m.media-amazon.com/images/I/81dJWKg3LUL._SL1500_.jpg');
    this.arrayBooks.push(this.book, this.book2, this.book, this.book, this.book2, this.book, this.book, this.book2);
  }

  agregarLibro() {
    const nuevoLibro = new Book(this.libroId, this.usuarioId, this.titulo, this.estilo, this.autor, this.precio, this.imagenUrl);
    this.arrayBooks.push(nuevoLibro);
    console.log('Libro agregado', nuevoLibro);

    // Limpiar los inputs
    this.libroId = 0;
    this.usuarioId = 0;
    this.titulo = '';
    this.estilo = '';
    this.autor = '';
    this.precio = 0;
    this.imagenUrl = '';
  }

  ngOnInit() {
  }
}
