
const auth_link = "https://www.strava.com/oauth/token"

function getActivities(res){
    
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function(data){

            var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            for(var x=0; x<data.length; x++){

                console.log(data[x])
                var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
                console.log(coordinates)
           
                L.polyline(
                    coordinates,
                    {
                        color:"green",
                        weight:5,
                        opacity:.7,
                        lineJoin:'round'
                    }
                ).addTo(map)
            
            }

            

        })
}

//getActivities()

console.log("Hello mom and dad!")


function reAuthorize(){
    fetch(auth_link, {
        method: 'post',
        headers: { 
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'    
        },

        body: JSON.stringify({

            client_id: '67680',
            client_secret: 'f294db7b7fa8df67d8cc689d51bfc1a8561f229d',
            refresh_token: '468e4b6c799bc8c2818b2e276aaae11ccf535710',
            grant_type: 'refresh_token'

        })
    }).then(res => res.json())
        .then(res => getActivities(res))
}

reAuthorize()