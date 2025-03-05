import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { ServiceBookService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from '../../models/respuesta';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  public libroId: number;

  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService) {}

  buscarLibro(libroId: number) {
    if (!libroId) {
      this.serviceBookService.getAll().subscribe((resp: Respuesta) => {
        if (resp.ok === false) {
          this.toastr.error(resp.message, 'Error', {
            toastClass: 'ngx-toastr custom-toast-error',
            positionClass: 'toast-bottom-right'
          });
          return;
        }
        this.serviceBookService.books = resp.data;
        console.log(this.serviceBookService.books);
      });
    } else {
      this.serviceBookService.getOne(libroId).subscribe((resp: Respuesta) => {
        if (resp.ok === false) {
          this.toastr.error(resp.message, 'Error', {
            toastClass: 'ngx-toastr custom-toast-error',
            positionClass: 'toast-bottom-right'
          });
        } else {
          this.serviceBookService.books = resp.data;
        }
      });
    }
  }

libroABorrar(id:number) {
  this.serviceBookService.delete(id).subscribe((resp: Respuesta) => {
    if (resp.ok === false) {
      this.toastr.error(resp.message, 'Error', {
        toastClass: 'ngx-toastr custom-toast-error',
        positionClass: 'toast-bottom-right'
    })
  }
  this.serviceBookService.books = resp.data
})
}

  ngOnInit() {

  }
}