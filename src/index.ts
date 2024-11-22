import { getAuthToken, getClients } from "./api";
import { createGoogleSheet } from "./googleSheets";

async function main() {
  try {
    console.log("Получение токена...");
    const token = await getAuthToken();

    console.log("Получение данных клиентов...");
    const clients = await getClients(token);

    console.log("Создание Google-таблицы...");
    await createGoogleSheet(clients);

    console.log("Таблица успешно создана!");
  } catch (error: any) {
    console.error("Ошибка:", error.message);
  }
}

main();
