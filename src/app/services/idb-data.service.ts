import { Injectable } from '@angular/core';
import { ISVGdata } from '../interfaces/isvgdata';

@Injectable({
  providedIn: 'root'
})
export class IdbDataService {
  db;
  count: number;
  items: Array<ISVGdata> = [];

  constructor() {
    this.open().then(res => ''/* console.log(res) */);
  }

  open(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve('opened');
      } else {
        let request = indexedDB.open('storageSVG', 1);
        this.count = 0;

        request.onerror = event => {
          console.log('Error open IDB');
          console.dir(event);
          reject('Error open IDB');
        };
        request.onupgradeneeded = e => {
          // console.log('onupgradeneeded');
          // console.log(e.target);
          let thisDB = e.target['result'];
          let objectStore;

          if (!thisDB.objectStoreNames.contains('storageSVG')) {
            objectStore = thisDB.createObjectStore('storageSVG', {keyPath: 'timeStamp'});
            // objectStore = thisDB.createObjectStore("books", {autoIncrement: true});

            // objectStore.createIndex("by_title", "title", {unique: true});
            // objectStore.createIndex("by_author", "author", {unique: false});

            // objectStore.add({title: "Quarry Memories", author: "Fred", isbn: 123456});
            // objectStore.add({title: "Water Buffaloes", author: "Fred", isbn: 234567});
          }
        };

        request.onsuccess = () => {
          this.db = request.result;
          // console.log('open idb');
          // console.log(this.db);

          let objectStore = this.db.transaction('storageSVG').objectStore('storageSVG');
          objectStore.openCursor().onsuccess = e => {
            let cursor = e.target.result;
            if (cursor) {
              this.count = this.count + 1;
              this.items.push({
                timeStamp: cursor.key,
                comment: cursor.value.comment,
                data: cursor.value.data
              });
              cursor.continue();
            }
          };
          resolve('opened idb');
        };
      }
    });
  }

  getCount(): number {
    return this.count;
  }

  getItems(): Array<ISVGdata> {
    return this.items;
  }

  put(data: ISVGdata): Promise<string> {
    return new Promise((resolve, reject) => {
      let request = this.db.transaction(['storageSVG'], 'readwrite').objectStore('storageSVG')
        .put(data);

      request.onsuccess = () => {
        // console.log('succes SAVE idb');
        this.count++;
        this.items.push(data);
        resolve('success_save');
      };

      request.onerror = () => {
        console.log('onerror SAVE idb "aready exist"');
        resolve('Error: item aready exist');
      };
    });
  }

  remove(item: ISVGdata): Promise<string> {
    return new Promise((resolve, reject) => {
      let request = this.db.transaction(['storageSVG'], 'readwrite').objectStore('storageSVG')
        .delete(item.timeStamp);

      request.onsuccess = () => {
        // console.log('succes Remove idb');
        this.count--;
        this.items.splice(this.items.indexOf(item), 1);
        resolve('success_remove');
      };

      request.onerror = () => {
        console.log('Error: onremove');
        resolve('Error: onremove');
      };
    });
  }

  /*getItemsIDB() {
    let objectStore = this.db.transaction('storageSVG').objectStore('storageSVG');
    objectStore.openCursor().onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        this.items.push({
          timeStamp: cursor.key,
          comment: cursor.value.comment,
          data: cursor.value.data
        });
        cursor.continue();
      }
    };
  }

  getAllItems1() {
    return new Promise((resolve, reject) => {
      this.open().then(res => {
        let objectStore = this.db.transaction('storageSVG').objectStore('storageSVG');
        let items: Array<ISVGdata> = [];
        objectStore.openCursor().onsuccess = event => {
          let cursor = event.target.result;
          if (cursor) {
            items.push({
              timeStamp: cursor.key,
              comment: cursor.value.comment,
              data: cursor.value.data
            });
            cursor.continue();
          } else {
            resolve(items);
          }
        };
      });
    });
  }

  getAllItems() {
    return new Promise((resolve, reject) => {
      let objectStore = this.db.transaction('storageSVG').objectStore('storageSVG');
      let items: Array<ISVGdata> = [];
      objectStore.openCursor().onsuccess = event => {
        let cursor = event.target.result;
        if (cursor) {
          items.push({
            timeStamp: cursor.key,
            comment: cursor.value.comment,
            data: cursor.value.data
          });
          cursor.continue();
        } else {
          resolve(items);
        }
      };
    });
  }*/
}
