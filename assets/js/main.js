let liveCollection;

const render = () => {
    document.querySelector('.counter').textContent = `There are ${
        Object.keys(liveCollection).length
        } tracks in the list with the name \'Sound of Silence\'`;

    renderCollection = liveCollection
        .map(singleTrack => {
            // Destructuring
            const {
                trackName: track,
                artistName: artist,
                collectionCensoredName: album,
                artworkUrl30: cover,
                trackPrice,
                currency,
                releaseDate
            } = singleTrack;

            let price = trackPrice + ' ' + currency;

            if (singleTrack.trackPrice <= 0) {
                price = 'Album only';
            }

            return `
            <div class="track row mb-4  mb-md-6">
                <div class="col-sm text-sm-center text-md-left">
                    <img src="${cover}" class="cover d-sm-inline-block m-1">
                    <p class="d-sm-inline-block">${track}</p>
                </div>
                <div class="col-sm" sortable>${artist}</div>
                <div class="col-sm small">${album}
                    <p>
                        ${new Date(releaseDate).toLocaleDateString('de-De', {
                month: 'long',
                year: 'numeric'
            })}
                    </p>
                </div>
                <div class="col-md mb-4  mb-md-6">
                    <button class="btn btn-outline-light btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${price}
                    </button>
                </div>
            </div>
            `;
        })
        .join('');
    document.querySelector('#output').innerHTML = renderCollection;
};

const filter = () => {
    const filterInput = document
        .querySelector('#filter-input')
        .value.toLowerCase();
    liveCollection = music
        // Filter the collection
        .filter(
            ({
                trackName: track,
                artistName: artist,
                collectionCensoredName: album
            }) =>
                filterInput == '' ||
                filterInput == 'undefined' ||
                track.toLowerCase().includes(filterInput) ||
                artist.toLowerCase().includes(filterInput) ||
                album.toLowerCase().includes(filterInput)
        );
    resetSortIcons(true, true);
    render();
};

const resetSortIcons = (price, author) => {
    if (price) {
        document
            .querySelector('.sortablePrice')
            .classList.remove('asc', 'desc', 'fa-chevron-down', 'fa-chevron-up');
        document.querySelector('.sortablePrice').classList.add('fa-minus');
    }
    if (author) {
        document
            .querySelector('.sortable')
            .classList.remove('asc', 'desc', 'fa-chevron-down', 'fa-chevron-up');
        document.querySelector('.sortable').classList.add('fa-minus');
    }
};

const sort = () => {
    // Reset the sort button for track price
    resetSortIcons(true, false);
    // Target the sortable element
    let element = document.querySelector('.sortable');
    // Check if contains the class desc
    if (!element.classList.contains('desc')) {
        // Sort by artistName DESC using localeCompare
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#Examples
        liveCollection.sort((a, b) => a.artistName.localeCompare(b.artistName));
        // Check and select the correct icons and classes
        if (element.classList.contains('asc')) {
            element.classList.replace('fa-chevron-up', 'fa-chevron-down');
            element.classList.replace('asc', 'desc');
        } else {
            element.classList.add('desc');
            element.classList.replace('fa-minus', 'fa-chevron-down');
        }
    } else {
        // Invert sorting ASC - reverse the collection
        liveCollection.reverse();
        element.classList.replace('fa-chevron-down', 'fa-chevron-up');
        element.classList.replace('desc', 'asc');
    }
    // Call render function
    render();
};

const sortPrice = () => {
    // Reset the sort button for artist name, no-combo for now
    resetSortIcons(false, true);
    // Target the sortablePrice element
    let element = document.querySelector('.sortablePrice');
    // Check if contains the class desc
    if (!element.classList.contains('desc')) {
        // Sort by trackPrice DESC
        liveCollection.sort((a, b) => a.trackPrice - b.trackPrice);
        // Check and select the correct icons and classes
        if (element.classList.contains('asc')) {
            element.classList.replace('fa-chevron-up', 'fa-chevron-down');
            element.classList.replace('asc', 'desc');
        } else {
            element.classList.add('desc');
            element.classList.replace('fa-minus', 'fa-chevron-down');
        }
    } else {
        // Invert sorting ASC - just reverse the collection ;)
        liveCollection.reverse();
        element.classList.replace('fa-chevron-down', 'fa-chevron-up');
        element.classList.replace('desc', 'asc');
    }
    // Call render function
    render();
};

const loadEventListener = () => {
    // The eventlistners
    document.querySelector('#filter-input').addEventListener('keyup', filter);
    document.querySelector('.sortable').addEventListener('click', sort);
    document.querySelector('.sortablePrice').addEventListener('click', sortPrice);
};

const init = () => {
    liveCollection = music;
    loadEventListener();
    render();
};

window.addEventListener('load', init);
