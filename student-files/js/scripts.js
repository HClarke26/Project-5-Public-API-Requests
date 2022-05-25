/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 */

let users = []; 
const url = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob&noinfo &nat=US`;
const gallery = document.getElementById('gallery');

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

fetch(url)
  .then(res => res.json())
  .then(res => displayUsers(res.results))
  .catch(err => console.log(err));


// ------------------------------------------
//  CREATE EMPLOYEE CARDS 
// ------------------------------------------

function displayUsers(userData) {
    users = userData;
    let userHTML = '';

    userData.forEach((user, index) => {
      const name = user.name;
      const email = user.email;
      const city = user.location.city;
      const picture = user.picture;

      userHTML += `
        <div class="card" data-index=${index}>
          <div class="card-img-container">
            <img class="card-img" src="${picture.medium}" alt=profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
              <p class="card-text">${email}</p>
              <p class="card-text cap">${city}</p>
            </div>
          </div>
      `;
    });

    gallery.insertAdjacentHTML('beforeend', userHTML); 
  };


// ------------------------------------------
//  CREATE EMPLOYEE MODAL
// ------------------------------------------

function generateModal(index){
    const {name, dob, phone, email, location :{city, street, state, postcode}, picture} = users[index];
    const newFormatPhone = phone.replace(/-/,' ');  
    let date = new Date(dob.date);

    const modalHTML = `
    <div class="modal-container">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${newFormatPhone}</p>
            <p class="modal-text">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
            <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalClose = document.getElementById('modal-close-btn'); 


// ------------------------------------------
//  EVENT LISTENER
// ------------------------------------------

modalClose.addEventListener('click', e =>{
  document.body.removeChild(document.body.lastElementChild);
});
};

gallery.addEventListener('click', (e) => { 
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    currentModalIndex = index;
    generateModal(currentModalIndex)
    });
