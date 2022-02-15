import mongoose from "mongoose";

export interface SpreadsheetDocument extends mongoose.Document {
  spreadsheetId: string;
  spreadsheetData?: [];
  Chat?: Message[];
}

export interface Message {
  userId: string;
  message: string;
  color: string;
}

const SpreadsheetSchema = new mongoose.Schema(
  {
    spreadsheetId: {
      type: String,
      required: true,
    },
    spreadsheetData: Array,
    Chat: Array,
  },
  { timestamps: true }
);


const Spreadsheet = mongoose.model<SpreadsheetDocument>('Spreadsheet',SpreadsheetSchema);

export default Spreadsheet;