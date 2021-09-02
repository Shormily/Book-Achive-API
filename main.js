const error = document.getElementById('error-messsage');
// search error
const erorr = message =>{
    error.innerText = message;
}
 const searchbook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value ='';
    const url = ` https://openlibrary.org/search.json?q=${searchText}`
   
    //console.log(url);
    fetch(url)
     .then(res => res.json())
     .then(data => {
        if (searchField.value === '') {
            erorr('Please search by valid book name.')
            
        }
       
        if (data.numFound === 0) {
            const searchResult = document.getElementById('search-result');
            searchResult.innerHTML = '';
            erorr('Result not found.')
        } else {
        
                displaySearchResult(data.docs);
                erorr('')
                error.innerText = '';
            

           
        }
     });
 

 }
 
 const displaySearchResult = books => {
    //  console.log(books);
     const searchResult = document.getElementById('search-result');
    books.forEach(book => {
        console.log(book)
        const url = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = ` <div class="card h-100">
        <img src="${url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
         <p>Author: ${book.authour_name ? book.authour_name[0] : ''}</p>
         <p>Publishar: ${book.publisher ? book.publisher[0] : ''}</P>
        </div>
        <div class="card-footer">
          <small class="text-muted">First Publish: ${book.first_publish_year ? book.first_publish_year : ''}</small>
        </div>
      </div>`
      searchResult.appendChild(div);
    });

    
 }
 
