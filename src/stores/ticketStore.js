import {action, observable, decorate} from "mobx";
import {db, storage} from "../firebase/firebase";
import firebase from "../firebase/firebase";

class TicketStore {
  ticketID = null;
  ticketData = null;
  imageData = null;
  loaded = false;
  loading = false;

  setID(id = null) {
    this.ticketID = id;
  }

  resetID() {
    this.setID(null);
    this.ticketData = null;
    this.loaded = false;
  }

  async registerTicket(by, name="") {
    const storageRef = storage.ref(this.ticketID).child("image");
    await fetch(this.imageData)
    .then(res => res.blob())
    .then(blob =>
        storageRef.put(blob).then(function(snapshot) {
            console.log("uploaded an image");
        })
    );
    const imageUrl = await storageRef.getDownloadURL()
    db.collection("tickets").doc(this.ticketID).set({
      state: "Registered",
      name,
      imageUrl,
      events: [{
        event: "Registered",
        timestamp: new Date(),
        by
      }]
    });
  }

  markEnter(by) {
    db.collection("tickets").doc(this.ticketID).update({
      state: "Entered",
      events: firebase.firestore.FieldValue.arrayUnion({
        event: "Entered",
        timestamp: new Date(),
        by
      })
    });
  }

  markExit(by) {
    db.collection("tickets").doc(this.ticketID).update({
      state: "Exited",
      events: firebase.firestore.FieldValue.arrayUnion({
        event: "Exited",
        timestamp: new Date(),
        by
      })
    });
  }

  async loadTicket(id) {
    this.loaded = false;
    this.loading = true;
    this.setID(id);
    const ticketData = await db.collection("tickets").doc(id).get();
     if(ticketData.exists) {
      this.ticketData = ticketData.data();
    }
    this.loading = false;
    this.loaded = true;
  }

  setImage(dataUri) {
    this.imageData = dataUri;
  }

}

decorate(TicketStore, {
  ticketID: observable,
  ticketData: observable,
  loading: observable,
  loaded: observable,
  setID: action,
  resetID: action,
  registerTicket: action,
  markEnter: action,
  loadTicket: action,
  markExit: action,
  setImage: action
});

export default new TicketStore();
