## Testing fundamentals

Testing Tropy (Kent C. Dodds):

![alt text](/assets/images/image.png)

![alt text](/assets/images/image-1.png)

## What types of tests RNTL cover?

- Unit
- Integration

## Learnings

<video width="300" height="500" controls>
  <source src="./assets/videos/todo.mp4" type="video/mp4">
</video>

## Questions to answer
- Why use fireEvent and not use just document.getElementById("myElement").click()?
   - That is the way similar to user interactions in interface, if you do not do this, the React will not understand the event, and the lifecycle will not be triggered.
- Do waitFor and findBy the same thing?
   - They are pretty similar, findBy are a combination of getBy queries and waitFor:
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