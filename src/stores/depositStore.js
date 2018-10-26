import { action, observable, decorate } from "mobx";
import { db, storage } from "../firebase/firebase";
import firebase from "../firebase/firebase";

class DepositStore {
    currentDepostId = null;
    deposits = null;
    loaded = false;

    async setDeposit(imageUri, owner, by) {
        const storageRef = storage.ref(owner).child("deposit");
        await fetch(this.imageData)
            .then(res => res.blob())
            .then(blob =>
                storageRef.put(blob).then(function () {
                    console.log("uploaded an image");
                })
            );
        const imageUrl = await storageRef.getDownloadURL();
        db.collections("deposits").add({
            imageUrl,
            owner,
            status: "Deposited",
            events: [{
                event: "Deposited",
                timestamp: new Date(),
                by
            }]
        });
    }

    reset() {
        this.setID(null);
        this.ticketData = null;
        this.loaded = false;
    }

    async registerTicket(by, name = "") {
        const storageRef = storage.ref(this.ticketID).child("image");
        await fetch(this.imageData)
            .then(res => res.blob())
            .then(blob =>
                storageRef.put(blob).then(function (snapshot) {
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

    async load(owner) {
        this.loaded = false;
        const depositData = await db.collection("deposits").where("owner", "==", owner).get();
        if (depositData) {
            this.depositData = depositData.data();
        }
        this.loaded = true;
    }

}

decorate(DepositStore, {
    ticketID: observable,
    ticketData: observable,
    loaded: observable,
    setID: action,
    resetID: action,
    registerTicket: action,
    markEnter: action,
    loadTicket: action,
    markExit: action,
    setImage: action
});

export default new DepositStore();
