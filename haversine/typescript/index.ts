interface Position {
    lat: number,
    lon: number
};

/**
* Convert a degree value into radians
* @param {number} degree The degree value to convert into radians
* @return {number} return the radians value of the degree parameter
*/
const radians = (degree: number): number => {
    return (degree * (Math.PI / 180));
};

/**
* Check if the coordinates points are valid
* @param {number} coord The coordinate value
* @param {'latitude' | 'longitude'} pos The axis to check, if it's the latitude or longitude point
* @return {boolean}  return true if the coordinate value is valid, false otherwise
*/
const checkCoord = (coord: number, pos: 'latitude' | 'longitude'): boolean => {
    return (isFinite(coord) && (Math.abs(coord) < (pos == 'latitude' ? 90 : 180)));
};

/**
* Haversine formula to get the distance in meters between two positions points
* @param {Position} start The starting point position
* @param {Position} destination The destination point position
* @return {number}  return the distance in meters between the two points, or -1 if an error occured.
*/
const haversine = (start: Position, destination: Position): number => {
    var errors: string[] = [];
    try {
        [start, destination].map( (el: Position, i: number) => {
            if (!checkCoord(el.lat, 'latitude') || !checkCoord(el.lon, 'longitude'))
                errors.push(`Invalid ${i == 0 ? '"Start"' : '"Destination"'} position.`);
        });
        if (errors.length > 0) throw errors.join("\n");
        return (2 * 
            Math.asin( Math.sqrt(Math.pow( Math.sin(radians(destination.lat) - radians(start.lat)) / 2, 2 )
                + Math.cos(radians(start.lat))
                    * Math.cos(radians(destination.lat))
                    * Math.pow(Math.sin( radians(destination.lon) - radians(start.lon)) / 2 , 2)))
            * 6371000);
    } catch (e) {
        console.error(e);
        return (-1);
    }
};