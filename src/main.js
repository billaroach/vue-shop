import { createApp } from 'vue'
import App from './App.vue'
import store from "@/vuex/store.js";
import router from "@/router/router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import firebase from "firebase";
import "firebase/firestore"
import firebaseConfig from "@/firebase-config/firebaseConfig";
export const adminUID = 'Bkrh2b1bitfnfNCveEviZ3sxENE3';

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
db.settings({
    timestampsInSnapshot: true
})



const myApp = createApp(App);
myApp.use(store);
myApp.use(router);
myApp.mount('#app')
//createApp(App).use(store).mount('#app')





