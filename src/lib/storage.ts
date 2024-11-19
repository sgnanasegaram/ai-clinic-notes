// Utility functions for handling secure storage of recordings and notes
import { v4 as uuidv4 } from 'uuid';

// Anonymization function to remove personal identifiable information
export const anonymizeText = (text: string): string => {
  // Replace common patterns of personal information
  return text
    .replace(/\b[A-ZÆØÅa-zæøå]+\s+[A-ZÆØÅa-zæøå]+(?:\s+[A-ZÆØÅa-zæøå]+)?\b/g, '[NAME]') // Names
    .replace(/\b\d{10,11}\b/g, '[CPR]') // CPR numbers
    .replace(/\b\d{8}\b/g, '[PHONE]') // Phone numbers
    .replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/g, '[EMAIL]') // Email addresses
    .replace(/\b\d{4}\s*[A-ZÆØÅ][a-zæøå]+\b/g, '[ADDRESS]'); // Postal codes with city
};

// Store recording in IndexedDB (temporary storage)
export const storeRecording = async (audioBlob: Blob): Promise<string> => {
  const id = uuidv4();
  // In a real implementation, this would be encrypted and stored securely
  // For demo purposes, we're using IndexedDB
  const db = await openDB();
  const tx = db.transaction('recordings', 'readwrite');
  const store = tx.objectStore('recordings');
  await store.put(audioBlob, id);
  await tx.done;
  return id;
};

// Store clinical note in IndexedDB (temporary storage)
export const storeClinicalNote = async (note: string): Promise<string> => {
  const id = uuidv4();
  const anonymizedNote = anonymizeText(note);
  const db = await openDB();
  const tx = db.transaction('notes', 'readwrite');
  const store = tx.objectStore('notes');
  await store.put(anonymizedNote, id);
  await tx.done;
  return id;
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