import firebaseInstance from '../firebase-index'
import database from 'firebase/database'
import firebaseIndex from "@/middleware/firebase/firebase-index";


function create(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
        .push(options.data)
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`)
        .remove().then(res => {
            // console.log('res from remove', res)
        })

}

//when deleting deal
function removeFromWishlist(options){

}

function update(options) {
    return firebaseInstance.firebase.database().ref(`/${options.entity}/${options.id}`).update(options.deal);
}

function getRef(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
}

function read(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
        .once('value')
        .then(res => {
            // console.log('from get: ', res.val())
            const arr = []
            const map = res.val()
            for (const key in map) {
                const deal = map[key]
                deal.id = key
                arr.push(deal)
            }
            return arr
        })
}

function readSingleDocById(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`)
        .once('value')
        .then(res => {

            return res.val()

        })
}

async function uploadFiles(options) {
    let urlArray = []
    for(const file of options.files){
        const storageRef = firebaseInstance.firebase.storage().ref(`${options.entity}/${file.name}`)
        const snapshot = await storageRef.put(file)
        const urlString = await storageRef.getDownloadURL()
        urlArray.push(urlString)
        // console.log('url: ',urlString)
    }
    return urlArray
}

function getWishListArray(options){
    return firebaseInstance.firebase.database().ref(`users/${options.id}/wishlist`)
        .once('value')
        .then(res => {
            return res.val() ? res.val() : []
        })
}

function changeWishList(options){
    return firebaseInstance.firebase.database().ref(`/users/${options.userId}/wishlist`)
        .set(options.arrayOfIds);

}

// function removeFromWishList(options){
//     return firebaseInstance.firebase.database().ref(`users/${options.userId}`)
//
//         .child(`${options.dealId}`).remove()
// }


export default {
    create,
    read,
    remove,
    readSingleDocById,
    update,
    getRef,
    uploadFiles,
    changeWishList,
    //removeFromWishList,
    getWishListArray
}