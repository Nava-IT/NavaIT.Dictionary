import { worksheets } from '../__mocks__/worksheet';

export const worksheetService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    //return 'fetchWrapper.get(baseUrl)';
}

function getById(id) {
    //return fetchWrapper.get(`${baseUrl}/${id}`);
    return worksheets.find(worksheet => worksheet.id === id);
}

function create(params) {
    //return fetchWrapper.post(baseUrl, params);
    console.log(params)
}

function update(id, params) {
    //return "fetchWrapper.put(`${baseUrl}/${id}`, params)";
    console.log(params)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    //return "fetchWrapper.delete(`${baseUrl}/${id}`)";
}

