function fetchFavs(){
    fetch('http://localhost:8800/getFavourites')
          .then(response => response.json())
          .then(data => {
            const showfavsDiv = document.getElementById('showfavs');
            if (data && data.length > 0) {
              data.forEach(favorite => {
                showfavsDiv.innerHTML += `
                  <div class="card">
                    <img src="${favorite.poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${favorite.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><b>Type: </b> ${favorite.type}</li>
                      <li class="list-group-item"><b>Year: </b> ${favorite.year}</li>
                    </ul>
                  </div>
                `;
              });
            } else {showfavsDiv.innerHTML = '<p>No favorites found.</p>'}
          })
          .catch(err => {console.log('Error', error);
            document.getElementById('showfavs').innerHTML = '<p>Error fetching favorites.</p>';
          });
}
fetchFavs();