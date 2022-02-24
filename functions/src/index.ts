import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsModule from 'cors';

const cors = corsModule({ origin: true });
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

export const deleteUser = functions.https.onRequest((req, resp) => {
  cors(req, resp, () => {
    const userUid = req.body.uid;
    console.log('uid: ', userUid);

    let deleted = false;
    let error = '';
    admin
      .auth()
      .deleteUser(userUid)
      .then(() => {
        deleted = true;
      })
      .catch((err) => {
        error = err.valueOf();
        console.log(err);
      });

    if (deleted) {
      resp.status(200).send('user deleted successfuly');
    } else {
      resp.status(406).send(error);
    }
  });
});
