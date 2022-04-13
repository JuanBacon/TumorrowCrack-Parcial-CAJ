const inputEmail = document.getElementById('email');
const inputPass = document.getElementById('pass');
const formElement = document.getElementById('loginForm');
const inputLogin = document.getElementById('login');
let word = ""
let key = 10;
let encrypt = true;
// localStorage.setItem("user","juan_die.bustamante@uao.edu.co")
// localStorage.setItem("password", encryptPassword("unaContraseñaMuyLarga",key,true))

// TODO: Clase artista: nombre, lista de spotify, imagen, perfil'Descripcion'
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




formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    pass = inputPass.value;
    let mypassword = encryptPassword(pass, key, true);
    let myuser = inputEmail.value;
    console.log("Logging in with user:",myuser, "and password:", mypassword);
    let localpassword = localStorage.getItem('password');
    let localuser = localStorage.getItem('user');
    //validar contraseña

    if((mypassword === localpassword) && (myuser === localuser)){
        alert("Correct log in");
        formElement.reset()
        formElement.action = "../html/panel.html"
        formElement.submit();
    } else{
        alert("Incorrect data")
        formElement.reset()
    }
});

// console.log("Encriptandooo");
// let mypassword = encryptPassword(word, key, true);
// console.log("Login with password:", mypassword);

// localStorage.setItem('contraseña', mypassword);
// console.log("Desencriptandoooo");
// let passwordCracked = encryptPassword(mypassword,key,false);
// console.log("La contraseña usada fue:", passwordCracked);


function encryptPassword(word, key, encrypt){
    let unicodeWord = [];
    let newWord = ""
    for(let i = 0; i < word.length; i++){
        unicodeWord[i] = word.charCodeAt(i);
    }
    if(encrypt){
        for(let i = 0; i < word.length; i++){
            unicodeWord[i] = unicodeWord[i] + key;
            if(unicodeWord[i] > 126){
                unicodeWord[i] = 33;
            }
        }
    }else{
        for(let i = 0; i < word.length; i++){
            unicodeWord[i] = unicodeWord[i] - key;
            if(unicodeWord[i] < 33){
                unicodeWord[i] = 126;
            }
        }
    }
    for(let i = 0; i < word.length; i++){
        newWord += String.fromCharCode(unicodeWord[i]);
    }
    return newWord
}




