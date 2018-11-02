const apiKey= '272436ad181b167cfe388a7fff6091d4'

async function zomatoAPI(resID) {
    return await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${resID}` +
        `&apikey=${apiKey}`
            )
        .then(response => response.json())
        .catch(error => {
            throw(error);
        })
}

//Zomato Restaurant IDs:
//Elliott Bay ID = 16719622
//Hellbent ID = 17761627
//Beer Authority ID = 17808055
//Kaffe ID = 16728309
//2CThai ID = 17808059

export default zomatoAPI

