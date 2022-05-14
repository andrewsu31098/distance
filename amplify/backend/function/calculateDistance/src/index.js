exports.handler = async (event) => {
  // TODO implement
  function haverSine(lat1, lon1, lat2, lon2) {
    Number.prototype.toRad = function () {
      return (this * Math.PI) / 180;
    };

    var R = 3961; // miles

    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = lon2 - lon1;
    var dLon = x2.toRad();
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1.toRad()) *
        Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  }

  let x = haverSine(34.0522, 118.2437, 40.7128, 74.006);
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(x),
  };
  return response;
};
