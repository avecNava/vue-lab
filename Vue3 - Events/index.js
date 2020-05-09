var app  = new Vue({
    el : '#app',
    data:{
        premium:true,
        details:['APPLE','MANGO','BANANA'],
        items:["80% cotton", "20% polyster","Gender Neutral"],
        cart:0,
        cartItems:[]
    },
    methods:{
    updateCart:function(id){
        this.cart += 1
        this.cartItems.push(id)
        // console.log("added " + id)
    },
    removeCart(id){
        if(this.cartItems.includes(id) > 0){
            var index = this.cartItems.indexOf(id)
            if(index>-1){
                this.cartItems.splice(index,1)
                this.cart -= 1
            }
        // console.log("removed item " + id)
        }
    },
    }
})