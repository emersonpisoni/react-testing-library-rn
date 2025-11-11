# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Learnings

<video width="300" height="500" controls>
  <source src="./assets/videos/todo.mp4" type="video/mp4">
</video>

## Questions to answer
- Why use fireEvent and not use just document.getElementById("myElement").click()?
   - That is the way similar to user interactions in interface, if you do not do this, the React will not understand the event, and the lifecycle will not be triggered.
- Do waitFor and findBy the same thing?
   - They are pretty similar, findBy is a shortcase for waitFor, but with waitFor you can cover more use cases like:
      - Wait an element to disappear
      - Multiple conditions
      - Wait a custom promise
- Is act mandatory for testing react?
   - It is mandatory in all cases that you have to wait React to complete its lifecycle, but in some cases like in fireEvents and findBySomething you do not need to explicit this, because it is already been done by RTL.

### React Native

- React Native setup with Expo
- Expo router is file-based for default

### Testing

- Test behavior and not data with RTL
- Simple tests with render, fire events, etc..
- Async tests with `waitFor` or `findBy...`
   - It handles setState effects automatically
- Test resolved and rejected api calls
- Navigation tests
- Custom hooks testing
   - https://react-hooks-testing-library.com/

### Todos
- Navigation tests
- Test coverage
- Custom hooks testing