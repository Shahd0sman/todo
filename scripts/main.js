const addTask=document.getElementById('add')
const taskModal = document.getElementById("taskModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskInput = document.getElementById("taskInput");
const subtasksBtn = document.getElementById("subtasksBtn");
const subtaskList = document.getElementById("subtaskList");
const deadlineInput = document.getElementById("deadline");
const taskContextInput = document.getElementById("taskContext");
const priorityButtons = document.querySelectorAll(".priority-btn");
let selectedPriority = "medium";

priorityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPriority = button.dataset.priority;
    priorityButtons.forEach((priorityButton) => {
      const isSelected = priorityButton === button;
      priorityButton.classList.toggle("selected", isSelected);
      priorityButton.setAttribute("aria-pressed", isSelected);
    });
  });
});

function resetTaskForm() {
  taskInput.value = "";
  subtaskList.replaceChildren();
  subtasksBtn.setAttribute("aria-expanded", "false");
  deadlineInput.value = "";
  taskContextInput.value = "";
  selectedPriority = "medium";
  priorityButtons.forEach((button) => {
    const isMedium = button.dataset.priority === "medium";
    button.classList.toggle("selected", isMedium);
    button.setAttribute("aria-pressed", isMedium);
  });
}

addTask.addEventListener('click',()=>{
    taskModal.style.display='flex'
    taskInput.focus()
})
cancelBtn.addEventListener("click", () => {
  taskModal.style.display = "none";
  resetTaskForm();
});

saveTaskBtn.addEventListener("click", () => {
  const task = taskInput.value;

  if (task.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const taskDetails = {
    title: task.trim(),
    subtasks: [...subtaskList.querySelectorAll(".subtask-input")]
      .map((input) => input.value.trim())
      .filter(Boolean),
    deadline: deadlineInput.value,
    priority: selectedPriority,
    context: taskContextInput.value
  };

  console.log(taskDetails);

  taskModal.style.display = "none";
  resetTaskForm();
});
subtasksBtn.addEventListener("click", () => {
  const subtaskRow = document.createElement("div");
  subtaskRow.className = "subtask-row";

  const subtaskInput = document.createElement("input");
  subtaskInput.type = "text";
  subtaskInput.className = "subtask-input";
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-subtask";
  removeButton.textContent = "x";
  removeButton.setAttribute("aria-label", "Remove subtask");
  removeButton.addEventListener("click", () => {
    subtaskRow.remove();
    updateSubtaskLabels();
  });

  subtaskRow.append(subtaskInput, removeButton);
  subtaskList.append(subtaskRow);
  updateSubtaskLabels();
  subtasksBtn.setAttribute("aria-expanded", "true");
  subtaskInput.focus();
});

function updateSubtaskLabels() {
  subtaskList.querySelectorAll(".subtask-input").forEach((input, index) => {
    input.placeholder = `Subtask ${index + 1}...`;
    input.setAttribute("aria-label", `Subtask ${index + 1}`);
  });
}