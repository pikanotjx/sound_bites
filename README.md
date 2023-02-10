# Sound Bites

SoundBites is the ultimate app for music fans! With SoundBites, you get to showcase your knowledge of your favorite artist and compete against others to become the biggest fan. Simply select your favorite artist, listen to the song being played, and select the right title. The app will calculate your score and place you on the leaderboard, where you can see how you stack up against other fans. So, put your musical knowledge to the test and fight your way to the top with SoundBites!

Note for lecturer: While designing the app, we looked for lotties that we could apply in the app. However, we did not find any lotties that matched the look and feel of our app. Consequently, we created our own logo using Adobe Illustrator. While we attempted to convert the SVG file into a lottie, we realised that there were no animations that matched the feel we wanted, which was a basic simple bobbing animation. Thus, we decided to animate the logo on our own with the use of CSS. This logo is our solution in replacement to the use of lotties as required in the **Key Deliverables**. We hope that you may understand our situation, and recognise our efforts instead of just strictly saying that we are to be penalised due to the lack of use of lotties. 

## Design Process

SoundBites is meant to be a simple and easy game for anyone under the sun. We designed SoundBites keeping in mind that our userbase could be anyone from little kids to elderlies. As such, we kept to a minimalistic and unclustered design, whereby all elements are reasonably spaced from each other, allowing for easy navigation. 

Here are some use cases: 
- I am big fan of Ed Sheeran! If I want to play a game to test how well I know his songs, I can use play SoundBites, selecting Ed Sheeran, and play a music game with only his songs. I can also fight my way to the top of the leaderboard by being the fastest guesser, and getting all the songs right! 
- I am a neutral music lover who just wants to find new songs. With SoundBites, I can listen to songs from individual artists in its entirety. Of course, this means that my score will be low since I'm taking a longer time. But who cares? I'm just here for the songs anayways. 

During the very first checkpoint submission, we were still unsure of what we wanted. But by the second week, our plans were firm, and we improved the original wireframe to the one that can be found in [wireframe.md](/wireframe.md) or in the [wireframes folder](/wireframe). The links to the desktop and mobile wireframes are also shown below. 

- [Desktop](https://xd.adobe.com/view/f2295da2-527a-4f8e-aab0-8aa96d9383d6-a77a/)
- [Mobile](https://xd.adobe.com/view/73b6732a-732e-49e0-a0d8-4934ccca1df7-26e5/)

## Features

### Existing Features

1. Artist Selection: Users can choose their favorite artist from a comprehensive list of musicians and bands.
2. Song Guess Game: SoundBites plays a snippet of a song by the selected artist, and users have to guess the title of the song.
3. Score Calculation: The app keeps track of the user's score and displays it on the leaderboard, allowing users to see their progress and compare it to others.
4. Leaderboard: A real-time leaderboard displays the scores of all users, providing a fun and competitive experience.
5. Easy to Use: SoundBites is user-friendly and easy to navigate, making it accessible to all music fans.
6. Regular Updates: The app is regularly updated with new songs and artists to keep the experience fresh and exciting.
7. High-Quality Audio: SoundBites uses high-quality audio to ensure that users can accurately guess the song and enjoy the experience to the fullest.

With SoundBites, music fans can put their knowledge to the test and compete against others to become the ultimate fan of their favorite artist. Try SoundBites today and see where you rank on the leaderboard!

### Features to Implement

1. Multiplayer: Music fans can go head to head and see who is the bigger fan in real-time. 
2. Music Database: Due to the restrictions of what is currently available, we are currently manually adding sounds. We hope to make changes such that SoundBites can eventually function with the help of large databases such as the Spotify music database. 


## Technologies Used

- [jQuery](jquery.com)
  - The project uses jQuery to simplify DOM manipulation and handle events and effects on a web page.
- [Bootstrap](getbootstrap.com)
  - Bootstrap was used in the project for responsive web design and to quickly and easily create consistent, attractive user interfaces.
- [FontAwesome](fontawesome.com)
  - FontAwesome was used in the project to easily add scalable vector icons and social logos to the design.
- [restDB](restdb.io)
  - restDB was used in the project to store and manage the data, providing an API to interact with the database and allowing the application to easily retrieve and manipulate the data as needed.
- [Papa Parse](papaparse.com)
  - Papa Parse was used in order to parse csv files containing the names of the songs into arrays of objects to be used. The original intention was to use restDB to contain the songs, but due to the limitations of the free account, we had to look for alternatives, and fortunately came across papaparse. 

## Testing

### Not Signed In

1. Attempt to click on the play button in the index page and be redirected to the login page. 
2. Attempt to click on the play button in the navigation bar and be redirected to the login page. 
3. Attempt to click on the account button in the navigation bar and be redirected to the login page. 

### Login

1. Attempt to submit an empty form / a form half filled and a message asking you to fill in all fields will appear. 
2. Enter an invalid username and a message saying that username is invalid will appear. 
3. Enter an incorrect password and a message saying that the password is incorrect will appear. 

### Register

1. Attempt to submit an empty form / a form half filled and a message asking you to fill in all fields will appear. 
2. Enter a username that is taken and a message saying that the username is taken will appear. 

### Bugs

- When navigation bar is collapsed, and opened, the words are cut off. 
- When navigation bar is open and the window is expanded horizontally, formatting of the navigation bar will be weird until the page is refreshed.
- Bootstrap CDN cannot be used when connected to the Ngee Ann Polytechnic network. Connection to the CDN is however restored when using other networks. 

## Credits

### Songs

All songs used belong to their respective owners. Any owners who wish to have their songs removed may contact us at [hello@kwokjinguan.me](mailto:hello@kwokjingxuan.me). 

### Images

All images used belong to their respective ownwers. All images were retrieved online from public sources. Any owners who wish to have their images removed may contact us at [hello@kwokjingxuan.me](mailto:hello@kwokjingxuan.me). 