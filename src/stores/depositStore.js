import {action, observable, decorate, computed} from "mobx";
import {db, storage} from "../firebase/firebase";
import firebase from "../firebase/firebase";

class DepositStore {
  depositData = null;
  loaded = false;

  get currentDeposit() {
    return this.depositData && this.depositData[0];
  }

  async setDeposit(imageUri, owner, by) {
    this.loaded = false;
    const getNumber = async () => {
      await this.loadAll();
      for(let i = 1; i <= 1000; i++) {
        if(this.depositData.filter(({_, data}) => data.bagNumber === i && data.status !== "Withdrawed").length === 0) return i;
      }
    };
    const storageRef = storage.ref(owner).child("deposit" + new Date().getTime());
    const fetchedImage = await (await fetch(imageUri)).blob();
    await storageRef.put(fetchedImage);
    console.log("uploaded an image");
    const imageUrl = await storageRef.getDownloadURL();
    const depositData = {
      imageUrl,
      owner,
      bagNumber: await getNumber(),
      status: "Deposited",
      events: [{
        event: "Deposited",
        timestamp: new Date(),
        by
      }]
    };
    const depositID = (await db.collection("deposits").add(depositData)).id;
    this.depositData = [{id: depositID, data: depositData}];
    this.loaded = true;
  }

  async withdraw(id, by) {
    db.collection("deposits").doc(id).update({
      status: "Withdrawed",
      events: firebase.firestore.FieldValue.arrayUnion({
        event: "Withdrawed",
        timestamp: new Date(),
        by
      })
    });
    }

  async loadAll() {
    const depositData = await db.collection("deposits").get();
    if (depositData) {
      let deposits = [];
      depositData.forEach((a) => deposits.push({id: a.id, data: a.data()}));
      this.depositData = deposits;
    }
  }

  async load(owner) {
    this.loaded = false;
    const depositData = await db.collection("deposits").where("owner", "==", owner).get();
    if (depositData) {
      let deposits = [];
      depositData.forEach((a) => deposits.push({id: a.id, data: a.data()}));
      this.depositData = deposits;
    }
    this.loaded = true;
  }

}

decorate(DepositStore, {
  depositData: observable,
  loaded: observable,
  load: action,
  setDeposit: action,
  currentDeposit: computed
});

export default new DepositStore();
