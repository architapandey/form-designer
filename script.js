const formContainer = document.getElementById("formContainer");

// Sample JSON data
const formData = [];

// Enable drag and drop for form elements
formContainer.addEventListener("dragstart", handleDragStart);
formContainer.addEventListener("dragover", handleDragOver);
formContainer.addEventListener("drop", handleDrop);

// Function to create a form element
function createFormElement(elementData) {
  const formElement = document.createElement("div");
  formElement.className = "formElement";
  formElement.setAttribute("data-id", elementData.id);
  formElement.setAttribute("draggable", "true"); // Enable draggable attribute

  const elementHeader = document.createElement("div");
  elementHeader.className = "elementHeader";

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deleteElement(formElement));

  // Label
  const label = document.createElement("div");
  label.innerText = elementData.type;

  elementHeader.appendChild(label);
  elementHeader.appendChild(deleteButton);

  formElement.appendChild(elementHeader);

  // Add element based on type
  if (elementData.type === "Input") {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", elementData.placeholder);
    formElement.appendChild(input);
  } else if (elementData.type === "Select") {
    const select = document.createElement("select");
    elementData.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.text = option;
      select.add(optionElement);
    });
    formElement.appendChild(select);
  } else if (elementData.type === "Textarea") {
    const textarea = document.createElement("textarea");
    textarea.setAttribute("placeholder", elementData.placeholder);
    formElement.appendChild(textarea);
  }

  formContainer.appendChild(formElement);
}

// Function to save and log form data
function saveForm() {
  console.log(formData);
}

// Drag and drop handlers
let draggedElement = null;

function handleDragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.effectAllowed = "move";
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const targetElement = event.target.closest(".formElement");

  if (targetElement && draggedElement !== targetElement) {
    const targetIndex = Array.from(formContainer.children).indexOf(
      targetElement
    );
    const draggedIndex = Array.from(formContainer.children).indexOf(
      draggedElement
    );

    if (targetIndex > draggedIndex) {
      formContainer.insertBefore(draggedElement, targetElement.nextSibling);
    } else {
      formContainer.insertBefore(draggedElement, targetElement);
    }
  }

  draggedElement = null;
}

// Function to add form elements dynamically
function addElement(type) {
  const newElement = {
    id: formData.length + 1,
    type: type,
    label: "Sample Label",
    placeholder: "Sample Placeholder",
    options: getDefaultOptions(type),
  };
  formData.push(newElement);
  createFormElement(newElement);
}

// Function to get the default options for a given type
function getDefaultOptions(type) {
  return type === "Select"
    ? ["Sample Option 1", "Sample Option 2", "Sample Option 3"]
    : null;
}

function deleteElement(element) {
  const elementId = element.getAttribute("data-id");
  const elementIndex = formData.findIndex((data) => data.id === elementId);

  if (elementIndex !== -1) {
    formData.splice(elementIndex, 1);
    formContainer.removeChild(element);
  }
}
