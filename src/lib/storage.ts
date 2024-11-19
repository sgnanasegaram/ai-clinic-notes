import { v4 as uuidv4 } from 'uuid';

// Anonymization function to remove personal identifiable information
export const anonymizeText = (text: string): string => {
  return text
    .replace(/\b[A-ZÆØÅa-zæøå]+\s+[A-ZÆØÅa-zæøå]+(?:\s+[A-ZÆØÅa-zæøå]+)?\b/g, '[NAVN]')
    .replace(/\b\d{10,11}\b/g, '[CPR]')
    .replace(/\b\d{8}\b/g, '[TLF]')
    .replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/g, '[EMAIL]')
    .replace(/\b\d{4}\s*[A-ZÆØÅ][a-zæøå]+\b/g, '[ADRESSE]');
};

// Store recording in IndexedDB
export const storeRecording = async (audioBlob: Blob): Promise<string> => {
  const id = uuidv4();
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readwrite');
    const store = tx.objectStore('recordings');
    
    const request = store.put(audioBlob, id);
    
    request.onerror = () => {
      db.close();
      reject(request.error);
    };
    
    request.onsuccess = () => {
      db.close();
      resolve(id);
    };
    
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
};

// Store clinical note in IndexedDB
export const storeClinicalNote = async (note: string): Promise<string> => {
  const id = uuidv4();
  const anonymizedNote = anonymizeText(note);
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const tx = db.transaction('notes', 'readwrite');
    const store = tx.objectStore('notes');
    
    const request = store.put(anonymizedNote, id);
    
    request.onerror = () => {
      db.close();
      reject(request.error);
    };
    
    request.onsuccess = () => {
      db.close();
      resolve(id);
    };
    
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
};

// Initialize IndexedDB
const openDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('clinicalData', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('recordings')) {
        db.createObjectStore('recordings');
      }
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes');
      }
    };
  });
};