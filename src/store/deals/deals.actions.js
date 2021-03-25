import database from "../../middleware/firebase/database/realtime-db-index"
import firebaseDatabase from "@/middleware/firebase/database/realtime-db-index";

export default {
    getDeals: async ({commit}) => {
        const deals = await database.read({entity: 'deals'})
        const wishlist = await database.getWishListArray({id: window.user.uid})
        deals.forEach(deal => {
            wishlist.includes(deal.id) ? deal.isFavorite = true : deal.isFavorite = false
        })
        commit('setDeals', deals)
        commit('setWishlist', wishlist)
    },

    updateDeal: async ({state, commit}) => {
        const deal = {}
        Object.assign(deal, state.editedDeal)
        deal.id = state.editedDealId
        //Save in DB
        await database.update({entity: 'deals', id: deal.id, deal})

        //Save in Store
        commit('resetEditedDealId')
        commit('resetEditedDeal')
        commit('editDeal', deal)
    },

    setEditedDealById: async ({state, commit}) => {
        let deal = {}
        if (state.deals.length && state.deals.find(deal => deal.id === state.editedDealId)) {
            deal = state.deals.find(deal => deal.id === state.editedDealId)
        } else {
            deal = await database.readSingleDocById({entity: 'deals', id: state.editedDealId})
        }

        commit('setEditedDeal', deal)
    },

    deleteDeal: async ({state, commit}) => {
        console.log('from delete: ', state.editedDealId)
        await database.remove({entity: 'deals', id: state.editedDealId})
        const dealId = state.editedDealId
        commit('resetEditedDealId')
        commit('deleteDeal', dealId)
    },

    insertDeal: async ({state, commit}) => {
        const deal = {}
        Object.assign(deal, state.editedDeal)
        //Save in DB
        deal.id = await database.create({entity: 'deals', data: deal}).key

        //Save in Store
        commit('resetEditedDeal')
        commit('insertDeal', deal)

    },

    updateWishlist: async ({state, commit}, id) => {
        console.log(id,'id')
        const wishlist = await database.getWishListArray({id: window.user.uid})
        let newWishlistArr = []
        //STORE
        if (wishlist.includes(id)) {
            newWishlistArr = wishlist.filter(dealId => dealId !== id)
            commit('setWishlist',newWishlistArr )
        } else {
            wishlist.push(id)
            newWishlistArr = wishlist
            commit('setWishlist',newWishlistArr)
        }
        console.log(newWishlistArr, 'wishlist')
        //DB
        await database.changeWishList({userId: window.user.uid, arrayOfIds: newWishlistArr})
    }
}