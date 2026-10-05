
async function tasks() {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();

    const taskList = document.getElementById('task-list');
    const empty = document.querySelector('.pic');
   if(tasks.length>0){
     console.log(tasks);
     taskList.style.display='flex';
     empty.style.display='none';
   const taskbox=document.querySelector('.task-box')
   tasks.forEach(task => {
    const box=taskbox.cloneNode(true)
    const title=box.querySelector('.about-head h1')
    const date=box.querySelector('.about-head p')
    const prio=box.querySelector('.prio')
    const priotext=box.querySelector('.prio h2')
    const priocircle=box.querySelector('.prio-circle')
    const state=box.querySelector('.state')
    const statetext=box.querySelector('.state h2')
    const statecircle=box.querySelector('.state-circle')
    const category=box.querySelector('.category')
    const comp=box.querySelector('.complete')
    const del=box.querySelector('.delete')

    title.textContent=task.title
    date.textContent=task.date
    priotext.textContent=task.priority
    statetext.textContent=task.status
    category.textContent=task.category

  if(task.priority==="high"){
        priocircle.style.fill='#B86B6B'
        priocircle.style.color='#B86B6B'
        prio.style.background='#F5E6E6'
        priotext.style.color='#B86B6B'
      }else if(task.priority==="medium"){
        priocircle.style.fill='#C49A5A'
        priocircle.style.color='#C49A5A'
        prio.style.background='#F6EFDF'
        priotext.style.color='#C49A5A'
      }else{
        priocircle.style.fill='#7895A5'
        priocircle.style.color='#7895A5'
        prio.style.background='#E7EEF1'
        priotext.style.color='#7895A5'
      }


       if(task.status==="done"){
        statecircle.style.fill='#7A9E7E'
        statecircle.style.color='#7A9E7E'
        state.style.background='#EAF1EA'
        statetext.style.color='#7A9E7E'
      }else if(task.status==="in progress"){
        statecircle.style.fill='#C49A5A'
        statecircle.style.color='#C49A5A'
        state.style.background='#F6EFDF'
        statetext.style.color='#C49A5A'
      }else{
        statecircle.style.fill='#6B7280'
        statecircle.style.color='#6B7280'
        state.style.background='#F3F4F6'
        statetext.style.color='#6B7280'
      }
        comp.addEventListener('click',()=>{
        comp.classList.toggle('completed')
      })
         del.addEventListener('click',()=>{
        del.classList.toggle('deleted')
      })
      
      taskList.appendChild(box)
    

    
   });
    
    
     taskbox.style.display='none'
     }else{  
        taskList.style.display='none';
        empty.style.display='flex';
    }
}
tasks();
