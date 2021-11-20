import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const keepRecord = functions.firestore
  .document('lookups/{documentId}')
  .onUpdate((snap) => {
    const original = snap.before.data();
    const updated = snap.after.data();

    const changedLookups = updated.lookups - original.lookups;
    const date = new Date();

    if (changedLookups > 0) {
      admin
        .firestore()
        .collection('recent')
        .add({
          email: original.email,
          change: changedLookups,
          date,
        })
        .then();
    }
  });
