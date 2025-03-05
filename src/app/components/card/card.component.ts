import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { PipeRefPipe } from '../../pipes/pipe-ref.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, PipeRefPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() bookDesdePadre: Book;
  @Input() isEven: boolean;
  @Output() libroABorrar = new EventEmitter<number>();

  constructor( ) { 

  }

  borrarLibro(id: number) {
    console.log('Borrando libro con id Card component: ', id);
    this.libroABorrar.emit(id);
  }
  
  ngOnInit() {
  }
}