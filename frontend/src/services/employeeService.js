import api from './api';

export const getEmployees = async (page = 1, search = '') => {
  const { data } = await api.get(`/employee/list?page=${page}&search=${search}`);
  // const { data } = await api.get(`/employee/list`);
  console.log(data )
  console.log("aaya")
  return data;
};

export const createEmployee = async (employeeData) => {
  await api.post('/employee/create', employeeData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteEmployee = async (id) => {
  await api.delete(`/employee/delete/${id}`);
};

export const updateEmployee = async (employeeData) => {
  await api.put(`/employee/edit/${employeeData._id}`, employeeData);
};