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
const formImg = document.querySelector("#formImg");

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
    this.id = id;
  }
}

class UI {
  addHTMLArtist() {
    const contentArtist = document.querySelector("#contentArtist");
    this.clearHTML(contentArtist);

    const titleName = document.createElement('h2');
    titleName.textContent = 'Artistas'
    contentArtist.appendChild(titleName)

    artistList.forEach((artist) => {
      const { name, spotifyList, img, description, id } = artist;

      const newArtist = document.createElement("div");
      newArtist.classList.add('contentDiv')

      newArtist.dataset.id = id;

      newArtist.innerHTML = `
        <div class = 'divImg'>
        <figure> <img src="${img}" alt="" width = '200' heigh = '200'>  <br></figure>
        
        </div>
               `;

      const artistInfo = document.createElement("div");
      artistInfo.classList.add('artistInfo')

      artistInfo.innerHTML = `     <h1 class= 'nameArtist'>${name} </h1><br> ${description} <br> <a href='${spotifyList}' target ='_blank'> Link Spotify</a>  <br> 
       `

      const btnDelete = document.createElement("button");
      btnDelete.classList.add('button-delete')
      btnDelete.textContent = "Borrar";
      btnDelete.onclick = () => {
        deleteArtist(id);
      };
      const btnEdit = document.createElement("button");

      btnEdit.textContent = "Editar";
      btnEdit.onclick = () => {
        editArtist(artist);
      };
      artistInfo.appendChild(btnEdit);
      artistInfo.appendChild(btnDelete);

      newArtist.appendChild(artistInfo)
      contentArtist.appendChild(newArtist);
    });
    sincStorage();
  }

  addHTMLImg() {
    const contentImg = document.querySelector("#contentImg");
    this.clearHTML(contentImg);
    
    const titleName = document.createElement('h2');
    titleName.textContent = 'Imagenes'
    contentImg.appendChild(titleName)

    imgList.forEach((image) => {
      const { img, tittle, alt, id } = image;
      const newImg = document.createElement("div");
      newImg.classList.add('contentDiv')
      newImg.dataset.id = id;
      newImg.innerHTML = `
      
        <div class = 'divImg'>
        <figure> <img src="${img}" alt="" width = '200' heigh = '200'>  <br></figure>
        
        </div>
`;


 /*               
      
 <br> ${alt} <br> 
 <br> ${tittle} <br> 
 */

 const imgInfo = document.createElement("div");
 imgInfo.classList.add('artistInfo')

 imgInfo.innerHTML = `   <h1 class= 'nameArtist'>${tittle} </h1><br> ${alt} <br>  <br> 
  `



      const btnDelete = document.createElement("button");
      btnDelete.classList.add('button-delete')
      btnDelete.textContent = "Borrar";
      btnDelete.onclick = () => {
        deleteImg(id);
      };
      const btnEdit = document.createElement("button");

      btnEdit.textContent = "Editar";
      btnEdit.onclick = () => {
        editImg(image);
      };

      imgInfo.appendChild(btnEdit);
      imgInfo.appendChild(btnDelete);
      newImg.appendChild(imgInfo)

      contentImg.appendChild(newImg);
    });
    sincStorage();
  }

