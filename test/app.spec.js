const axios = require('axios');

describe('/https://jsonplaceholder.typicode.com', () => {


  test('responde con un código de error 404 para una solicitud a un recurso inexistente', async () => {
    const postId = 1000; // Suponemos que no existe el recurso con ID 1000
    let error;
    try {
      await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    } catch (e) {
      error = e;
    }
    expect(error.response.status).toBe(404);
  });


  test('responde correctamente a una solicitud GET con paginación', async () => {
    const page = 2;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.headers['x-total-count']).toBeDefined();
  });


  test('responde correctamente a una solicitud GET con parámetros de consulta', async () => {
    const userId = 1;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    response.data.forEach((post) => {
      expect(post.userId).toBe(userId);
    });
  });


  test('responde correctamente a una solicitud DELETE para eliminar un recurso existente', async () => {
    const postId = 1;
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    expect(response.status).toBe(200);
  });


  test('responde correctamente a una solicitud PUT para actualizar un recurso existente', async () => {
    const updatedPost = {
      title: 'Título actualizado',
      body: 'Contenido actualizado',
      userId: 1,
    };
    const postId = 1;
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost);
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(updatedPost);
  });

  const axios = require('axios');

  test('responde con datos válidos', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('devuelve un solo recurso por su ID', async () => {
    const postId = 1;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('userId');
    expect(response.data).toHaveProperty('id', postId);
  });

  test('responde correctamente a una solicitud POST', async () => {
    const newPost = {
      title: 'Nuevo Post',
      body: 'Contenido del nuevo post',
      userId: 1,
    };
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject(newPost);
  });


  test('Debe obtener datos válidos de la API de ejemplo', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('userId');
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');
  });

  test('Debe obtener datos de la API utilizando query params dinámicos', async () => {
    const userId = 1;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    expect(response.status).toBe(200);
    expect(response.data.every((post) => post.userId === userId)).toBe(true);
  });

});
