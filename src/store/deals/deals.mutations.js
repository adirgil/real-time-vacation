export default {
    setWishlist: ((state, wishlistArray) => state.wishlistArray = wishlistArray),

    insertToWishlist: ((state, id) => state.wishlistArray.push(id)),

    deleteFromWishlist: ((state, id) => {
        const index = state.wishlistArray.findIndex(w => w === id)
        state.wishlistArray.splice(index, 1)
    }),

    setDeals: ((state, deals) => state.deals = deals),

    setEditedDealId: ((state, id) => state.editedDealId = id),

    setEditedDeal: ((state, deal) => state.editedDeal = deal),

    resetEditedDealId: (state => state.editedDealId = ''),

    resetEditedDeal: (state => {
        for (const key in state.editedDeal) {
            state.editedDeal[key] = ''
        }
        delete state.editedDeal.id
    }),

    editDeal: ((state, deal) => {
        const index = state.deals.findIndex(d => d.id === deal.id)
        state.deals.splice(index, 1, deal)
    }),

    deleteDeal: ((state, dealId) => {
        const index = state.deals.findIndex(d => d.id === dealId)
        state.deals.splice(index, 1)
    }),

    insertDeal: ((state, deal) => {
        state.deals.push(deal)
    })
}