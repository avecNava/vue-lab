var app  = new Vue({
    el : '#app',
    data: {
            message: 'Hello Vue',
            description : 'Welcome to the new Vue app',
            product: 'Socks',
            brand:'Vue Mastery',
            path_to_asset:'assets/img/',
            // img1: 'Vue-socks-green.jpg',
            link: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
            cart : 0,
            selectedVariant:0,            
            variants : [
                {   variantId:1215, 
                    variantColor:'Blue',
                    variantImage: 'Vue-socks-blue.jpg',
                    variantQuantity:8,
                    variantSalePercentage:.5,
                },
                {   variantId:1216, 
                    variantColor:'Green',
                    variantImage: 'Vue-socks-green.jpg',
                    variantQuantity: 100,
                    variantSalePercentage:.75
                },
            ],
            sizes : [
                {code:"XS", desc: "2 to 3 years old"},
                {code:"S", desc: "4 to 8 years old"},
                {code:"M", desc: "9 to 12 years old"},
                {code:"L", desc: "13 to 25 years old"},
                {code:"XL", desc: "26 to 40 years old"},
                {code:"XXL", size_desc: "41 to 60 years old"},
            ]   
    },       

    computed:{
        title(){
            return this.brand + " " + this.product
        },
        
        image(){
            return this.path_to_asset + this.variants[this.selectedVariant].variantImage
        },

        // my_image(){
        //     return this.path_to_asset + this.img1
        // },


        onStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        inventory(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        Sale(){
            
            if(this.variants[this.selectedVariant].variantSalePercentage > 0){
                return this.brand  + ' ' + this.product + ' is now ON SALE'
            }

             return this.brand  + ' ' + this.product + ' is NOT ON SALE'
        },

        onSale(){                
            return this.variants[this.selectedVariant].variantSalePercentage > 0
        }

    },

    methods:{
        addToCart:function(){
            this.cart += 1
        },
        removeFromCart(){
            if(this.cart > 0)
               this.cart -= 1
        },
        updateImage:function(variantImage){
            this.img1 = variantImage
        },
        updateImageIndex:function(index){
            this.selectedVariant = index
        },
    }
})