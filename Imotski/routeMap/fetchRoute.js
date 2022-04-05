import polyline from '@mapbox/polyline';

//google key
import {GOOGLE_KEY} from '@env';

export const FetchRoute = async (originPlaceId, destinationPlaceId) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originPlaceId}&destination=${destinationPlaceId}&key=${GOOGLE_KEY}`,
    );

    //https://maps.googleapis.com/maps/api/directions/json?origin=${originPlaceId}&destination=${destinationPlaceId}&key=AIzaSyBJ5sO1HRmzbvinCvs7h-4w1tpAQFzR2ls

    //console.log(res);
    const json = await res.json();

    //console.log(json);

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
