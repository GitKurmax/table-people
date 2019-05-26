let headNames = ['id','name','sex','born','died','age','century','mother','father','children'];

function showPeople(element, people) {  
  createTable(".people", people);
  bornBefore(".people", 1650, 1800);
}

function createTable(containerClass, element) {
  let container = document.querySelector(containerClass);
  container.insertAdjacentHTML('afterbegin', '<table class="people__table"></table>');
  let table = container.querySelector('table');
  createHead(table);
  createBody(table, element);
}

function createHead(table) {
  let head = table.createTHead();
  let row = head.insertRow();
  headNames.forEach((item) => row.insertAdjacentHTML('beforeend', `<th>${item}</th>`));
}

function createBody(table, element) {
  let body = table.createTBody('tbody');
  for(let i = 0; i < element.length; i++) {
    let tr = body.insertRow();
    headNames.forEach((item) => {
      let td = tr.insertCell(-1);
      fillCell(td, item, element, i);
    });
  }
}

function fillCell(cell, headColumnName, element, count) {
  switch (headColumnName) {
    case 'id': 
      cell.innerText = count + 1;
      break;
    case 'age': 
      cell.innerText = element[count].died - element[count].born;
      cell.setAttribute('data-selectable', 'true');
      if (cell.innerText > 65) {
        cell.parentElement.style.border = '2px solid green';
      }
      break;
    case 'century': 
      cell.innerText = Math.ceil(element[count]['died']/100);
      cell.setAttribute('data-selectable', 'true');
      if (cell.innerText === '17') {
        cell.parentElement.classList.add('person--lived-in-17');
      }
      break;
    case 'children': 
      cell.insertAdjacentHTML('afterbegin', children(element, element[count]));
      if (cell.children.length) {
        if (cell.parentElement.cells[2].innerText === 'm') {
         cell.parentElement.classList.add('person--father');
        } else {
          cell.parentElement.classList.add('person--mother');
        }
      }
      break;
    case 'sex':
      cell.innerText =element[count][headColumnName];
      if (element[count]['sex'] === 'm') {
        cell.classList.add('person--male');
      }
      else {
        cell.parentElement.classList.add('person--female');
      }
      break;
    case 'name':
      cell.innerText =element[count][headColumnName];
      cell.setAttribute('data-selectable', 'true');
      break;
    default: 
      cell.innerText =element[count][headColumnName];
  }
}

function children(element, person) {
  let arrChildren = [];
  let name = person['name'];
  let sex = person['sex'];
    for(let j = 0; j < element.length; j++) {
      if(sex === 'm'){
        if(name === element[j]['father']) {
          arrChildren.push(`<span>${element[j]['name']}</span>`);
        }
      } else if (sex === 'f') {
        if(name === element[j]['mother']) {
          arrChildren.push(`<span>${element[j]['name']}</span>`);
        }
      }
    }
    return arrChildren.join(', ');
}

function bornBefore(tableContainerClass, yearBorn, yearDie) {
  let table = document.querySelector(tableContainerClass).querySelector('table');
  let arrayPeopleBornBefore = [];
  let arrayPeopleDieAfter = [];
  let persons = table.rows; 
  for (let person of persons) {
    if (person.cells[3].innerText < yearBorn) {
      person.cells[1].style.textDecoration = 'line-through';
      arrayPeopleBornBefore.push(person.cells[1].innerText);
    }
    if (person.cells[4].innerText > yearDie) {
      person.cells[1].style. fontWeight = 'bold';
      arrayPeopleDieAfter.push(person.cells[1].innerText);
    }
  }
markChildren(persons, arrayPeopleBornBefore, arrayPeopleDieAfter);
}

function markChildren(personsList, arrayPeopleBornBefore, arrayPeopleDieAfter) {
  let childrenList = [];
  for (let i = 0; i < personsList.length; i++) {
    let personChildren = personsList[i].cells[personsList[i].cells.length - 1].querySelector('span');
    if(personChildren){
      childrenList.push(personChildren);
    }
  }

  arrayPeopleBornBefore.forEach((personName) => {
    childrenList.forEach((child) => {
      let childName = child.innerText;
      if(childName === personName) {
        child.style.textDecoration = 'line-through';
      }
    });
  });

  arrayPeopleDieAfter.forEach((personName) => {
    childrenList.forEach((child) => {
      let childName = child.innerText;
      if(childName === personName) {
        child.style.fontWeight = 'bold';
      }
    });
  });
}
  
showPeople(document.querySelector('.people'), ANCESTRY_FILE);