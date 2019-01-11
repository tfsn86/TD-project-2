document.addEventListener('DOMContentLoaded', () => {
  
  const studentItems = document.querySelectorAll('.student-item');
  let searchResults = Array.prototype.slice.call(document.querySelectorAll(".student-item"));
  let numberOfStudents = studentItems.length;
  const pageHeadDiv = document.querySelector('.page-header');
  const studentsPerPage = 10;
  const startPage = 1;
  const numberOfPages = Math.ceil(numberOfStudents/studentsPerPage);
  const page = document.querySelector('.page');



  /* The showpage function displays 10 students per page. The function parameters takes a list (an array of students),
  a selected page and the number of students to be displayed on each page. */
  const showPage = (list, selectedPage, studentsPerPage) => {
      hideStudents(list);
      for(i = selectedPage*studentsPerPage - studentsPerPage; i < selectedPage * studentsPerPage && i < list.length; i++) {
          list[i].style.display = 'block';
      }
  };

  const hideStudents = (list) => {
    if (numberOfStudents > studentsPerPage) {
      for(i = 0; i < numberOfStudents; i++) {
        list[i].style.display = 'none';
      }
    }
  };

  // The function call displays the first page.
  showPage(studentItems, startPage, studentsPerPage);

  /* The appendPageLinks function generates, append, and adds functionality
  to the pagination buttons. The pagination event handler controls the page selection. */
  const appendPageLinks = () => {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    page.appendChild(pagination);
    const numberOfPages = Math.ceil(numberOfStudents / studentsPerPage);
    const paginationBtnUl = document.createElement('ul');
    pagination.appendChild(paginationBtnUl);
    for (i = 0; i < numberOfPages; i++) {
      let pagiButtonLi = document.createElement('li');
      let pagiButtonA = document.createElement('a');
      pagiButtonA.href = '#';
      pagiButtonA.textContent = i+1;
      pagiButtonLi.appendChild(pagiButtonA);
      paginationBtnUl.appendChild(pagiButtonLi);
    }
    pagination.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
        let selectedPage = e.target.textContent;
        showPage(searchResults, selectedPage, studentsPerPage)
        let paginationLinks = document.querySelectorAll('.pagination a');
        for (i=0; i<paginationLinks.length; i++){
          paginationLinks[i].classList.remove('active');
        }
        e.target.className = 'active';
      }
    });
  }

  appendPageLinks();

  // The createMessage and removeMessage function makes the user aware that no search results were found.
  const createMessage = () => {
    const div = document.createElement('div');
    div.className = 'search-message';
    const h2 = document.createElement('h2');
    h2.textContent = 'Sorry...'
    const p = document.createElement('p');
    p.textContent = 'No results.'
    insertAfter(div, pageHeadDiv);
    div.appendChild(h2);
    div.appendChild(p)
  }

  const removeMessage = () => {
    const searchMessage = document.querySelector('.search-message');
    searchMessage.parentNode.removeChild(search-message);
  }

  /* The search searchStudents function takes the input value and checks to see if it matches
  the name values stored in the students variable. */
    const searchStudents = () => {
      let filterValue;
      filterValue = document.querySelector('INPUT').value.toUpperCase();
      students = document.querySelectorAll(".student-details h3");
      for (let i=0; i<students.length; i++) {
        studentName = students[i].textContent;
        if (studentName.toUpperCase().indexOf(filterValue) > -1) {
          students[i].parentNode.parentNode.style.display= 'block';
        } else {
          students[i].parentNode.parentNode.style.display= 'none';
        }
      }
      updatePagination();
      showPage(searchResults, 1, studentsPerPage);
      if (searchResults.length === 0 && document.querySelector('.search-message') === null) {
        createMessage();
      }
      if (searchResults.length > 0 && document.querySelector('.search-message') !== null) {
        removeMessage();
      }
    }

  /*
  The following code adds search input and attaches event handlers.
  */
  const insertAfter = (el, referenceNode) => {
      referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  }

  var ref = document.querySelector('div.before');

  const createSearch = () => {
      const div = document.createElement('div');
      const pageHeadDiv = document.querySelector('.page-header');
      div.className = 'student-search';
      const searchInput = document.createElement('input');
      searchInput.placeholder = 'Search for students..';
      pageHeadDiv.appendChild(div);
      div.appendChild(searchInput)
      const searchBtn = document.createElement('button');
      searchBtn.textContent = 'Search';
      insertAfter(searchBtn, searchInput)
      const search = document.querySelector('BUTTON');
      const input = document.querySelector('INPUT');
      search.addEventListener('click', searchStudents);
      input.addEventListener('keyup', searchStudents);
  }

  createSearch();

  // The updatePagniation function clears and updates current users being displayed.
  const updatePagination = () => {
    searchResults = [];
    numberOfStudents = 0;
    page.removeChild(page.childNodes[07]);
    for (i = 0; i < studentItems.length; i++) {
        if(studentItems[i].style.display === 'block') {
        searchResults.push(studentItems[i]);
        numberOfStudents += 1;
      }
    }
    appendPageLinks();
  }

});