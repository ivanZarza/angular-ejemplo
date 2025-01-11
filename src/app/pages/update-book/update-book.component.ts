import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { ServiceBookService } from '../../shared/books.service';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {

  public libroId: number ;
  public usuarioId: number ;
  public titulo: string ;
  public estilo: string ;
  public autor: string;
  public precio: number ;
  public imagenUrl: string ;
  public libroEncontrado: Book;
  public libroModificado: Book;

  constructor(public serviceBookService: ServiceBookService) { 

  }

  encontrarLibro() {
  this.libroEncontrado =  this.serviceBookService.getOne(this.libroId);
  this.usuarioId = this.libroEncontrado.id_user;
  this.titulo = this.libroEncontrado.title;
  this.estilo = this.libroEncontrado.type;
  this.autor = this.libroEncontrado.author;
  this.precio = this.libroEncontrado.price;
  this.imagenUrl = this.libroEncontrado.photo;
  }

modificarLibro() {
    const libroModificado = new Book(this.libroId, this.usuarioId, this.titulo, this.estilo, this.autor, this.precio, this.imagenUrl);

    this.libroId;
    this.usuarioId ;
    this.titulo ;
    this.estilo;
    this.autor ;
    this.precio ;
    this.imagenUrl ;

    this.serviceBookService.edit(libroModificado);
  }

  ngOnInit() {
  }  

}
