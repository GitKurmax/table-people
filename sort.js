function sort() {
  let table = document.querySelector('.people__table');
  
  table.addEventListener('click', function(event) {
    let id = 1;
    let arr = [];
    let tbody = this.querySelector('tbody');
    let rowsCollection = tbody.rows;
  
    if (event.target.tagName === 'TH') {
      arr.push(...rowsCollection);
      
      if (event.target.innerText === 'AGE' || event.target.innerText === 'BORN' || event.target.innerText === 'DIED') {
        arr.sort((n1, n2) => n1.cells[event.target.cellIndex].innerHTML - n2.cells[event.target.cellIndex].innerHTML);
      } else if (event.target.innerText === 'NAME') {
        arr.sort((n1, n2) => {
          if (n1.cells[event.target.cellIndex].innerHTML > n2.cells[event.target.cellIndex].innerHTML){
            return 1;
          } else {
            return -1;
          }
        });
      }
      arr.forEach((row) => {
        row.cells[0].innerText = id;
        id++;
      });
      tbody.append(...arr);
    }
  });
}

sort();