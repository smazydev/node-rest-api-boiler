import { object, string, array } from 'yup';

const payload = {
    body: object({
        spreadsheetId: string().required("Spreadsheet id is required"),
        spreadsheetData: array(),
        chat: array(),
    })
}

const params = {
    params: object({
        spreadsheetId: string().required('Spreadsheet Id is required')
    })
}

export const createSpreadsheetSchema = object({
    ...payload,
})

export const updateSpreadsheetSchema = object({
    ...payload,
})

export const getSpreadsheetSchema = object({
    ...params,
})

export const deleteSpreadsheetSchema = object({
    ...payload,
})
