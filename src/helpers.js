import zomatoAPI from './API'
import defaultImage from './images/default-image.jpg'

export function createInfoWindowDetails(map, marker, location, infowindow) {

    zomatoAPI(location.id).then( restDetails => {
        const content =
            `<div class="infoWindow"><h3>${location.title}</h3>
                    <div class="infoWindow-details">
                    <img src=${restDetails.thumb || defaultImage} height="100" width="100" />
                    <div> <p>${restDetails.location.address}</p>
                        <p class="rating">Rating: ${restDetails.user_rating.aggregate_rating} </p>
                        <p><span class="rating">${restDetails.user_rating.rating_text}</span> (${restDetails.user_rating.votes} votes)</p>
                        <a href=${restDetails.events_url}>View Details</a>
                    </div></div>
                    </div>`

        populateInfoWindow(marker, content, infowindow)
    }).catch(error => populateInfoWindow(marker, 'Oops, zomato API not working', infowindow))

    function populateInfoWindow(marker, content, infowindow) {
        infowindow.marker = marker;
        infowindow.setContent(content);
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

