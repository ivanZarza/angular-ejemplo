import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { ServiceBookService } from '../../shared/books.service'; 
import { PipeRefPipe } from '../../pipes/pipe-ref.pipe';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { UsuarioService } from '../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, PipeRefPipe, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] 
})
export class CardComponent {

  @Input() bookDesdePadre: Book;
  @Input() isEven: boolean;
  @Output() borrarLibroEvent = new EventEmitter<number>();

  constructor(public serviceBookService: ServiceBookService, public usuario: UsuarioService, private toastr: ToastrService) {}

  onBorrarLibro() {
    this.borrarLibroEvent.emit(this.bookDesdePadre.id_book); 
  }

/*   borrarLibro(id_libro: number) {
    console.log('Borrando libro con id: ', id_libro);
    this.serviceBookService.delete(id_libro, this.usuario.user.id_user);
    if (this.serviceBookService.respuesta !== 200) {
      this.toastr.error('Error al  borrar el  libro', 'ERROR', {
        toastClass: 'ngx-toastr toast-denegado'
      });
    } else {

      this.toastr.success('Libro borrado','EXITO',{
        toastClass: 'ngx-toastr toast-validacion'
      });
    }
  } */
  ngOnInit() {}
}

