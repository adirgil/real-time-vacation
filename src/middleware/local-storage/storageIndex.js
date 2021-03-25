export default {
    insertToLocalStorage: function (table, deal) {
        deal.id = new Date().getTime()

        var arrOfDeals = this.selectAllDeals(table)
        arrOfDeals.push(deal)
        localStorage.setItem(table, JSON.stringify(arrOfDeals))
    },
    selectAllDeals: function (table) {
        var result = JSON.parse(localStorage.getItem(table))
        if (result == null) {
            result = []
        }
        return result
    },
    remove: function (table, id) {
        var arrOfObj = this.selectAllDeals(table)
        var found = this.findIndexById(table, id)
        arrOfObj.splice(found, 1)
        localStorage.setItem(table, JSON.stringify(arrOfObj))
    },
    update: function (table, id, deal) {
        var arrOfObj = this.selectAllDeals(table)
        var found = this.findIndexById(table, id)
        if (found == undefined) return;
        for (var key in deal) {
            if (deal[key]) {
                arrOfObj[found][key] = deal[key]
            }
        }
        localStorage.setItem(table, JSON.stringify(arrOfObj))
    },
    getDealById: function (table, id) {
        var arrOfObj = this.selectAllDeals(table)
        return arrOfObj.find(deal => deal.id == id)
    },
    findIndexById: function (table, id) {
        var arrOfObj = this.selectAllDeals(table)
        var found
        for (var i = 0; i < arrOfObj.length; i++) {
            if (arrOfObj[i].id == id) {
                found = i
                break;
            }
        }
        return found
    },
    getDeal: function () {
        return {
            sellerName: document.getElementById("seller-name").value,
            phone: document.getElementById("phone").value,
            airline: document.getElementById("airline").value,
            date: document.querySelector('input[type="date"]').value,
            price: document.getElementById("price").value,
            days: document.getElementById("days").value,
            hotel: document.getElementById("hotel").value,
        }
    },
    insertToWishListArr: function (id) {
        var arrayOfWishListIds = this.selectAllWishListIds()
        var foundIndex = -1
        for (var i = 0; i < arrayOfWishListIds.length; i++) {
            if (arrayOfWishListIds[i] == id) {
                foundIndex = i
            }
        }
        if (foundIndex != -1) {
            arrayOfWishListIds.splice(foundIndex, 1)
        } else {
            arrayOfWishListIds.push(id)
        }
        localStorage.setItem('wishList', JSON.stringify(arrayOfWishListIds))
    },
    removeFromWishListById: function (id) {
        var arrOfWishList = this.selectAllWishListIds()
        var found = -1
        for (var i = 0; i < arrOfWishList.length; i++) {
            if (arrOfWishList[i] == id) {
                found = i
                break;
            }
        }
        if (found != -1) {
            arrOfWishList.splice(found, 1)
            localStorage.setItem('wishList', JSON.stringify(arrOfWishList))
        }
    },
    selectAllWishListIds: function () {
        var result = JSON.parse(localStorage.getItem('wishList'))
        if (result == null) {
            result = []
        }
        return result
    }


}
