let breeds = [];

document.addEventListener("DOMContentLoaded", event => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = "https://dog.ceo/api/breeds/list/all"

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const fetchImage = imgUrl =>{
        return fetch(imgUrl).then(resp => resp.json()).then(json => renderImg(json));
    }

    const fetchBreeds = breedUrl =>{
        return fetch(breedUrl).then(resp => resp.json()).then(json => renderBreeds(json['message']));
    }

    const renderImg = json =>{
        let imgContainer = document.getElementById('dog-image-container');
        json['message'].forEach(imageUrl => {
            let newImg = document.createElement('img');
            newImg.src = imageUrl;
            imgContainer.appendChild(newImg);
        });
    }

    const renderBreeds = json =>{
        let breedsUl = document.getElementById('dog-breeds');
        for (const breed in json) {
            breeds.push(breed);
            addBreed(breed)
        }
    }

    const addBreed = breed =>{
        let breedsUl = document.getElementById('dog-breeds');
        let newBreed = document.createElement('li');
        newBreed.innerHTML = breed;
        breedsUl.appendChild(newBreed).addEventListener("click", () => {newBreed.style.color = getRandomColor()});
    }

    const addFilter = () =>{
        let selection = document.getElementById('breed-dropdown');
        let breedsUl = document.getElementById('dog-breeds')

        selection.addEventListener("change", (event) =>{
            let currentSelection = selection.value;
            let filteredDogBreeds = breeds.filter(breed => breed.startsWith(currentSelection))
            removeChildren(breedsUl);
            filteredDogBreeds.forEach(breed => addBreed(breed))
        });
    }

    const removeChildren = parent =>{
        let child = parent.lastElementChild;
        while (child){
            parent.removeChild(child);
            child = parent.lastElementChild;
        }
    }

    fetchImage(imgUrl);
    fetchBreeds(breedUrl);
    addFilter();
});