import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

firebase.initializeApp(firebaseConfig);

var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child('images');


export const uploadImage = (image: File): Promise<{name: string, url:string}> => {
    const imageName  = Date.now().toString() + "-" + image.name
    const ref = imagesRef.child(imageName)

    return new Promise((resolve, reject) => {
        ref.put(image).then(snap => {
            ref.getDownloadURL().then(url => {
                resolve({"name":ref.name, "url":url})
            }).catch(reject)
        }).catch(reject)
    })
}
