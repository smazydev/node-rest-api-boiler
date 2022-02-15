import { createSpreadsheetHandler, deleteSpreadsheetHandler, findSpreadsheetHandler, getAllSpreadsheetsHandler, updateChatHandler, updateSpreadsheetHandler } from '../controller/mongoDb/spreadsheet.controller';
import { createSpreadsheetSchema, getSpreadsheetSchema, updateSpreadsheetSchema } from '../schema/spreadsheetSchema';
import { validate } from '../middlewares/validateRequest';
import express from 'express';


export const router = express.Router();

router.get("/api/spreadsheets/",getAllSpreadsheetsHandler);

router.get("/api/spreadsheets/:id",validate(getSpreadsheetSchema),findSpreadsheetHandler);

router.post("/api/spreadsheets/create",validate(createSpreadsheetSchema),createSpreadsheetHandler);

router.post("/api/spreadsheets/update",validate(updateSpreadsheetSchema), updateSpreadsheetHandler);

router.post("/api/spreadsheets/delete", deleteSpreadsheetHandler);

router.post("/api/spreadsheets/chat/update", updateChatHandler);