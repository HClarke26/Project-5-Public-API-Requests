

let users = []; 
const url = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob&noinfo &nat=GB`;
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card')


fetch(url)
  .then(res => res.json())
  .then(res => displayUsers(res.results))
  .catch(err => console.log(err));

  
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
  }


//modal

// create function to generate modal

function generateModal(index){
    const {name, dob, phone, email, location :{city, street, state, postcode}, picture} = users[index];
    // I need to use object destructering to access the info
    // I need to convert phone number and DOB to correc format. Probably create serperate functions and call them here? 

    // I need to create the html and use the index for the relevant info 
    const modalHTML = `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div> 
                `;
//to insert the html
    document.body.insertAdjacentHTML('beforeend', modalHTML)

//event listeners for clicking a card and clicking x button

gallery.addEventListener('click', (e) => { 
   //an event listener where i will call the gernerateModal function to display the modal
    generateModal()

})
};
