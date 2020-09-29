var hero = new Vue({
    el: "#hero",
    data: {
        'head': 'VueJS Test',
        'desc': 'This is a modified jumbotron that occupies the entire horizontal space of its parent.'
    }
})

var app = new Vue({
    el: "#app",
    data: {
        image: "https://rohan.imgix.net/product/05706H08.jpg",
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
        inventory: 7,
        onSale: true,
        cart: 0
    },
    methods: {
        addToCart() {
            if (this.inventory > 0 && this.cart < this.inventory) this.cart += 1
            
        },
        removeFromCart() {
            if (this.inventory > 0) this.cart -= 1
        },
        updateProductImage: function(variantImage) {
            this.image = variantImage
        }
    }
})
