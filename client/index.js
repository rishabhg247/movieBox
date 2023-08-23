function myfunc() {
    let val = document.getElementById("searchValue").value;
    fetchdata(val)
}

function fetchdata(val) {
    fetch(`https://omdbapi.com/?s=${val}&apikey=40979902&page=1`)
        .then((data) => {return data.json()})
        .then((data) => {
            console.log(data.Search)
            if (data.Search == undefined) {
                document.getElementById("print").innerHTML = "No Results Found"
            } else {
                document.getElementById("print").innerHTML = data.Search.map((data, index) =>
                `
                <div class="card" >
                    <img src="${data.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.Title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Type: </b> ${data.Type}</li>
                        <li class="list-group-item"><b>Year: </b> ${data.Year}</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link btn btn-primary" onclick="Favorite('${data.Poster}', '${data.Title}', '${data.Year}', '${data.Type}')">Add to Favorite</a>
                    </div>
                </div>
                `
            ).join("");

            }
        })
        .catch((err) => {console.log(err)})
}

function Favorite(image, movie, year, type) {
    console.log("database");
    const favoriteData = {
        title: movie,
        year: year,
        type: type,
        poster: image
    };
    fetch('http://localhost:8800/addMovie', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(favoriteData)
    })
    .then(response => response.json())
    .then(data => {window.location.href = 'favorites.html';setTimeout(()=>{alert(data.message)},[2000])})
    .catch(error => {
        console.error('Error adding movie:', error);
    });
}
