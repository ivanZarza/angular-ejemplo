import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() bookDesdePadre: Book;
  @Input() isEven: boolean;
  @Input() posicionLibro: number;
  @Output() libroABorrar = new EventEmitter<number>();

  constructor() { 

  }

borrarLibro(posicion) {
    this.libroABorrar.emit(posicion);
  }

  ngOnInit() {
  }
}

