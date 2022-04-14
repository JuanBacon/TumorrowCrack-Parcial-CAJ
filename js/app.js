// Declaracion de variables para el formulario de inicio de sesion
const loginFormElement = document.getElementById('loginForm');
const inputEmail = document.getElementById('email');
const inputPass = document.getElementById('pass');
const inputLogin = document.getElementById('login');
let key = 10;
let encrypt = true;
let dencrypt = false;
// localStorage.setItem("user","juan_die.bustamante@uao.edu.co")
// localStorage.setItem("password", encryptPassword("cualquierContraseña1234!#",key,true))

// TODO: Clase artista: nombre, lista de spotify, imagen, perfil'Descripcion'
<<<<<<< HEAD

class Artista {
    constructor(nombre, listaSpotify, imagen, perfil) {
        this.nombre = nombre;
        this.listaSpotify = listaSpotify;
        this.imagen = imagen;
        this.perfil = perfil;
    }



}

const d = document.querySelector('#id')

class UI {



}
=======
// Clase Imagen: imagen, titulo, alt'texto alternativo'
class Artist {
    constructor(name, spotifyList, img, description) {
        this.name = name;
        this.spotifyList = spotifyList;
        this.img = img;
        this.description = description;
    }
}
class Img {
    constructor(img, tittle, alt){
        this.img = img;
        this.tittle = tittle;
        this.alt = alt;
    }
}
// Comprobando que existe el elemento formulario del login
if(loginFormElement){
    // evento llamado al llamar el submit del formulario
    loginFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        // validacion y comparacion de los datos de inicio de sesion
        pass = inputPass.value;
        if(!validatePass(pass)){return}
        let mypassword = encryptPassword(pass, key, true);
        let myuser = inputEmail.value;
        console.log("Logging in with user:",myuser, "and password:", mypassword);
        let localpassword = localStorage.getItem('password');
        let localuser = localStorage.getItem('user');
        //validar contraseña y usuario
        if((mypassword === localpassword) && (myuser === localuser)){
            // inicio de sesion correcto 
            alert("Correct log in");
            loginFormElement.reset()
            loginFormElement.action = "../html/panel.html"
            loginFormElement.submit();
        } else{
            // inicio de sesion incorrecto
            alert("Incorrect data")
            loginFormElement.reset()
        } 
    });
    // funcion que valida la contraseña y sus caracteres 
    function validatePass(pass){
        for(let i = 0; i < pass.length; i++){
            if(pass.charCodeAt(i) < 33 || pass.charCodeAt(i) > 126){
                if(pass.charCodeAt(i) != 241 && pass.charCodeAt(i) != 209){
                    console.log(pass[i], " pos: ", i);
                    alert("Caracter inválido")
                    loginFormElement.reset()
                    return false;
                }
            }
        }
        return true; 
    }
    // funcion que encripta o desencripta, recibe la cadena a decifrar, la lleva del cifrado y la orden de encriptado o desencriptado
    function encryptPassword(word, key, encrypt){
        // variables para guardar el cifrado y la cadena a retornar
        let unicodeWord = [];
        let newWord = ""
        // lee y guarda en un arreglo cada uno de los caracteres en forma de codigo unicode
        for(let i = 0; i < word.length; i++){
            unicodeWord[i] = word.charCodeAt(i);
        }
        // depende de la orden encripta o desencripta
        if(encrypt){
            // encripta
            for(let i = 0; i < word.length; i++){
                if(unicodeWord[i] == 241 || unicodeWord[i] == 209){
                    unicodeWord[i] = unicodeWord[i];
                }else if((unicodeWord[i] + key) > 126){
                    unicodeWord[i] = 33 + (key -(126 - unicodeWord[i] + 1));
                }else {
                    unicodeWord[i] = unicodeWord[i] + key;
                }
            }
        }else{
            // desencripta
            for(let i = 0; i < word.length; i++){
                if(unicodeWord[i] == 241 || unicodeWord[i] == 209){
                    unicodeWord[i] = unicodeWord[i];
                }else if((unicodeWord[i] - key) < 33){
                    unicodeWord[i] = 126 - (key -(unicodeWord[i] - 33 + 1));
                }else {
                    unicodeWord[i] = unicodeWord[i] - key;
                }
            }
        }
        // transforma los codigos unicode en una cadena string para devolverla
        for(let i = 0; i < unicodeWord.length; i++){
            newWord += String.fromCharCode(unicodeWord[i]);
        }
        return newWord
    }
}
>>>>>>> develop