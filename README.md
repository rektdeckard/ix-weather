# ix-weather
A React Native weather client.

## Coding Challenge
**GOAL**: Verify candidate can provide a technical solution and follow instructions.

### REQUIREMENTS:
These requirements are rather high-level and vague. If details are omitted, it is because we will
be happy with any of a wide variety of solutions. Don't worry about finding "the" solution.
Read about the following MetaWeather API here https://www.metaweather.com/api/

- Obtain the device’s GPS coordinates, if available, and pass them to the service.
(https://www.metaweather.com/api/location/search/?lattlong=(latt),(long))
- If coordinates are not available, pass user entered keyword/location name
(https://www.metaweather.com/api/location/search/?query=(query))
- Presently store all the search keyworks/location with a time stamp so that when the
user can see search history in the future
- In a list, display each location id, title and type
- On selecting a location from the list, open another page which would show weather
details for next 5 days (https://www.metaweather.com/api/location/(woeid))

In order to prevent you from running down rabbit holes that are less important to us, try to
prioritize the following:

#### What is Important
- Proper function – requirements met.
- Well-constructed, easy-to-follow, commented code (especially comment hacks or
workarounds made in the interest of expediency (i.e. // given more time I would prefer
to wrap this in a blah blah blah pattern blah blah )).
- Proper separation of concerns and best-practice coding patterns.
- Defensive code that graciously handles unexpected edge cases.

#### What is Less Important
- UI design – generally, design is handled by a dedicated team in our group.
- Demonstrating technologies or techniques you are not already familiar with
- Device compliance – we are not worried about your code working on all operating
systems and platforms. We understand that the details of Android vs iOS lead to extra
development.

#### Bonus Points!
- Unit Tests
- Additional functionality – whatever you see fit.

As mentioned, you are not expected to function in a vacuum. Use all the online resources
you can find, and please do contact us with questions or for interim feedback if you desire.
