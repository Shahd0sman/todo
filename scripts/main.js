const plusbtn=document.getElementById('add')
const modal=document.getElementById('modal')
const overlay=document.getElementById('overlay')
const cancel=document.getElementById('cancel')
const add=document.getElementById('add')

plusbtn.addEventListener('click',()=>{
    modal.classList.add('active')
    overlay.classList.add('active')
})
cancel.addEventListener('click',()=>{
  modal.classList.remove('active')
  overlay.classList.remove('active')
})

const sideLinks = document.querySelectorAll('.sidelinks');
const currentPage = window.location.pathname.split('/').pop();
console.log("current page:", currentPage);
sideLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active')
    if (linkPage === currentPage) {
      console.log("link:", linkPage);
        link.classList.add('active');
    }

});


  
