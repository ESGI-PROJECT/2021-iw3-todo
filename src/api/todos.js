const baseRoute = import.meta.env.API_URL;

const headers = {
  'Content-Type': 'application/json',
};

export function fetchTodos() {
  return fetch(`${baseRoute}/todos`, {
    method: 'GET',
    headers
  })
    .then(results => results.json())
    .catch(error => {
      console.error(error);
      return false;
    });
}

export function createTodo(data) {
  return fetch(`${baseRoute}/todos`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .catch(error => {
      console.error(error);
      return false;
    })
}

