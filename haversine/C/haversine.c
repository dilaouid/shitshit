#include <stdio.h>
#include <stdbool.h>
#include <math.h>

/*
 * Function: radians
 * ----------------------------
 *   Convert a degree value into radians
 *
 *   degree: float degree value
 *
 *   returns: the radians value of the degree parameter
 */
float radians(float degree)
{
    return (degree * (M_PI / 180));
}



/*
 * Function: check_coordinates
 * ----------------------------
 *   Check if the coordinates points are valid
 *
 *   coord: The float coordinate value
 *   position: the latitude or longitude position (0 for latitude | 1 for longitude)
 *
 *   returns: true if the coordinate value is valid, false otherwise
 */
float check_coordinates(float coord, bool position)
{
    return (isfinite(coord) && (fabs(coord) < (!position ? 90 : 180)));
}



/*
 * Function: haversine
 * ----------------------------
 *   Haversine formula to get the distance in meters between two positions points
 *
 *   start: The starting point position (array of float: [latitude, longitude])
 *   destination: The destination point position (array of float: [latitude, longitude])
 *
 *   returns: the distance in meters between the two points, or -1 if an error occured.
 */
float haversine(float *start, float *destination)
{
    float radianDestination[2] = {radians(destination[0]), radians(destination[1])};
    float radianStart[2] = {radians(start[0]), radians(start[1])};

    float sin1 = sin( radianDestination[0] - radianStart[0] ) / 2;
    float sin2 = sin( radianDestination[1] - radianStart[1] ) / 2;

    if (!check_coordinates(radianDestination[0], 0) || !check_coordinates(radianDestination[1], 0))
    {
        printf("Invalid destination position!\n");
        return -1.0f;
    }
    else if (!check_coordinates(start[0], 0) || !check_coordinates(start[1], 0))
    {
        printf("Invalid start position!\n");
        return -1.0f;
    }
    return (2 * sqrt( pow(sin1, 2) + cos(radianStart[0]) * cos(radianDestination[0]) * pow( sin2, 2) ) * 6371000);
}