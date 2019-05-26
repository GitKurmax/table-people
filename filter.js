function filter() {
  const nameInput = document.forms['filter'].querySelector('.filter__input');
  const buttonFilter = document.forms['filter'].querySelector('.show_filtered');
  const buttonShowAll = document.forms['filter'].querySelector('.show_full');

  markACell();

  buttonShowAll.addEventListener('click', function(event) {
    event.preventDefault();
    const table = document.querySelector('.people').querySelector('table');
    const rows = table.rows;
    for(let row of rows) {
      row.style.display = 'table-row';
    }
  });
  
  buttonFilter.addEventListener('click', function(event) {
    const table = document.querySelector('.people').querySelector('table');
    const tableBody = table.querySelector('tbody');
    event.preventDefault();
    let personName = nameInput.value;
    let filterBy = document.forms['filter'].querySelector('input[type="radio"]:checked').value;
    let rows = tableBody.rows;
      if(filterBy === 'name') {
        for (let row of rows) {
          if (row.cells[1].innerText !== personName) 
          row.style.display = 'none';
        }
      }
      if(filterBy === 'mother') {
        for (let row of rows) {
          if (row.cells[7].innerText !== personName) 
          row.style.display = 'none';
        }
      }
      if(filterBy === 'father') {
        for (let row of rows) {
          if (row.cells[8].innerText !== personName) 
          row.style.display = 'none';
        }
      }
      nameInput.value = '';
  });
};



function markACell() {
  const table = document.querySelector('.people').querySelector('table');
  const tableBody = table.querySelector('tbody');
  tableBody.addEventListener('click', function(event) {
      if (event.target.tagName === 'TD') {
      let tdCollection = tableBody.querySelectorAll('td');
      for (let td of tdCollection) {
        if (td === event.target || !event.target.dataset.selectable) {
          continue;
        }
        td.classList.remove('selected');
      }
      if (event.target.dataset.selectable) {
        event.target.classList.toggle('selected');
      }
    }
  });
}

filter();
