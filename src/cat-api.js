const API_KEY = 'live_WUL7x3Aamd07Ms5n59FJl4u0y1QMdofyuhAkQ2aZXWyIdaOkbVvMuYiTPQafKmvV';
const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const BASE_ID_URL = 'https://api.thecatapi.com/v1/images/search';
const options = {
    headers: {
        'x-api-key': API_KEY,
    }
}

export class CatApiService {
    constructor() { }
    
    fetchBreeds() {
        return fetch(BREEDS_URL, options)
            .then((res) => {
                return res.json();
            })
    }

    fetchCatByBreed(breedId) {
        return fetch(`${BASE_ID_URL}?breed_ids=${breedId}`, options).then((res) => {
            return res.json();
        }).then((res) => {
            return res[0];
        })
    }
}