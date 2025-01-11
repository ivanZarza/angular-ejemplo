import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { ServiceBookService } from '../../shared/books.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  public libroId: number = 0;
  public usuarioId: number = 0;
  public titulo: string = '';
  public estilo: string = '';
  public autor: string = '';
  public precio: number = 0;
  public imagenUrl: string = '';

  constructor(public serviceBookService: ServiceBookService) { 

  }

agregarLibro() {
    const nuevoLibro = new Book(this.libroId, this.usuarioId, this.titulo, this.estilo, this.autor, this.precio, this.imagenUrl);

    this.libroId = 0;
    this.usuarioId = 0;
    this.titulo = '';
    this.estilo = '';
    this.autor = '';
    this.precio = 0;
    this.imagenUrl = '';

    this.serviceBookService.add(nuevoLibro);
  }

  ngOnInit() {
  }  

}
