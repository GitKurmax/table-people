function add() {
  const table = document.querySelector('.people').querySelector('table');
  const form = document.forms['add_people'];
  form.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault();
      if(validate(form)){
        addPerson(ANCESTRY_FILE, form);
        markACell();
        sort();
      }
    }
  });
}

function addPerson(peopleList, form) {
  let person = {};
  const container = document.querySelector('.people');
  const table = container.querySelector('.people__table')
  person["name"] = form.querySelector('.name').value;
  person["sex"] = form.querySelector('input[type="radio"]:checked').value;
  person["born"] = form.querySelector('.born__input').value;
  person["died"] = form.querySelector('.die__input').value;
  person["mother"] = form.querySelector('.mother__input').value;
  person["father"] = form.querySelector('.father__input').value;
  peopleList.push(person);
  container.removeChild(table);
  showPeople(document.querySelector('.people'), peopleList);
}

function validate(form) {
  const name = form.querySelector('.name');
  const father = form.querySelector('.father__input');
  const mother = form.querySelector('.mother__input');
  const checked = form.querySelector('input[type="radio"]:checked');
  let valid = +checkCheckbox(checked) + +checkBornDied(form) + +checkName(name) + +checkName(father) + +checkName(mother);

  return valid === 5;
}

function checkName(nameElement) {
  const nameArray = nameElement.value.trim().split(/\s+/);
  const notWord = /[^a-z]+/i;
  let checked;

  if (nameArray.length === 1 && nameArray[0] === '' && !nameElement.classList.contains("name")){
    nameElement.style.backgroundColor = 'lightgreen';
    nameElement.setAttribute('data-validation', 'valid');
    return true;
  }

  for (let i = 0; i < nameArray.length; i++){
    let item = nameArray[i];
    if (notWord.test(item) || (nameArray.length < 2 || nameArray.Length > 3)) {
      nameElement.style.backgroundColor = '#ff4747';
      nameElement.setAttribute('data-validation', 'invalid');
     return false;
    } else {
      nameElement.style.backgroundColor = 'lightgreen';
      nameElement.setAttribute('data-validation', 'valid');
      checked = true;
    }
  }
  return checked;
}

function checkCheckbox(checkedBox) {
  if(!checkedBox) {
    alert('Choose sex please');
    return false;
  }
  return true;
}

function checkBornDied(form) {
  const born = form.querySelector('.born__input');
  const died = form.querySelector('.die__input');
  const age = +died.value - +born.value;

  if (isNaN(born.value) || isNaN(died.value) || age > 150 || age < 0 || !born.value || !died.value) {
    alert('Enter valid dates please');
    return false;
  }
  return true;
}

add();