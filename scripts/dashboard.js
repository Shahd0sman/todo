async function getTasks() {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();
    console.log(tasks);

}
getTasks();

async function loadDashboard() {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();
    const total = tasks.length;
    const progress = tasks.filter(task =>
        task.status === 'in progress'
    ).length;
    const high = tasks.filter(task =>
        task.priority === 'high'
    ).length;
    const done = tasks.filter(task =>
        task.status === 'done'
    ).length;
    document.getElementById('total').textContent = total;
    document.getElementById('totalprogress').textContent = progress;
    document.getElementById('totalhigh').textContent = high;
    document.getElementById('totaldone').textContent = done;

    const counting = document.getElementById('counting');
    const emptyState = document.querySelector('.pic');

    if (tasks.length > 0) {
        counting.style.display = 'flex';
        emptyState.style.display = 'none';
    } else {
        counting.style.display = 'none';
        emptyState.style.display = 'flex';
    }
}
loadDashboard();