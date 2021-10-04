import polyline from '@mapbox/polyline';

export const FetchRoute = async (
  originPlaceLat,
  originPlaceLng,
  destinationPlaceLat,
  destinationPlaceLng,
) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originPlaceLat},${originPlaceLng}&destination=${destinationPlaceLat},${destinationPlaceLng}&key=AIzaSyA-t99Dx-RD6dFtzZ443Zv1vBIi2IkxEkU`,
    );

    //console.log(res);
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
