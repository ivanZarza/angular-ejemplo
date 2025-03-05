import { Book } from "./book";

export class Respuesta {

    constructor(
        public status: number,
        public ok: boolean,
        public message: string,
        public data: Book[] 
    ) { }
}
