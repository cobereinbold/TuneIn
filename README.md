# TuneIn
A mobile-friendly Client/Server application built with ReactJS, NextJS, MongoDB, and Spotify's Web API.

TuneIn is a social media application where users can share their song of the day, and view the song of the day of other users on the app.

You can navigate through the different pages on the app via the menu located in the top left corner.

The home page of the app shows the posts of all users for the current day starting at 00:00 UTC and will refresh on the next calendar day. Once users post their song of the day, they cannot post again.

You can search for any available song on spotify to post. Once a user posts, you can view the song on spotify by clicking on the Album art on the home page.

Users can like and comment on any post on the home page.

You can search for any existing user on the app using the search bar.

## Getting started

### Server:
1. In one terminal, cd into TuneIn/backend: `cd backend`
2. Install the required dependancies for the server side: `npm i`
3. Start the server locally: `npm start`

The server will run on http://localhost:5000/. Everything is in working order when you see 'Connected to database' in the terminal.

### Client:
1. In another terminal, cd into TuneIn/tunein: `cd tunein`
2. Install the required dependancies for the client side: `npm i`
3. Start the react application locally: `npm start`

The TuneIn application will run on http://localhost:3000/

## Admin
To log into TuneIn as an admin, you may log in with the following admin credentials:

- Username: adminuser
- Password: admin1

Admins are able to View the account information of all users, and delete users.
Admins cannot view any of the users passwords, as they are encrypted through the database.
