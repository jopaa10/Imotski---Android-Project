import polyline from '@mapbox/polyline';

export const FetchRoute = async (originPlaceId, destinationPlaceId) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originPlaceId}&destination=${destinationPlaceId}&key=AIzaSyBWeAUtDlbMRmnqsLSvQVbO7BsQzxGQDpo`,
    );

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

    console.log(coordinates);

    return coordinates;
  } catch (error) {
    console.log(error);
  }
};
