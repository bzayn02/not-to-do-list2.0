// Capture the data from the form submit and store the data in an array as object.
// Tasks array
let taskList = [];

// Function to handle on submit
const handleOnSubmit = (e) => {
  // Instantiating formData object
  const formData = new FormData(e);
  const task = formData.get('task');
  const hr = formData.get('hr');

  // Object to store the data
  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type: 'entry',
  };
  taskList.push(taskObj);
  displayTask();
  console.log(taskList);
};

// Function to display data in the browser

// Grabbing the element by ID
const entryElem = document.getElementById('entry');
const displayTask = () => {
  const entryList = taskList.filter((item) => {
    item.type === 'entry';
  });
  let str = '';
  taskList.map((item, i) => {
    str += `   <tr>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteTask('${item.id}')">
        <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-success" onclick="switchTask('{item.id}','bad')">
        <i class="fa-solid fa-arrow-right"></i>
        </button>
        </td>
        </tr>`;
  });
  entryElem.innerHTML = str;
};

// Function to create a unique id

const randomGenerator = (length = 6) => {
  const collection = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

  let str = '';

  for (let i = 0; i < length; i++) {
    const randomNum = Math.round(Math.random() * collection.length - 1);
    str += collection[randomNum];
  }
  return str;
};

//delete item from array based on given id

const deleteTask = (id) => {
  if (window.confirm('Are you sure you want to delete this?')) {
    taskList = taskList.filter((item) => item.id !== id);
  }
  displayTask();
};

// Switch type from entry to bad type or vice versa.

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayTask();
};
