import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  // Create connection to the database
  const db = await openDB('jate', 1);
  // Create new transaction and specify the db and readwrite privilege
  const tx = db.transaction('jate', 'readwrite');
  // Open up the desired object store
  const store = tx.objectStore('jate');
  // Use the .put() method to add content
  const request = store.put({ id: 1, value: content });

  try{
    await request;
    console.info("Content added to the database");
  } catch(err){
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    
    const tx = db.transaction('jate', 'readonly');
    
    const store = tx.objectStore('jate');
    
    const request = store.getAll();
    
    const result = await request;
    console.log('result.value', result);
    
    console.info("Retrieving information from the database");

    return result;
  } catch (err) {
    console.error('getDb not implemented', err);
    
  }
};


initdb();
