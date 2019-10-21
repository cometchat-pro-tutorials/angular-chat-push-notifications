# Angular Chat Notifications example

This example shows how to add push notifications to and Angular chat app:

![Login](/screenshots/Notification1.png?raw=true)
![Chat](/screenshots/Notification2.png?raw=true)

Jump straight into the code or read the accompanying step-by-step guide here on our blog.

## Technology

This demo uses:

- Angular
- TypeScript
- CometChat JavaScript SDK
- Firebase

## Running the demo locally

To run the demo follow these steps:

- Head to the [CometChat dashboard](https://app.cometchat.com/) (you'll need to create a free account if you haven't already)
- From the dashboard, create a new app called "angular-chat"
- Once created, click the button Explore
- Copy the APP id that was generated with the new app, we'll use this later
- Download the repository [here](https://github.com/cometchat-pro-tutorials/angular-one-on-one-chat.git) or by running `git clone https://github.com/cometchat-pro-tutorials/angular-one-on-one-chat.git`
- Install all dependencies by running `npm install` in the project folder
- Go to `src/environments/environment.ts` file and paste the APP id
- Go to [Firebase console](https://console.firebase.google.com/) and click Add Project and create a new project
- When your project is created click Add new app and select web
- Copy all the config values to `src/environments/environment.ts`
- Inside `firebase-messaging-sw.js`, replace 'YOUR-SENDER-ID' with the actual value from Firebase
- Start the application by running `npm start` in the aplication folder
- Go to http://localhost:4200

## Useful links

- [📚Tutorial showing how we built this sample](https://www.cometchat.com/tutorials/angular-chat-one-on-one/)
- [ℹ️ CometChat homepage](https://www.cometchat.com/pro/)
- [ℹ️ CometChat Javascript documentation](https://developer.cometchat.com/docs/web-quick-start)

## Other examples

- [Complete app](https://github.com/cometchat-pro-tutorials/angular-one-on-one-chat.git)
