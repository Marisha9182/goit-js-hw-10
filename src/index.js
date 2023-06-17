import { CatApiService } from "./cat-api";
import Notiflix from 'notiflix';
import 'select-pure';
import {refs} from './refs';


const catApiService = new CatApiService();

getCatBreeds();
refs.breedSelect.addEventListener('change', getCatInfo);


function getCatBreeds() {
    refs.loader.classList.add('js-visible');

    catApiService.fetchBreeds().then((res) => {
        setCatNamesList(res);
        
    }).catch((err) => {
        refs.loader.classList.remove('js-visible');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
}

function setCatNamesList(list) {
    const catNamesList = list.map((cat) => {
        const { id, name } = cat;

        return `
            <option-pure value='${id}'>${name}</option-pure>
        `
    }).join('');

    refs.breedSelect.insertAdjacentHTML('beforeend', catNamesList);
    refs.breedSelect.classList.add('js-visible');
    refs.loader.classList.remove('js-visible');
}

function getCatInfo(e) {
    refs.loader.classList.add('js-visible');
    refs.catInfo.classList.remove('js-visible');
    refs.error.classList.remove('js-visible');

    catApiService.fetchCatByBreed(e.currentTarget.value).then((res) => {
        const { breeds, url } = res;

        const catInfo =  breeds.map(({ name, description, temperament }) => {
            return `
            <div>
                <img class='cat-image' src='${url}'>
            </div>
            <div>
                <h2>${name}</h2>
                <p>${description}</p>
                <p>
                    <span class='evidance'>Temperament: </span> ${temperament}
                </p>
            </div>
            `
        }).join('');

        refs.catInfo.innerHTML = catInfo;
        refs.catInfo.classList.add('js-visible');
        refs.loader.classList.remove('js-visible');
    }).catch((err) => {
        console.log('Opps! Some error!', err);

        refs.loader.classList.remove('js-visible');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}