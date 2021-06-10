window.onscroll = function() {myFunction()};

var header = document.getElementById("nav-id");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//ustvariš spremenljivke (sliderImg = izbereVseSlike)
let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0; //označuje in sešteva slide

startSlide();
// Clear all images na začetku počitsti vse slike
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset(); //funkcija reset se pokliče tukaj
  sliderImages[0].style.display = "block"; //prikaže prvo sliko
}

// Show prev
function slideLeft() {
  reset(); //počisti vse slike
  sliderImages[current - 1].style.display = "block"; //prikaže sliko, z manjšim indexom -1 in jo prikaže
  current--; //števcu odšteje eno številko -1
}

// Show next
function slideRight() {
  reset(); //počitsti vse slike
  sliderImages[current + 1].style.display = "block"; //prikaže sliko, z večjim indexom +1 
  current++; //števec + 1
}

// Left arrow click
arrowLeft.addEventListener("click", function() { //ustvarimo klik fire in funkcijo
  if (current === 0) { //če je current 0
    current = sliderImages.length; //potem je current enak dolžini sliderImagesov, ki je 3
  }
  slideLeft(); // 1. počiti vse slike, prikaže slike z manjšim indexom, števcu odšteje eno
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) { //če je current enak indexu 2
	current = -1; //potem je current -1	
	//če je index [2] kar pomeni zadnja slika, potem števec damo na -1, kar pomeni da fire naredi index [0]
  }
  slideRight();
});

/*POP*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/*PDF*/
var myState = {
  pdf: null,
  currentPage: 1,
  zoom: 1
}

pdfjsLib.getDocument('./my_document.pdf').then((pdf) => {
  myState.pdf = pdf;
  render();
});

function render() {
  myState.pdf.getPage(myState.currentPage).then((page) => {

      var canvas = document.getElementById("pdf_renderer");
      var ctx = canvas.getContext('2d');
      var viewport = page.getViewport(myState.zoom);

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({
          canvasContext: ctx,
          viewport: viewport
      });
  });
}

document.getElementById('go_previous').addEventListener('click', (e) => {
  if(myState.pdf == null || myState.currentPage == 1) 
    return;
  myState.currentPage -= 1;
  document.getElementById("current_page").value = myState.currentPage;
  render();
});

document.getElementById('go_next').addEventListener('click', (e) => {
  if(myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages) 
     return;
  myState.currentPage += 1;
  document.getElementById("current_page").value = myState.currentPage;
  render();
});

document.getElementById('current_page').addEventListener('keypress', (e) => {
  if(myState.pdf == null) return;

  // Get key code
  var code = (e.keyCode ? e.keyCode : e.which);

  // If key code matches that of the Enter key
  if(code == 13) {
      var desiredPage = 
      document.getElementById('current_page').valueAsNumber;
                        
      if(desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
          myState.currentPage = desiredPage;
          document.getElementById("current_page").value = desiredPage;
          render();
      }
  }
});

document.getElementById('zoom_in').addEventListener('click', (e) => {
  if(myState.pdf == null) return;
  myState.zoom += 0.5;
  render();
});

document.getElementById('zoom_out').addEventListener('click', (e) => {
  if(myState.pdf == null) return;
  myState.zoom -= 0.5;
  render();
});


