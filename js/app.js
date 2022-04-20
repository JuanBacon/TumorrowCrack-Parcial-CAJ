// Declaracion de variables para el formulario de inicio de sesion
const loginFormElement = document.getElementById("loginForm");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("pass");
const inputLogin = document.getElementById("login");
let key = 10;
let encrypt = true;
let dencrypt = false;
// localStorage.setItem("user","juan_die.bustamante@uao.edu.co")
// localStorage.setItem("password", encryptPassword("cualquierContraseña1234!#",key,true))

// TODO: Clase artista: nombre, lista de spotify, imagen, perfil'Descripcion'
// Clase Imagen: imagen, titulo, alt'texto alternativo'

const formArtist = document.querySelector("#formArtist");
const formImg = document.querySelector('#formImg');

class Artist {
  constructor(name, spotifyList, img, description, id) {
    this.name = name;
    this.spotifyList = spotifyList;
    this.img = img;
    this.description = description;
    this.id = id;
  }
}
class Img {
  constructor(img, tittle, alt, id) {
    this.img = img;
    this.tittle = tittle;
    this.alt = alt;
    this.id = id ;
  }
}

class UI{

    addHTMLArtist(){
        const contentArtist = document.querySelector('#contentArtist')
        this.clearHTML(contentArtist);

        artistList.forEach((artist) =>{
            const {name,spotifyList, img , description, id} = artist;

            const newArtist = document.createElement('div');
             newArtist.dataset.id = id;
             newArtist.innerHTML = `${name} <br> ${spotifyList} <br> 
             <img src="${img}" alt="" width = '200' heigh = '200'>  <br> ${description} <br> `
             const btnDelete = document.createElement('button')
             btnDelete.textContent = "borrar";
             btnDelete.onclick = () =>{
                deleteArtist(id);
             }
             const btnEdit = document.createElement('button')

             btnEdit.textContent = "Editar";
             btnEdit.onclick = () =>{
                editArtist(id);
             }
             newArtist.appendChild(btnEdit);
             newArtist.appendChild(btnDelete);
             

             contentArtist.appendChild(newArtist)
        })
        sincStorage();

    }

    addHTMLImg(){
      const contentImg = document.querySelector('#contentImg');
      this.clearHTML(contentImg);

      imgList.forEach((image) =>{

        const {img, tittle, alt, id} = image;
        const newImg = document.createElement('div');
        newImg.dataset.id = id;
        newImg.innerHTML = `<br> ${alt} <br> 
             <img src="${img}" alt="" width = '200' heigh = '200'>  <br> ${tittle} <br> `
             const btnDelete = document.createElement('button')
             btnDelete.textContent = "borrar";
             btnDelete.onclick = () =>{
                deleteImg(id);
             }
             const btnEdit = document.createElement('button')

             btnEdit.textContent = "Editar";
             btnEdit.onclick = () =>{
                editImg(id);
             }
  
             newImg.appendChild(btnEdit);
             newImg.appendChild(btnDelete);
             contentImg.appendChild(newImg)

      })
      sincStorage();
    }

