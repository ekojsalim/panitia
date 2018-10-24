import {action, observable, decorate} from "mobx";
import {db} from "../firebase/firebase";
import firebase from "../firebase/firebase";

class TicketStore {
  ticketID = null;
  ticketData = null;
  loaded = false;

  setID(id = null) {
    this.ticketID = id;
  }

  resetID() {
    this.setID(null);
    this.ticketData = null;
    this.loaded = false;
  }

  registerTicket(by) {
    db.collection("tickets").doc(this.ticketID).set({
      state: "Registered",
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
    this.setID(id);
    const ticketData = await db.collection("tickets").doc(id).get();
    if(ticketData.exists) {
      this.ticketData = ticketData.data();
    }
    this.loaded = true;
  }

}

decorate(TicketStore, {
  ticketID: observable,
  ticketData: observable,
  loaded: observable,
  setID: action,
  resetID: action,
  registerTicket: action,
  markEnter: action,
  loadTicket: action,
  markExit: action
});

export default new TicketStore();
