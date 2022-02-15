import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Spreadsheet, { SpreadsheetDocument } from "../../models/mongoDB";

export function createSpreadsheet(
  input: DocumentDefinition<SpreadsheetDocument>
) {
  return Spreadsheet.create(input);
}

export function findSpreadsheet(
  query: FilterQuery<SpreadsheetDocument>,
  options: QueryOptions = { lean: true }
) {
  return Spreadsheet.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<SpreadsheetDocument>,
  update: UpdateQuery<SpreadsheetDocument>,
  options: QueryOptions
) {
  return Spreadsheet.findOneAndUpdate(query, update, options);
}

export function deleteSpreadsheet(query: FilterQuery<SpreadsheetDocument>) {
  return Spreadsheet.deleteOne(query);
}

export function getAllSpreadsheets() {
  return Spreadsheet.find({});
}
