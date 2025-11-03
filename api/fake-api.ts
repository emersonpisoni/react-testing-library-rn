export function fakeApiWithFetch(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Build a Todo App' },
      ];
      const init = { status: 200, statusText: 'OK' };
      const response = new Response(JSON.stringify(data), init);
      resolve(response);
    }, 2000);
  });
}