    clearHTML(contentArtist){
        while(contentArtist.firstChild){
            contentArtist.removeChild(contentArtist.firstChild)
        }
    }
}
// Comprobando que existe el elemento formulario del login
if (loginFormElement) {
  // evento llamado al llamar el submit del formulario
  loginFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    // validacion y comparacion de los datos de inicio de sesion
    pass = inputPass.value;
    if (!validatePass(pass)) {
      return;
    }
    let mypassword = encryptPassword(pass, key, true);
    let myuser = inputEmail.value;
    console.log("Logging in with user:", myuser, "and password:", mypassword);
    let localpassword = localStorage.getItem("password");
    let localuser = localStorage.getItem("user");
    //validar contraseña y usuario
    if (mypassword === localpassword && myuser === localuser) {
      // inicio de sesion correcto
      alert("Correct log in");
      loginFormElement.reset();
      loginFormElement.action = "../html/panel.html";
      loginFormElement.submit();
    } else {
      // inicio de sesion incorrecto
      alert("Incorrect data");
      loginFormElement.reset();
    }
  });
  // funcion que valida la contraseña y sus caracteres
  function validatePass(pass) {
    for (let i = 0; i < pass.length; i++) {
      if (pass.charCodeAt(i) < 33 || pass.charCodeAt(i) > 126) {
        if (pass.charCodeAt(i) != 241 && pass.charCodeAt(i) != 209) {
          console.log(pass[i], " pos: ", i);
          alert("Caracter inválido");
          loginFormElement.reset();
          return false;
        }
      }
    }
    return true;
  }
  // funcion que encripta o desencripta, recibe la cadena a decifrar, la lleva del cifrado y la orden de encriptado o desencriptado
  function encryptPassword(word, key, encrypt) {
    // variables para guardar el cifrado y la cadena a retornar
    let unicodeWord = [];
    let newWord = "";
    // lee y guarda en un arreglo cada uno de los caracteres en forma de codigo unicode
    for (let i = 0; i < word.length; i++) {
      unicodeWord[i] = word.charCodeAt(i);
    }
    // depende de la orden encripta o desencripta
    if (encrypt) {
      // encripta
      for (let i = 0; i < word.length; i++) {
        if (unicodeWord[i] == 241 || unicodeWord[i] == 209) {
          unicodeWord[i] = unicodeWord[i];
        } else if (unicodeWord[i] + key > 126) {
          unicodeWord[i] = 33 + (key - (126 - unicodeWord[i] + 1));
        } else {
          unicodeWord[i] = unicodeWord[i] + key;
        }
      }
    } else {
      // desencripta
      for (let i = 0; i < word.length; i++) {
        if (unicodeWord[i] == 241 || unicodeWord[i] == 209) {
          unicodeWord[i] = unicodeWord[i];
        } else if (unicodeWord[i] - key < 33) {
          unicodeWord[i] = 126 - (key - (unicodeWord[i] - 33 + 1));
        } else {
          unicodeWord[i] = unicodeWord[i] - key;
        }
      }
    }
    // transforma los codigos unicode en una cadena string para devolverla
    for (let i = 0; i < unicodeWord.length; i++) {
      newWord += String.fromCharCode(unicodeWord[i]);
    }
    return newWord;
  }
}


function eventListeners() {
  formArtist.addEventListener("submit", uploadArtist);
  formImg.addEventListener('submit', uploadImg)

  document.addEventListener("DOMContentLoaded", () =>{
    imgList = JSON.parse(localStorage.getItem('imgList')) || [];
    artistList = JSON.parse(localStorage.getItem('artistList')) || [];
    ui.addHTMLArtist();
    ui.addHTMLImg()
  })
}

function uploadImg(e){
  e.preventDefault();

  const title = document.querySelector('#titleImage').value
  const alter = document.querySelector('#alterImg').value
  const imgFile = document.querySelector("#imgImg").files[0];
  const imgUrl = URL.createObjectURL(imgFile);
  const id = Date.now();
  const image = new Img(imgUrl, title, alter, id)

  
  imgList = [...imgList, image]


  ui.addHTMLImg();
  formImg.reset();
}

function uploadArtist(e) {
  e.preventDefault();
 
  //Obtengo Datos del form
  const name = document.querySelector("#nameArtist").value;
  const spotify = document.querySelector("#spotifyArtist").value;
  const description = document.querySelector("#descriptionArtist").value;
  // Obtengo el file, creo un url para la imagen
  const imgFile = document.querySelector("#imgArtist").files[0];
  const id = Date.now();



  const artist = new Artist(name, spotify, null, description, id);


  const reader = new FileReader();
  reader.addEventListener('load', ()=>{
    const imgData = reader.result;
    this.artist.img = imgData;
  })


  reader.readAsDataURL(imgFile);
  

  artistList = [...artistList, artist];

  ui.addHTMLArtist();
  console.log(artistList);
  formArtist.reset()
}


function deleteArtist(id){
    artistList = artistList.filter(artist=> artist.id !== id)
    ui.addHTMLArtist()
}

function deleteImg(id){

    imgList = imgList.filter( img => img.id !== id)
    ui.addHTMLImg()
}

function sincStorage(){
  localStorage.setItem("artistList", JSON.stringify(artistList));
  localStorage.setItem('imgList', JSON.stringify(imgList));
}

let artistList = [];
let imgList = [];
const ui = new UI();
//localStorage.clear();
eventListeners();
