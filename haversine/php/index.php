<?php
    /**
     * Check if the coordinates points are valid
     *
     * @param float $coord The coordinate value
     * @param string $pos The axis to check, if it's the latitude or longitude point (longitude | latitude).
     * 
     * @return bool return true if the coordinate value is valid, false otherwise.
     */
    function checkCoord(float $coord, string $pos): bool {
        if (!in_array($pos, ['longitude', 'latitude'])) return (false);
        return (is_finite($coord) && (abs($coord) < ($pos === 'latitude' ? 90 : 180)));
    }

    /**
     * Haversine formula to get the distance in meters between two positions points.
     *
     * @param array $start The [latitude, longitude] coordinates of the starting position
     * @param array $destination The [latitude, longitude] coordinates of the destination position
     * 
     * @return float return the distance in meters between the two points, or -1 if an error occured.
     */
    function haversine(array $start, array $destination): float {
        if (count($start) !== 2 && count($destination) !== 2) return (-1);
        array_map(function ($value) {
            if (!checkCoord($value[0], 'longitude') || !checkCoord($value[1], 'latitude'))
                throw new Exception("Invalid position.");
        }, [ $start, $destination ]);
        return (2 * asin( sqrt( pow( sin( deg2rad($destination[0]) - deg2rad($start[0])) / 2, 2)
            + cos( deg2rad($start[0]) )
            * cos( deg2rad($destination[0]) )
            * pow( sin( deg2rad($destination[1]) - deg2rad($start[1])) / 2, 2 )
        )) * 6371000);
    }