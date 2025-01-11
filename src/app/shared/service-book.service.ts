import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class ServiceBookService {

  private book: Book;
  private book2: Book;
  private arrayBooks: Book[] = [];

  constructor() { 
    this.book = new Book(1, 1, 'El Señor de los Anillos', 'Fantasia', 'J.R.R. Tolkien', 20, 'https://m.media-amazon.com/images/I/81Hx32a745L._SL1500_.jpg');
    this.book2 = new Book(2, 1, 'El Hobbit', 'Fantasia', 'J.R.R. Tolkien', 15, 'https://m.media-amazon.com/images/I/81dJWKg3LUL._SL1500_.jpg');
    this.arrayBooks.push(this.book, this.book2, this.book, this.book, this.book2, this.book, this.book, this.book2);
  }

  public getAll(): Book[] {
    return this.arrayBooks;
  }

  public getOne(id: number): Book {
    return this.arrayBooks.find(book => book.id_book === id);
  }

  add(book: Book): void {
    this.arrayBooks.push(book);
  }

  edit(book:Book): boolean {
    const libroEncontrado = this.arrayBooks.find(book => book.id_book === book.id_book);
    if(libroEncontrado) { 
      this.arrayBooks.forEach((element)=>{
        book.id_book ? element.id_book = book.id_book : element.id_book;
        book.id_user ? element.id_user = book.id_user : element.id_user;
        book.title ? element.title = book.title : element.title;
        book.type ? element.type = book.type : element.type;
        book.author ? element.author = book.author : element.author;
        book.price ? element.price = book.price : element.price;
        book.photo ? element.photo = book.photo : element.photo;
      })
      return true;
    } else {
      return false;
    }
}

  delete(id_book: number) {
    const libroEncontrado = this.arrayBooks.find(book => book.id_book === id_book);
    if(libroEncontrado) {
    this.arrayBooks.splice(id_book, 1);
    return true
  } else {
    return false;
  }
}
}
