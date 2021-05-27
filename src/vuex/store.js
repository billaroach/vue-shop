import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import firebase from "firebase";
import { calculateAmount, calculateTotal, copyFunc } from "@/function";
require('firebase/firestore')
require('firebase/auth')
import {db} from '@/main'

let defaultUserData = {
    orders: {

    }
}



const store = new Vuex.Store({

    state: {                                                                            // состояния, здесь хранятся все наши данные
        // products section
        products: [],
        cart: {},
        delProduct: {},
        TotalPositions: 0,
        Total: 0,

        // service section
        processing: false,
        error: null,

        // user section
        user: {
            isAuthenticated: false,
            uid: null,
            name: null
        },

        userData: defaultUserData
    },
    mutations: {                                                                        // штука, с помощью которых мы меняем данные в состояниях;
        SET_PRODUCTS_TO_STATE: (state, products)   => {                                 // мутации синхронны (если вызовем одновременно 2 мутации,
            state.products = products;                                                  // то сначала выполнится первая, потом вторая
        },

        ADD_TO_CART: (state, product) => {
            state.TotalPositions++;
            if(product.id in state.cart) {
                state.cart[product.id].qt++;
            }
            else {
                let stateProduct = {...product};
                stateProduct.qt = 1;
                state.cart[product.id] = stateProduct;
            }
            state.Total = calculateAmount(state.cart);
        },

        REMOVE_PRODUCT: (state, product) => {
            state.delProduct = {};
            state.delProduct = copyFunc(state.cart, state.delProduct, product);
            delete state.cart[product];
            state.Total = calculateAmount(state.cart);
            state.TotalPositions = calculateTotal(state.cart);
        },

        CHANGE_QT: state => {
            state.TotalPositions = calculateTotal(state.cart);
            state.Total = calculateAmount(state.cart);
        },
        REVIVE: state => {
            state.cart = Object.assign(state.delProduct, state.cart);
            state.Total = calculateAmount(state.cart);
            state.TotalPositions = calculateTotal(state.cart);
        },

        SET_PROCESSING(state, payload) {
            state.processing = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAN_ERROR(state) {
            state.error = null;
        },

        // user section
        SET_USER(state, payload) {
            state.user.isAuthenticated = true;
            state.user.uid = payload;
        },
        SET_USER_NAME(state, payload) {
            state.user.name = payload;
        },
        SIGNOUT_USER(state) {
            state.user.isAuthenticated = false;
            state.user.uid = null;
        },

        SET_PRODUCTS(state, payload) {
            state.products = payload;
        },

        SET_USER_DATA(state, payload) {
            state.userData = payload;
        },

        ADD_USER_ORDER(state, payload) {
            state.userData.orders = payload.order;
        }


    },


    actions: {                                                                          // действия, если не хотим ждать эту очередь, действия асинхронны
        // fake-api вариант
        /*GET_PRODUCTS_FROM_API({commit}) {
            return axios('https://fakestoreapi.com/products/', {
                method: "GET"
            })
                .then((products) => {
                    commit('SET_PRODUCTS_TO_STATE', products.data);
                    return products;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },*/
        // firestore
        LOAD_PRODUCTS({commit}) {
            db.collection("products").get().then((querySnapshot) => {
                let products = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    let product = {
                        id: doc.data().id,
                        title: doc.data().title,
                        price: doc.data().price,
                        description: doc.data().description,
                        type: doc.data().type,
                        imageURL: doc.data().imageURL
                    }
                    products.push(product)
                });
                commit('SET_PRODUCTS_TO_STATE', products)
            })
        },

        addToCart: ({commit}, product) => {
            commit('ADD_TO_CART', product);
        },
        removeProduct: ({commit}, product) => {
            commit("REMOVE_PRODUCT", product);
        },
        changeQt: ({commit}) => {
            commit("CHANGE_QT");
        },
        revivalProduct: ({commit}) => {
            commit("REVIVE");
        },

        // user section
        SIGNUP({commit}, payload) {
            commit('SET_PROCESSING', true);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    firebase.auth().currentUser.updateProfile({displayName: payload.name})
                        .then(()=> commit('SET_USER_NAME', payload.name))
                    commit('SET_PROCESSING', false);
                    //commit('SET_USER', user.uid);
                    console.log(user);
                    // ...
                })
                .catch((error) => {

                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message);
                    console.log(error.message)
                    // ..
                });
        },

        SIGNIN({commit}, payload) {
            commit('SET_PROCESSING', true);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    commit('SET_PROCESSING', false);
                    //commit('SET_USER', user.uid);
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false);
                    commit('SET_ERROR', error.message);
                    console.log(error.message)
                });
        },

        SIGNOUT({commit}) {
            commit('SET_PROCESSING', true);
            firebase.auth().signOut()
                .then((userCredential) => {
                    // Signed out
                    commit('SET_PROCESSING', false);
                    commit('SIGNOUT_USER');
                    console.log("Successfully signed out");

                    // ...
                })

                .catch((error) => {
                    commit('SET_PROCESSING', false);
                    commit('SET_ERROR', error.message);
                    console.log(error.message)
                });


        },

        STATE_CHANGED({commit}, payload) {
            if(payload) {
                commit('SET_USER', payload.uid);
                commit('SET_USER_NAME', payload.displayName);
                console.log(payload.displayName)
                commit('LOAD_USER_DATA', payload.uid);
            }
            else {
                commit('SIGNOUT_USER');
            }
        },

        LOAD_USER_DATA({commit}, payload) {
            commit('SET_PROCESSING', true);
            let userDataRef = db.collection('userData').doc(payload);
            userDataRef.get()
                .then((data) => {
                    let userData = data.exists ? data.data() : defaultUserData
                    if (!userData.orders) {
                        userData.orders = {}
                    }

                    commit('SET_USER_DATA', userData);
                    commit('SET_PROCESSING', false);
                })
                .catch(() => {
                    commit('SET_PROCESSING', false);
                })
        },
        ADD_USER_ORDER({commit, getters}, payload) {
            commit('SET_PROCESSING', true);
            db.collection('userData').doc(getters.userId).delete()
                .then(() => {

                })
            let userDataRef = db.collection('userData').doc(getters.userId);

            let order = {
                addedDate: new Date(),
                amount: getters.Total,
                items: getters.cart
            }

            userDataRef.set({
                orders: {
                    order
                }
            }, {merge: true})
                .then(()=> {
                    commit('ADD_USER_ORDER', {order: order})
                })
        },

        LOAD_USER_ORDERS({commit}, payload) {
            let docRef = db.collection("userData").doc(payload);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },

        ADD_PRODUCT({commit}, payload) {
            commit('SET_PROCESSING', true);
                db.collection("products").doc(payload.id).set({
                    id: payload.id,
                    title: payload.title,
                    description: payload.description,
                    price: payload.price,
                    type: payload.type,
                    imageURL: payload.imageURL
                })
                    .then(() => {
                        console.log("Document successfully written!")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    })

        },

    },

    getters: {                                                                          // дают возможность получить информацию о данных в state (короткий путь)
        cart: ({cart}) => cart,
        delProduct: ({delProduct}) => delProduct,
        Total: ({Total}) => Total,
        TotalPositions: ({TotalPositions}) => TotalPositions,
        Products: ({products}) => products,

        getProcessing: (state) => state.processing,
        getError:(state) => state.error,
        isUserAuthenticated:(state) => state.user.isAuthenticated,
        userData:(state) => state.userData,
        userId:(state) => state.user.uid,
    },
});

export default store;