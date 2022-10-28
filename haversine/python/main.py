import math

def checkCoord(coord: float, pos: str) -> bool:
    """
    Check if the coordinates points are valid.

    `param` float `coord`: The coordinate value
    `param` str `pos`: If this is a 'latitude' or 'longitude' point

    `return` `true` if the coordinate value is valid, `false` otherwise
    """
    if pos not in ['longitude','latitude']:
        return False
    return (math.isfinite(coord) and (abs(coord) < (90 if pos == 'latitude' else 180)))



def haversine(start: dict[float, float], destination: dict[float, float]) -> float:
    """
    Haversine formula to get the distance in meters between two positions points.

    `param` dict `start`: The person sending the message as [latitude, longitude]
    `param` dict `destination`: The recipient of the message as [latitude, longitude]

    `return` a `float` value corresponding to the distance between the two points in meters

    `raises ValueError: if the latitude absolute value is superior than 90`
    `raises ValueError: if the longitude absolute value is superior than 180`
    """
    for i, pos in enumerate([ start, destination ]):
        if not checkCoord(pos[0], 'latitude') or not checkCoord(pos[1], 'longitude'):
            raise Exception("Invalid " + ("Start" if i == 0 else "Destination") + " position.")
    return (2 * math.asin( math.sqrt( ( ( math.sin(math.radians(destination[0]) - math.radians(start[0])) / 2) ** 2)
        + math.cos(math.radians(start[0]))
            * math.cos(math.radians(destination[0]))
            * ( (math.sin( math.radians(destination[1]) - math.radians(start[1]) ) / 2) ** 2)
    )) * 6371000)