import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { GOOGLE_API_PRIVATE_KEY, GOOGLE_EMAIL, SPREADSHEET_ID } from "./config";

const auth = new JWT({
  email: GOOGLE_EMAIL,
  key: GOOGLE_API_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function createGoogleSheet(clients: any[]): Promise<void> {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  await sheet.clear();
  await sheet.setHeaderRow([
    "id",
    "firstName",
    "lastName",
    "gender",
    "address",
    "city",
    "phone",
    "email",
    "status",
  ]);

  const rows = clients.map((client) => ({ ...client }));

  await sheet.addRows(rows);
}