  clearHTML(contentArtist) {
    while (contentArtist.firstChild) {
      contentArtist.removeChild(contentArtist.firstChild);
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
      // alert("Correct log in");
      loginFormElement.reset();
      loginFormElement.action = "../html/panel.html";
      loginFormElement.submit();
    } else {
      // inicio de sesion incorrecto
      alert("Información incorrecta");
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
  formImg.addEventListener("submit", uploadImg);

  document.addEventListener("DOMContentLoaded", () => {
    imgList = JSON.parse(localStorage.getItem("imgList")) || [];
    artistList = JSON.parse(localStorage.getItem("artistList")) || [];
    ui.addHTMLArtist();
    ui.addHTMLImg();
  });
}

function uploadImg(e) {
  e.preventDefault();

  const title = document.querySelector("#titleImage").value;
  const alter = document.querySelector("#alterImg").value;
  const imgFile = document.querySelector("#imgImg").files[0];
  const id = Date.now();
  const reader = new FileReader();

  if (editingImg) {
    document.querySelector("#submitbtnImg").value = "Crear";
    const id = parseInt(document.querySelector("#idTmp").textContent);
    imgList.forEach((image) => {
      if (image.id == id) {
        image.tittle = title;
        image.alt = alter;
        reader.addEventListener("load", () => {
          console.log();
          changeIMG(image, reader.result);
        });
        reader.readAsDataURL(imgFile);
      } else {
        return image;
      }
    });
    ui.addHTMLImg();
    editingImg = false;
    formImg.reset();
    return;
  }

  const image = new Img(null, title, alter, id);

  reader.addEventListener("load", () => {
    changeIMG(image, reader.result);
  });

  reader.readAsDataURL(imgFile);
  imgList = [...imgList, image];

  ui.addHTMLImg();
  formImg.reset();
}

function uploadArtist(e) {
  e.preventDefault();
  const name = document.querySelector("#nameArtist").value;
  const spotify = document.querySelector("#spotifyArtist").value;
  const description = document.querySelector("#descriptionArtist").value;
  const imgFile = document.querySelector("#imgArtist").files[0];
  
  const reader = new FileReader();
  const id = Date.now();

  if (editingArtist) {
    document.querySelector("#submitbtnArtist").value = "Crear";
    const id = parseInt(document.querySelector("#idTmp").textContent);
    artistList.forEach((artist) => {
      if (artist.id == id) {
        artist.name = name;
        artist.spotify = spotify;
        artist.description = description;
        reader.addEventListener("load", () => {
          console.log();
          changeIMG(artist, reader.result);
        });
        reader.readAsDataURL(imgFile);
      } else {
        return artist;
      }
    });
    editingArtist = false;
    ui.addHTMLArtist();
    
    formArtist.reset();
    return;
  } else {
    const artist = new Artist(name, spotify, null, description, id);
    reader.addEventListener("load", () => {
      console.log();
      changeIMG(artist, reader.result);
    });
    reader.readAsDataURL(imgFile);
    artistList = [...artistList, artist];

    ui.addHTMLArtist();
    console.log(artistList);
    formArtist.reset();
  }
  //Obtengo Datos del form
}

function changeIMG(obj, url) {
  obj.img = url;
  ui.addHTMLArtist();
  ui.addHTMLImg();
}

function deleteArtist(id) {
  artistList = artistList.filter((artist) => artist.id !== id);
  ui.addHTMLArtist();
}

function deleteImg(id) {
  imgList = imgList.filter((img) => img.id !== id);
  ui.addHTMLImg();
}

function sincStorage() {
  localStorage.setItem("artistList", JSON.stringify(artistList));
  localStorage.setItem("imgList", JSON.stringify(imgList));
}

function editArtist(artistObj) {
  const { name, spotifyList, description, id } = artistObj;

  document.querySelector("#nameArtist").value = name;
  document.querySelector("#spotifyArtist").value = spotifyList;
  document.querySelector("#descriptionArtist").value = description;
  document.querySelector("#idTmp").textContent = id;
  document.querySelector("#submitbtnArtist").value = "Guardar";
  editingArtist = true;
}

function editImg(imgObj) {
  const { tittle, alt, id } = imgObj;

  document.querySelector("#titleImage").value = tittle;
  document.querySelector("#alterImg").value = alt;
  document.querySelector("#idTmp").textContent = id;

  document.querySelector("#submitbtnImg").value = "Guardar";
  editingImg = true;
}

let artistList = [];
let imgList = [];
const ui = new UI();
let editingArtist = false;
let editingImg = false;

//localStorage.clear();
eventListeners();
