document.addEventListener('DOMContentLoaded', () => {

   // Global variables.
   const page = document.querySelector('.page');
   const studentItems = document.querySelectorAll('.student-item');
   const studentsPerPage = 10;
   let firstPage = 1;

   // The function displays a maximum of 10 students per page.
   const showPage = (list, pageNum) => {
      for (let i = 0; i < list.length; i++) {
         if(i >= (pageNum * studentsPerPage) - studentsPerPage && i < (pageNum * studentsPerPage)){
            list[i].style.display = 'block';
         } else {
            list[i].style.display = 'none';
         }
      }
   }

   // The function creates pagination buttons and adds them to the DOM, and adds their functionality.
   const appendPageLinks = (list) => {
      let totalPages = Math.ceil(list.length / studentsPerPage);
      const paginationDiv = document.createElement('div');
      const ul = document.createElement('ul');
      page.appendChild(paginationDiv);
      paginationDiv.appendChild(ul);
      paginationDiv.className = 'pagination';
      
      // The loop creates and appends the appropriate number of buttons depending on the amount of total pages.
      for (let i = 1; i <= totalPages; i++) {
         let li = document.createElement('li');
         let a = document.createElement('a');
         a.textContent = i;
         a.href = '#'
         ul.appendChild(li);
         li.appendChild(a);
      }

      /* The if statement determines that the first anchor objects gets the class 'active' which makes the pageuser understand
      that they are on the first page */
      if (list.length >= 0) {
         let a = document.querySelectorAll('a');
         a[0].className = 'active';
      }

      /* The event handler controls the display of the students. When an anchor is clicked it will show the relevant page.
      The handler makes sure that the clicked anchor display as active and the loop makes anchors, that are not clickd, inactive. */
      paginationDiv.addEventListener ('click', (e) => {
         if (e.target.tagName === 'A') {
            pageNumber = parseInt(e.target.textContent);
            showPage(list, pageNumber);
            let a = document.querySelectorAll('a');
            for (let i = 0; i < totalPages; i++) {
               a[i].classList.remove('active');
            }
            e.target.className = 'active';
         }
      });
   }

   //The showPage and appendPageLinks functions are called.
   showPage(studentItems, firstPage);
   appendPageLinks(studentItems);

});