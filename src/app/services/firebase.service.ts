import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }

  getDataQuery(collection: string) {
    return this.db.collection(collection).snapshotChanges().pipe(map(rooms => {
      return rooms.map(item => {
        const data: any = item.payload.doc.data();
        data. id = item.payload.doc.id;
        return data;
      })
    }))
  }

  addData(collection: string, id: string, json) {
    this.db.collection(collection).doc(id).set(json);
  }

  updateData(collection: string, id: string, json){
    this.db.collection(collection).doc(id).update(json);
  }
}
