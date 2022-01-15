import axios from 'axios';

/*
The intention of using this method for fetching the history of the users visits is to be able to compare
the ip of the user, the ipLocation of the user and more specifically details of current visit with the 
most recent timestamp with previos timestamp and if some abnormal activity is deetected like for example
the user loggeed in at 8AM from Europe/London and at 9AM from USA/New York it means that thee account
has been hacked and then the user could use Two Factor Authentication when loggin in and login is not
allowed and the user receives an email with the information to confirm the login details and including
the information that the account has been hacked.

This information is obtained from ServerAPI and from which details for all the visits are obtained:

// visitor found and recent visits history is available
{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": [
    {
      "requestId": "0KSh65EnVoB85JBmloQK",
      "incognito": true,
      "linkedId": "somelinkedId",
      "time": "2019-05-21T16:40:13Z",
      // timestamp of the event with millisecond precision
      "timestamp": 1582299576512,
      "url": "https://www.example.com/login",
      "ip": "61.127.217.15",
      "ipLocation": {
        "accuracyRadius": 10,
        "latitude": 49.982,
        "longitude": 36.2566,
        "postalCode": "61202",
        "timezone": "Europe/Dusseldorf",
        "city": {
          "name": "Dusseldorf"
        },
        "continent": {
          "code": "EU",
          "name": "Europe"
        },
        "country": {
          "code": "DE",
          "name": "Germany"
        },
        "subdivisions": [
          {
            "isoCode": "63",
            "name": "North Rhine-Westphalia"
          }
        ],
      },
      "browserDetails": {
        "browserName": "Chrome",
        "browserMajorVersion": "74",
        "browserFullVersion": "74.0.3729",
        "os": "Windows",
        "osVersion": "7",
        "device": "Other",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....",
      },
      "confidence": {
         "score": 0.97
      }
    }
  ],
  // optional, if more results are available for pagination.
  "lastTimestamp": 1582299576512
}
*/
export const fetchUserHistory = async(visitorId) => {
    const config = {
        headers: { 'Auth-token': 'joL0dByoiFhIrITAj7zg' }
    };
    const response = await axios.get(`https://api.fpjs.io/visitors/${visitorId}?token=L5J8ZdKDdAdjZANmN6Cy`, config);
    return response.data;
} 