function getPlaces() {
    axios
      .get('/list')
      .then(response => {
        location(response.data.places);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  function location(places) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });
  
    for (let place of places) {
      const center = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0]
      };
      const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });
    }
  }
  
  getPlaces();