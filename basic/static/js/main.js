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
                variantColor: "black"
            },
            {
                variantId: 2,
                variantColor: "green"
            }
        ],
        sizes: ["S", "M", "L", "XL"],
        inventory: 11,
        onSale: true,
        link: "https://get.foundation/index.html"
    }
})
