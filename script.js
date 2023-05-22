// Capture the data from the form submit and store the data in an array as object.
// Tasks array
let taskList = [];

// Grabbing the element by ID
const entryElem = document.getElementById('entry');
const badElem = document.getElementById('bad');
const hrsPerWeek = 24 * 7;

// Function to handle on submit
const handleOnSubmit = (e) => {
  // Instantiating formData object
  const formData = new FormData(e);
  const task = formData.get('task');
  const hr = +formData.get('hr');

  // Object to store the data
  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type: 'entry',
  };

  // check if the new task can fit in the available hours per week

  const ttl = totalHours();

  if (ttl + hr > hrsPerWeek) {
    return alert("Sorry, you don't have enough time to fit this week.");
  }

  taskList.push(taskObj);
  totalHours();
  displayTask();
};

// Function to display data in the browser

const displayTask = () => {
  const entryList = taskList.filter((item) => item.type === 'entry');
  let str = '';
  entryList.map((item, i) => {
    str += `   <tr>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteTask('${item.id}')">
        <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-success" onclick="switchTask('${item.id}','bad')">
        <i class="fa-solid fa-arrow-right"></i>
        </button>
        </td>
        </tr>`;
  });
  entryElem.innerHTML = str;
  displayBadTask();
  totalHours();
};

// displaying bad tasks in the browser

const displayBadTask = () => {
  const badList = taskList.filter((item) => item.type === 'bad');

  let str = '';
  badList.map((item, i) => {
    str += `
  <tr>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
        <button class="btn btn-warning" onclick="switchTask('${item.id}','entry')">
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteTask('${item.id}')">
        <i class="fa-solid fa-trash"></i>
        </button>
        </td>
        </tr>
  `;
  });
  badElem.innerHTML = str;

  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);

  document.getElementById('badHrs').innerText = badHrs;
  totalHours();
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
  totalHours();
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

const totalHours = () => {
  const ttlHrs = taskList.reduce((acc, { hr }) => acc + hr, 0);

  document.getElementById('total').innerText = ttlHrs;
  return ttlHrs;
};
