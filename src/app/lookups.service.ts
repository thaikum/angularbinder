import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Lookups {
  lookups: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  private lookupDocument!: AngularFirestoreDocument<Lookups>;
  private userId = localStorage.getItem('dataBinderUser');
  private lookupCollection!: AngularFirestoreCollection<Lookups>;
  constructor(private firestore: AngularFirestore) {}

  // tslint:disable-next-line:typedef
  async createLookup(email: string, uid: string) {
    this.lookupDocument = this.firestore.doc('lookups/' + uid);
    const look = await this.lookupDocument.set({
      lookups: 0,
      email,
    });
    return look;
  }

  decrementLookup(): any {
    const data = this.firestore
      .doc('lookups/' + this.userId)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          // @ts-ignore
          const look = doc.data().lookups - 1;
          this.firestore
            .doc('lookups/' + this.userId)
            .update({ lookups: look });
        }
      });
  }

  getLookups(): any {
    this.lookupDocument = this.firestore.doc('lookups/' + this.userId);
    return this.lookupDocument.valueChanges();
  }

  getAllUsersLookups(): Observable<Lookups[]> {
    this.lookupCollection = this.firestore.collection('lookups');
    return this.lookupCollection.valueChanges({ idField: 'docId' });
  }

  async setLookups(lookups: number, user: string): Promise<any> {
    console.log('lookups = ', lookups);
    await this.firestore
      .doc('lookups/' + user)
      .update({ lookups })
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw err;
      });
  }
}
