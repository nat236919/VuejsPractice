var eventBus = new Vue()


Vue.component("hero", {
    props: {
        details: {
            type: Object,
            required: true
        }
    },
    template: `
    <div class="hero-section">
        <div class="hero-section-text">
            <h1>{{ details.head }}</h1>
            <h5>{{ details.desc }}</h5>
        </div>
    </div>
    `
})


var hero = new Vue({
    el: "#hero",
    data() {
        return {
            details: {
                head: "This is Vue.js practice",
                desc: "Hellooooooooooooooooo Thereeeeeeeeeeeeee"
            }
        }
    }
})


Vue.component("product-details", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul class="disc">
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})


Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Please correctly the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

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
                <label for="rating">Will you recommend this product to friends?</label>
                <input type="radio" id="Yes" value="yes" v-model="recommendation">
                <label for="one">Yes</label>
                <br>
                <input type="radio" id="No" value="no" v-model="recommendation">
                <label for="two">No</label>
                <br>
            </p>
                
            <p>
                <input type="submit" value="Submit">  
            </p>    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommendation: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommendation) {
                // Get review data
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendation: this.recommendation
                }
                eventBus.$emit("review-submitted", productReview)
                // Reset values
                this.name = null
                this.review = null
                this.rating = null
                this.recommendation = null
                this.errors = []
            } else {
                this.errors = []
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommendation) this.errors.push("Recommendation required.")
            }
        }
    }
})


Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:`
        <div>
            <h2>Reviews</h2>
            <div>
                <span class="secondary button hollow"
                    :class="{ activeTab: selectedTab === tab }"
                    v-for="(tab, index) in tabs"
                    :keys="index"
                    @click="selectedTab = tab">
                    {{ tab }}</span>
            </div>

            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">{{ review }}</li>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})


Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="grid-container">
        <div class="card" style="width: 500px; height: auto;">
            <!-- Product -->
            <div class="card-divider">Product</div>

            <!-- Image -->
            <img v-bind:src="image" style="height: 150px; width: 150px;" alt="Card image cap">

            <!-- Info -->
            <div class="card-section">
                <!-- Title -->
                <h4 style="display: inline-block">{{ title }}</h4>
                <!-- Status -->
                <div style="display: inline-block">
                    <p v-if="inventory > 10" class="success label">In Stock</p>
                    <p v-else-if="inventory > 0 && inventory <= 10" class="warning label">
                        Almost Out of Stock ({{ inventory }} left)
                    </p>
                    <p v-else class="alert label">Out of Stock</p>
                    <p v-show="onSale" class="badge alert">SALE!!</p>
                </div>
                <!-- Description, Details, and Shipping -->
                <p>{{ desc }}</p>
                <product-details :details="details"></product-details>
                <p>Shipping: {{shipping}}</p>
                <hr>
                <div v-for="(variant, index) in variants" :key="variant.variantId"
                    class="color-box" :style="{'background-color': variant.variantColor}"
                    @mouseover="updateProductImage(index)">
                </div>
                <br>
                <div v-for="size in sizes" style="display: inline-block">
                    <a href="#" target="_blank" class="secondary button hollow">{{ size }}</a>
                </div>
                <!-- Add to Cart -->
                <hr>
                <a v-on:click="addToCart" class="primary button" :disabled="!inStock" :class="{ 'disable-button': !inStock}">Add to Cart</a>
                <span v-on:click="removeFromCart" class="alert small button" style="display: inline-block">x</span>
            </div>

            <!-- Product Review -->
            <product-tabs :reviews="reviews"></product-tabs>

        </div>
    </div>
    `,
    data() {
        return {
            selectedVariant: 0,
            brand: "Nike",
            product: "Socks",
            desc: "Who doesn't love to have a good pair of socks? Get yourself a treat :)",
            details: ["80% cotton", "19% polyester", "1% love", "LGBT friendly"],
            variants: [
                {
                    variantId: 1,
                    variantColor: "black",
                    variantImage: "https://www.sourpussclothing.com/media/catalog/product/cache/1/thumbnail/120x170/9df78eab33525d08d6e5fb8d27136e95/s/p/speckled_knee_socks_black_1.jpg"
                },
                {
                    variantId: 2,
                    variantColor: "green",
                    variantImage: "https://sockbroker.com/image/cache/data/Mens/green-socks/KellyGree-mens-socks-kkeik-162x162.jpg"
                }
            ],
            sizes: ["S", "M", "L", "XL"],
            inventory: 11,
            onSale: true,
            reviews: []
        }
    },
    methods: {
        addToCart() {
            if (this.inventory > 0)
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart')
        },
        updateProductImage: function(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.inventory > 0
        },
        shipping() {
            if (this.premium)
                return "Free"
            return "$69"
        }
    },
    mounted() {
        eventBus.$on("review-submitted", productReview => {
            this.reviews.push(productReview)
        })
    }
})


var app = new Vue({
    el: "#app",
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart() {
            this.cart.pop()
        }
    }
})
