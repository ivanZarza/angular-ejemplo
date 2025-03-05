import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceBookService {

  private URL = 'http://localhost:3000/books';

  public books: Book[] = [];
  public book: Book 

  constructor(private http: HttpClient) { 
  }

  public getAll(): Observable<Object> {
    return this.http.get<Book[]>(this.URL);
  }

  public getOne(id_book: number):Observable <Object> {
    return this.http.get<Book>(`${this.URL}?id=${id_book}`);
  }

  public add(book: Book): Observable<Object> {
    return this.http.post(this.URL, book);
  }

  public edit(libro: Book): Observable<Object> {
    return this.http.put(`${this.URL}?id=${libro.id_book}`, libro);
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.URL}?id=${id}`);
    }
  }

