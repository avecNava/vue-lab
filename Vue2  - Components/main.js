Vue.component('product-details',{
    props:{
        details:{
            type:Array,
            required:true
        },
    },
    template:`
        <ul>
            <li v-for ="item in details">{{ item }}</li> 
        </ul>
    `
})

Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required:false
        },
        items:{
            type:Array
        }
    },
    template:`
    <div class="product">
  
    <!-- <div class="product-image">
      <img :src="my_image" />
    </div> -->

    <div class="product-image">
      <img :src="image" />
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>

        <button 
        @click="addToCart" 
        :disabled="!onStock"
        :class="{disabledButton:!onStock}"
        >Add to cart</button>

        <div class="cart"><p>{{cart}}</p></div>
        <button @click="removeFromCart()">-</button>
        <!-- <span v-if="onStock">In Stock</span>
        <span v-else>Out of Stock</span> -->
        
        <p>{{shipping}}</p>

        <p>{{Sale}}</p>
        <p v-show="onStock">IN STOCK</p>
        <p 
          v-show="!onStock"
          :class="{outOfStockXX:!onStock}"
          :style="{textDecoration:'line-through'}"
        >OUT OF STOCK</p>

        <p v-if="inventory >= 10">Quantity available : {{inventory}} units</p>
        <p v-else-if = "inventory > 0 && inventory < 10">HURRY UP. LIMITED STOCK. Only {{inventory}} units left</p>
        <p v-else>SORRY OUT OF STOCK NOW</p>

        <!-- <p v-show="onSale">ON SALE</p> -->

        Composition:
        <ul>
            <li v-for="item in items">{{item}}</li>
        </ul>
         
        <div class="color-box"
             v-for="(variant,index) in variants"  
             :key="variant.variantId"
             :style="{backgroundColor:variant.variantColor}"
             @click="updateImage(variant.variantImage)"
             @mouseover="updateImageIndex(index)"
            >
        </div>

        Sizes: 
        <table>
            <tr>
                <th>Size</th><th>Description</th>
            </tr>
            <tr v-for="size in sizes">
                <td> {{size.code}} </td>
                <td> {{size.desc}} </td>
            </tr>
        </table>

      <a :href="link" target="_blank">More products like this</a>

    </div>
    
  </div>
    `
    ,
    data() {
        return {
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
        }         
    },
    computed:{
        title(){
            return this.brand + " " + this.product
        },
        
        image(){
            return this.path_to_asset + this.variants[this.selectedVariant].variantImage
        },

        shipping(){
            if(this.premium)
            return "FREE Shipping"
            else
            return "$5.00 Shipping"
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