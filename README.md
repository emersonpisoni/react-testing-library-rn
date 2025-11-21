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

------

- `getBy` Queries
   - The element must already be in the render tree.
   - You want an immediate check.
   - The UI is static or synchronous (no async state changes).

   #### Behavior
   - Throws immediately if not found.
   - No retries, no waiting.

- `queryBy` Queries
   - You want to check if something is NOT on screen.
   - You want an immediate check.

   #### Behavior
   - Returns null instead of throwing an error.

- `findBy` Queries
   - The element appears asynchronously (e.g. after fetch, animation, or effect).
   - You need to wait automatically for the element to show.

   #### Behavior
   - Internally uses waitFor(() => getBy...).
   - Retries every 50ms until success or timeout (default 1000ms).
   - Quiet (no visible retries).

- `waitFor`
   - You need to wait for any custom condition to be true.
   - You want to wait for state changes, text updates, or DOM mutations that are not covered by findBy.
   - Ideal for assertions that aren’t just “element exists”.

   #### Behavior
   - Retries your callback until it does not throw.

- `waitForElementToBeRemoved`
   - You want to wait for an element to disappear.
   - Commonly used for loading spinners, modals, or messages that should vanish.

   #### Behavior
   - Observes mutations in the rendered tree.
   - Resolves automatically when the element is gone.
   - Simpler and cleaner than manual waitFor loops.

### Routing testing

- Never test the real navigation, always test if the correct function was called.

## Questions to answer
- Why use fireEvent and not use just document.getElementById("myElement").click()?
   - That is the way similar to user interactions in interface, if you do not do this, the React will not understand the event, and the lifecycle will not be triggered.
- What is the difference between using a await waitFor or await someAsyncSelector?
   - someAsyncSelector (i.e.: findByText) is a combination of getBy... and waitFor, this selector works when you expect an element to appear but the change to the DOM might not happen immediately
   - waitFor can do exactly the same thing of findBy queries, but it is more than just it. It can:
      - Waits for elements to disappear
      - wait style changes
      - multiple async conditions
- Is act mandatory for testing react?
   - It is mandatory in all cases that you have to wait React to complete its lifecycle, but in some cases like in fireEvents and findBySomething you do not need to explicit this, because it is already been done by RTL.
- Why some events do not require act explicit?
   - Because the events like fireEvent, findBy, waitFor for example are already wrapped by act.
- Which one is more performatic?
   - In general, using waitFor with getByText is more performatic because when it find the solution, it stops immediately.
      - It is faster but more unstable.
   - For findBy... it is less performatic because it has to wait for some other flows, to complete the entire cycle and them finish the proccess.
      - It is slower but more reliable.

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