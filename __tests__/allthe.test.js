const request = require('supertest');
const { app } = require('../src/server');
const validator = require('../src/middleware/validator');
const err404 = require('../src/error-handlers/404');
const err500 = require('../src/error-handlers/500');

describe('GET /', () => {
  it('should respond with status 200 and a message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('one small step for the server');
  });
});

describe('GET /person', () => {
  it('should respond with status 200 and the name in JSON when valid name is provided', async () => {
    const response = await request(app).get('/person?name=Roary');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'Roary' });
  });

  it('should respond with status 500 when name is not provided in the query string', async () => {
    const response = await request(app).get('/person');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 500,
      route: '/person',
      query: {},
      path: {},
      body: {},
      message: 'Error in server: You didn\'t say Roary...',
    });
  });
});

describe('GET /hello/userName', () => {
  it('should respond with status 200 and a greeting message', async () => {
    const response = await request(app).get('/hello/John');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Greeting from the way');
  });
});

describe('GET /winning', () => {
  it('should respond with status 200 and a winning message', async () => {
    const response = await request(app).get('/winning');
    expect(response.status).toBe(200);
    expect(response.text).toBe('We are WINNING!');
  });
});

describe('GET /tangy', () => {
  it('should call the next function with an error message', async () => {
    const next = jest.fn();
    await request(app).get('/tangy').expect(500);
    expect(next).toHaveBeenCalledWith('That is tangy in a bad way!');
  });
});

describe('Error Handlers', () => {
  it('should respond with status 404 and a not found message for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 404,
      route: '/undefined-route',
      message: 'Oh, no! Cannot find :(',
    });
  });

  it('should respond with status 500 and an error message for server errors', async () => {
    const response = await request(app).get('/server-error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 500,
      route: '/server-error',
      query: {},
      path: {},
      body: {},
      message: 'Error in server: Server Error',
    });
  });
});

describe('Middleware', () => {
  it('validator middleware should call the next function when valid name is provided', () => {
    const req = { query: { name: 'Roary' } };
    const next = jest.fn();
    validator(req, {}, next);
    expect(next).toHaveBeenCalled();
  });

  it('validator middleware should call the next function with an error message when invalid name is provided', () => {
    const req = { query: { name: 'John' } };
    const next = jest.fn();
    validator(req, {}, next);
    expect(next).toHaveBeenCalledWith('You didn\'t say Roary...');
  });
});

describe('Error Handlers', () => {
  it('404 error handler should respond with status 404 and a not found message', () => {
    const req = { baseURL: '/undefined-route' };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    err404(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      error: 404,
      route: '/undefined-route',
      message: 'Oh, no! Cannot find :(',
    });
  });

  it('500 error handler should respond with status 500 and an error message', () => {
    const error = new Error('Server Error');
    const req = { path: '/server-error', query: {}, params: {}, body: {} };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    err500(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: 500,
      route: '/server-error',
      query: {},
      path: {},
      body: {},
      message: 'Error in server: Server Error',
    });
  });
});
