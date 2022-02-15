import { createSpreadsheet, findSpreadsheet, findAndUpdate, deleteSpreadsheet, getAllSpreadsheets} from '../../services/mongoDb/spreadsheet.service';
import Spreadsheet from '../../models/mongoDB';
import { Request, Response } from 'express';
import { get } from 'lodash';
import moment from 'moment';
import log from '../../logger';

export async function createSpreadsheetHandler(req:Request, res:Response) {
    log.info('Create Spreadsheet Handler Called');
    const spreadsheetId = get(req,"body.spreadsheetId");
    await createSpreadsheet({spreadsheetId});
    res.sendStatus(200);
}

export async function findSpreadsheetHandler(req:Request, res:Response) {
    log.info('Find Spreadsheet Handler Called');
    
    const spreadsheetId = get(req,"params.id");
    const response = await findSpreadsheet({ spreadsheetId });

    res.status(200).send(response);
}

export async function updateSpreadsheetHandler(req:Request, res:Response) {
    const {spreadsheetId,spreadsheetData} = req.body;

    log.info('Update Spreadsheet Handler Called');

    const spreadsheet = await findSpreadsheet({spreadsheetId});

    if (!spreadsheet) return res.sendStatus(404);

    await findAndUpdate({spreadsheetId},{spreadsheetData:spreadsheetData},{})
    res.status(200).send(moment().format("MMMM Do, h:mm:ss a"));
}

export async function deleteSpreadsheetHandler(req:Request,res:Response) {
    const spreadsheetId = get(req,"body.spreadsheetId");
    await deleteSpreadsheet({spreadsheetId});
    res.status(200)
}

export async function getAllSpreadsheetsHandler(req:Request, res:Response) {
    log.info('Get All Spreadsheets Handler Called');
    const receivedSpreadsheets = await getAllSpreadsheets();
    res.status(200).send(receivedSpreadsheets);
}

export async function updateChatHandler(req:Request, res:Response) {
    log.info('Update Chat Handler Called');
    const { spreadsheetId, message } = req.body;
   // const spreadsheet = await findSpreadsheet({spreadsheetId});
   // console.log(spreadsheet);
   const spreadsheet = await Spreadsheet.findOne({spreadsheetId}, {}, {});
    if (!spreadsheet) return res.status(404).send(`Milegrid with ${spreadsheetId} not found.`);
    if (spreadsheet.Chat!){
        spreadsheet.Chat.push(message);
       await spreadsheet.save();
    }
    res.sendStatus(200);
}