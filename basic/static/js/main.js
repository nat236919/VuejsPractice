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
                <!-- Cart -->
                <hr>
                <div class="cart">
                    <a v-on:click="addToCart" class="primary button"
                        :disabled="!inStock" :class="{ 'disable-button': !inStock}">Add to Cart</a>
                    <span v-show="cart>0" @click="removeFromCart" class="alert small button" style="display: inline-block">x</span>
                    <p class="secondary button hollow" style="display: inline-block;">Cart({{ cart }})</p>
                </div>
            </div>
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
            inventory: 5,
            onSale: true,
            cart: 0
        }
    },
    methods: {
        addToCart() {
            if (this.inventory > 0 && this.cart < this.inventory) this.cart += 1
            
        },
        removeFromCart() {
            if (this.inventory > 0) this.cart -= 1
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
    }
})


var app = new Vue({
    el: "#app",
    data: {
        premium: true
    }
})
