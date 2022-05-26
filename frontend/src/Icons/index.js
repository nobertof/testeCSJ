import L from 'leaflet';

const marker = new L.Icon({
    iconUrl: require('../images/marker.png'),
    iconRetinaUrl: require('../images/marker.png'),
    iconAnchor: [15,42],
    iconSize: new L.Point(30, 40),
});

export { marker };