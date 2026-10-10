const plusbtn=document.getElementById('add')
const modal=document.getElementById('modal')
const overlay=document.getElementById('overlay')
const cancel=document.getElementById('cancel')
const add=document.getElementById('addtask')
const subtaskbtn=document.getElementById('subtasks-btn')
const subtaskbox=document.querySelector('.subtasks')


plusbtn.addEventListener('click',()=>{
    modal.classList.add('active')
    overlay.classList.add('active')
})
cancel.addEventListener('click',()=>{
  modal.classList.remove('active')
  overlay.classList.remove('active')
})
//ai
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
//bymyself
const maxsub=7
subtaskbtn.addEventListener('click',()=>{
  const current =subtaskbox.querySelectorAll('input').length
  if(current>=maxsub){
    return
  }
  const input=document.createElement('input')
  input.type='text'
  input.placeholder=`subtask${current+1}`
  subtaskbox.appendChild(input)
})
  
const subtasksinp=subtaskbox.querySelectorAll('input')
const subtasks=Array.from(subtasksinp).map(input=>input.value.trim()).filter(value=>value!=='')


const prioritybtns=document.querySelectorAll('.p')
let selectedp=''
prioritybtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
   prioritybtns.forEach(btn=>{
    btn.classList.remove('active')
   })
      btn.classList.add('active')
       selectedp=btn.value
       console.log(selectedp)

  })
})
const statusbtns=document.querySelectorAll('.s')
    let selecteds=''

statusbtns.forEach(btn=>{

  btn.addEventListener('click',()=>{
   statusbtns.forEach(btn=>{
    btn.classList.remove('active')
   })
      btn.classList.add('active')
      selecteds=btn.value
      console.log(selecteds)

  })
})

subtaskbtn.addEventListener('click',()=>{
  subtaskbox.style.display='flex'
})


add.addEventListener('click',async()=>{
    const title=document.getElementById('title').value
    const date=document.getElementById('date').value
    const category=document.getElementById('category').value

    const taskdetails={
      title:title,
      date:date,
      category:category,
      priority:selectedp,
      status:selecteds,
      subtasks:subtasks
    }
    console.log(taskdetails)
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{ 'Content-Type': 'application/json'},
      body:JSON.stringify(taskdetails)
    })
    console.log('done')
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        showPopup('task added successfully!');
    }
})


