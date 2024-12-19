import axios from 'axios';

const BASE_URL = 'https://test-fe.sidak.co.id/api';

export const getProjects = async () => {
  const response = await axios.get(`${BASE_URL}/projects`);
  return response.data;
};

export const addProject = async (projectData) => {
  const response = await axios.post(`${BASE_URL}/projects`, projectData);
  return response.data;
};

export const getTasks = async (projectId) => {
  const response = await axios.get(`${BASE_URL}/projects/${projectId}/tasks`);
  return response.data;
};

export const addTask = async (projectId, taskData) => {
  const response = await axios.post(`${BASE_URL}/projects/${projectId}/tasks`, taskData);
  return response.data;
};

export const updateTaskStatus = async (taskId, updatedStatus) => {
  const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, { status: updatedStatus });
  return response.data;
};
