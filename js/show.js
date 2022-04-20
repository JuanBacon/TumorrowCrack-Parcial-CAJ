class UI {
  addHTMLArtist() {
    const contentArtist = document.querySelector("#contentArtist");
    


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



     
      newImg.appendChild(imgInfo)

      contentImg.appendChild(newImg);
    });
    sincStorage();
  }

  
}

function eventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    imgList = JSON.parse(localStorage.getItem("imgList")) || [];
    artistList = JSON.parse(localStorage.getItem("artistList")) || [];
    console.log("entrando artist");
    ui.addHTMLArtist();
    console.log("entrando");
    ui.addHTMLImg();
  });
}


function sincStorage() {
  localStorage.setItem("artistList", JSON.stringify(artistList));
  localStorage.setItem("imgList", JSON.stringify(imgList));
}

let artistList = [];
let imgList = [];
const ui = new UI();

//localStorage.clear();
eventListeners();