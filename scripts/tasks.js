const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

function createTaskItem(task) {
  const item = document.createElement("article");
  item.className = "task-item";

  const title = document.createElement("h2");
  title.textContent = task.title;
  item.append(title);

  const metadata = document.createElement("div");
  metadata.className = "task-meta";

  if (task.deadline) {
    const deadline = document.createElement("span");
    deadline.textContent = `Due ${new Date(`${task.deadline}T00:00:00`).toLocaleDateString()}`;
    metadata.append(deadline);
  }

  if (task.context) {
    const context = document.createElement("span");
    context.textContent = `For ${task.context}`;
    metadata.append(context);
  }

  const priority = document.createElement("span");
  priority.className = "task-priority";
  priority.textContent = `${task.priority || "medium"} priority`;
  metadata.append(priority);
  item.append(metadata);

  if (task.subtasks?.length) {
    const subtasks = document.createElement("ul");
    subtasks.className = "task-subtasks";
    task.subtasks.forEach((subtask) => {
      const entry = document.createElement("li");
      entry.textContent = subtask;
      subtasks.append(entry);
    });
    item.append(subtasks);
  }

  return item;
}

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Tasks could not be loaded.");
    }

    const tasks = await response.json();
    emptyState.hidden = tasks.length > 0;
    taskList.replaceChildren(...tasks.map(createTaskItem));
  } catch (error) {
    emptyState.hidden = true;
    const message = document.createElement("p");
    message.className = "task-error";
    message.textContent = `${error.message} Make sure the Todo server is running.`;
    taskList.replaceChildren(message);
  }
}

loadTasks();