import polyline from '@mapbox/polyline';

export const FetchRoute = async (originPlaceId, destinationPlaceId) => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${originPlaceId};${destinationPlaceId}?access_token=pk.eyJ1Ijoiam9wYWExMCIsImEiOiJja3RuZHRwaHMwMXY3MnBqbTBibDZjb2JmIn0.NoaI49NCq87KwpDClETgmg`,
    );

    //https://maps.googleapis.com/maps/api/directions/json?origin=${originPlaceId}&destination=${destinationPlaceId}&key=AIzaSyBJ5sO1HRmzbvinCvs7h-4w1tpAQFzR2ls

    console.log(res);
    const json = await res.json();

    console.log(json);

    if (!json.routes[0]) {
      return;
    }

    const points = polyline.decode(json.routes[0].overview_polyline.points);
    const coordinates = points.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));

    //console.log(coordinates);

    return coordinates;
  } catch (error) {
    console.log(error);
  }
};
