
async function tasks() {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();

    const taskList = document.getElementById('task-list');
    const empty = document.querySelector('.pic');
   if(tasks.length>0){
    console.log('There are tasks');
console.log(tasks);
     taskList.style.display='flex';
     empty.style.display='none';
     const title=document.querySelector('#title-date h1')
     const date=document.querySelector('#title-date p')
     const prio=document.getElementById('prio')
    const priotext=document.querySelector('#prio h2')
    const state=document.getElementById('state')
     const statetext=document.querySelector('#state h2')
     const prioCircle=document.querySelector('#prio-circle')
     const stateCircle=document.querySelector('#state-circle')
    console.log('title:', title);
console.log('date:', date);
console.log('priotext:', priotext);
console.log('statetext:', statetext);
console.log('prioCircle:', prioCircle);
console.log('stateCircle:', stateCircle);
     let i=0;
     do{
      if(tasks[i].priority==='high'){
        prioCircle.style.fill='#B86B6B'
        prio.style.background='#F5E6E6'
        priotext.style.color='#B86B6B'
      }else if(tasks[i].priority==='medium'){
        prioCircle.style.fill='#C49A5A'
        prio.style.background='#F6EFDF'
        priotext.style.color='#C49A5A'
      }else{
        prioCircle.style.fill='#7895A5'
        prio.style.background='#E7EEF1'
        priotext.style.color='#7895A5'
      }


      if(tasks[i].status==='done'){
        stateCircle.style.fill='#7A9E7E'
        state.style.background='#EAF1EA'
        statetext.style.color='#7A9E7E'
      }else if(tasks[i].status==='in-progress'){
        stateCircle.style.fill='#C49A5A'
        state.style.background='#F6EFDF'
        statetext.style.color='#C49A5A'
      }else{
        stateCircle.style.fill='#6B7280'
        state.style.background='#F3F4F6'
        statetext.style.color='#6B7280'
      }
      i++
        title.textContent=tasks[i].title;
      date.textContent=tasks[i].date;
      priotext.textContent=tasks[i].priority;
      statetext.textContent=tasks[i].status;
      console.log('UI updated');

     }while(i<tasks.length-1)

     }else{  
        taskList.style.display='none';
        empty.style.display='flex';
    }
}
tasks();
