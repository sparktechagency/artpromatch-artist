import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

const Maps = ({ location }: { location: { lat: number; lng: number } }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!location) return;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
      });
      const { Map } = await loader.importLibrary('maps');

      //   init marker
      const { Marker } = await loader.importLibrary('marker');

      const position = {
        lat: location.lat,
        lng: location.lng,
      };

      //   map options:

      const mapOptions = {
        center: position,
        zoom: 15,
        mapId: 'MY_NEXTJS_MAPID',
      };

      const map = new Map(mapRef.current, mapOptions);

      new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, [location]);

  return <div style={{ height: '10px' }} ref={mapRef}></div>;
};

export default Maps;
