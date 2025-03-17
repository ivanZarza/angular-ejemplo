import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { ServiceBookService } from '../../shared/books.service'; 
import { PipeRefPipe } from '../../pipes/pipe-ref.pipe';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, PipeRefPipe, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] // Corregido: styleUrls en plural
})
export class CardComponent {

  @Input() bookDesdePadre: Book;
  @Input() isEven: boolean;

  constructor(public serviceBookService: ServiceBookService, public usuario: UsuarioService) {}

  borrarLibro(id_libro: number) {
    console.log('Borrando libro con id: ', id_libro);
    this.serviceBookService.delete(id_libro, this.usuario.user.id_user);
  }

  ngOnInit() {}
}

