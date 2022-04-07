// TODO: Clase artista: nombre, lista de spotify, imagen, perfil'Descripcion'
// Clase Imagen: imagen, titulo, alt'texto alternativo'

class Artista {
    constructor(nombre, listaSpotify, imagen, perfil) {
        this.nombre = nombre;
        this.listaSpotify = listaSpotify;
        this.imagen = imagen;
        this.perfil = perfil;
    }
}

class Imagen {
    constructor(imagen, titulo, alt){
        this.imagen = imagen;
        this.titulo = titulo;
        this.alt = alt;
    }
}