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
        link: "https://get.foundation/index.html"
    }
})
