import { User } from "../models/user";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;
  public logueado: boolean;
  public user: User;
  public respuesta: number

  constructor() {
    // this.url = 'http://localhost:3000';
    this.url = 'https://api-books-xi.vercel.app';

    const userJSON = globalThis.localStorage?.getItem('user')
    if (userJSON) {
      const  user  = JSON.parse(userJSON);
      console.log('user from userJSON', user);

      this.user = new User(user.id_user, user.name, user.last_name, user.email, user.photo, user.password);
      this.logueado = true;

      console.log('this.user', this.user);
    } else {
      this.user = new User(null, '', '', '', '', '')
      this.logueado = false;
    }
  }

  public async register(user: User) {
    try {
      console.log(user);
      const response = await fetch(`${this.url}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      this.user = data.data;
      this.respuesta= response.status;
      console.log(this.respuesta);
      globalThis.localStorage?.setItem('user', JSON.stringify(this.user));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async login(user: User) {
    try {
      const response = await fetch(`${this.url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: user.email, password: user.password })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();

      this.user = data.data[0];
      this.logueado = true;

      globalThis.localStorage?.setItem('user', JSON.stringify(this.user));
    } catch (error) {
      console.error('Error:', error);
      this.logueado = false;
    }
  }

  async actualizarUsuario(user: User) {
    console.log('actualizarUsuario', { ...this.user, ...user });
    const newUser = { ...this.user, ...user };

    try {
      const response = await fetch(`${this.url}/usuarios`,  {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newUser)
      })
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      this.user = new User(newUser.id_user, newUser.name, newUser.last_name, newUser.email, newUser.photo, newUser.password);
      globalThis.localStorage?.setItem('user', JSON.stringify(this.user));
    } catch (error) {
      console.error('Error:', error);
    }
  }


  public logout() {
  

      this.logueado = false;
      this.user = new User(null, '', '', '', '', '');
      console.log('Sesión cerrada correctamente');
      globalThis.localStorage?.removeItem('user');
      console.log('user', this.user);
      console.log('logueado', this.logueado);

  }
}
