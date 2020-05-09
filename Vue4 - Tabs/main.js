var eventBus = new Vue()

Vue.component('product-desc-shipping-info',{
    props:{
        description:{ type:String, required:false },
        shipping : { type:Array, required:false }
    },
    data(){
        return {
            tabs: ['Product description','Shipping Info'],
            selectedTab : 'Shipping info'
        }
    },
    template:
    ` <div>
    
        <span class="tab" 
        :class="{activeTab: selectedTab === tab}"
        @click="selectedTab = tab"
        v-for="(tab, index) in tabs" :key="index">{{ tab }}</span>

        <div v-show = "selectedTab === 'Product description'">
        
            {{ description }}

        </div>

        <div v-show = "selectedTab === 'Shipping Info'">

            <ul>
                <li v-for="item in shipping">{{ item }}</li>
            </ul>

        </div>

    </div>`
})

Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required:false
        },
        items:{
            type:Array
        },
        desc:{type: String, required:true}
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
    template:`
        <div class="product">  
        <div class="product-image">
            <img :src="image" />
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>

            <button @click="addToCart" 
            :disabled="!onStock" :class="{disabledButton:!onStock}"
            >Add to cart</button>
            <button @click="removeFromCart">Remove from cart</button>
            
            <p>{{shipping}}</p>

            <p>{{Sale}}</p>
            <p v-show="onStock">IN STOCK</p>
            
            <p v-if="inventory >= 10">Quantity available : {{inventory}} units</p>
            <p v-else-if = "inventory > 0 && inventory < 10">HURRY UP. LIMITED STOCK. Only {{inventory}} units left</p>
            <p v-else>SORRY OUT OF STOCK NOW</p>

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

        <product-desc-shipping-info
        :description = "desc"
        :shipping = "['UPS','$20 per kg','Frustation free packaging','3 days shipping time']"
        ></product-desc-shipping-info>

        <product-tabs :reviews="reviews"></product-tabs>

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
            ],

            reviews : []
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
        updateImageIndex:function(index){
            this.selectedVariant = index
            // console.log(index)
        },
        addToCart:function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart:function(){
            this.$emit('remove-cart',this.variants[this.selectedVariant].variantId)
        },
    }
})

Vue.component('product-review',{
    data(){
        return {
            name: null,
            review:null,
            rating:null,
            recommend:null,
            errors:[]
        }
    },
    methods:{
        onSubmit:function(){
            this.errors=[]
            if(this.name && this.review && this.rating&&this.recommend){
                let productReview = {
                    name : this.name,
                    rating : this.rating,
                    review : this.review,
                    recommend : this.recommend
                }

                eventBus.$emit('review-submitted', productReview)

                this.name=null
                this.review=null
                this.rating=null
                this.recommend=null
            }
            else{
                if (!this.name)      this.errors.push("Name required")
                if (!this.review)    this.errors.push("Review required")
                if (!this.rating)    this.errors.push("Rating required")
                if (!this.recommend) this.errors.push("Product recommendation is required")
            }
        }        
    },

    template:
    `
    <div id = "review">

        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <form class="review-form" @submit.prevent="onSubmit">
            <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
            </p>
            
            <p>
            Would your recommend this product? 
            <label>
            Yes
            <input type="radio" value="Yes" v-model="recommend"/>
            </label>
            <label>
            No
            <input type="radio" value="No" v-model="recommend"/>
            </label>

            </p>

            <p>
            <input type="submit" value="Submit">  
            </p>    
        
        </form>
    </div>
    `
})

Vue.component('product-tabs',{
    data(){
        return {
            tabs:['Reviews', 'Make a review'],
            selectedTab:'Reviews'
        }
    },
    props:{
        reviews:{
            type:Array,
            required:true
        }
    },
    template:`
        <div>
            <span
                class="tab" 
                @click="selectedTab = tab"
                :class="{activeTab: selectedTab === tab}"
                v-for="(tab, index) in tabs" :key="index">
                {{ tab }}
            </span>

            <div v-show = "selectedTab === 'Reviews'"> 
                    
                <p v-if="reviews.length<=0">No reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>Name : {{ review.name }}</p>
                        <p>Review : {{ review.review }}</p>
                        <p>Rating : {{ review.rating }}</p>
                        <p>Recommend to others : {{ review.recommend }}</p>
                    </li>
                </ul>

            </div>

            <div v-show = "selectedTab === 'Make a review'">
                
                <product-review> </product-review>


            </div>
            
        </div>
    `
})