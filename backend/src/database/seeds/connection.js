let db;

export default async function initializeDbConnection() {
  // TODO: implements db connection
  return true;
}

export function getDatabase() {
  if (!db) {
    console.error('No database found');
  }

  return db;
}
