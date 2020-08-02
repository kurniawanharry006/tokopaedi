class Product {
    constructor(nama, harga, gambar) {
        (this.nama = nama), (this.harga = harga), (this.gambar = gambar);
    }
}

var data = [
    new Product("Beras", 128000, "./assets/images/1.jpg"),
    new Product("Gula", 19300, "./assets/images/2.jpg"),
    new Product("Minyak Goreng", 25000, "./assets/images/3.jpg"),
    new Product("Terigu", 11200, "./assets/images/4.png"),
    new Product("Susu UHT", 19000, "./assets/images/5.jpg"),
    new Product("Teh", 6500, "./assets/images/6.jpg"),
    new Product("Kecap", 11000, "./assets/images/7.jpg"),
    new Product("Mentega", 8200, "./assets/images/8.jpg"),
];

var cartProduct = [];
var cartQty = [];

showData = (arr) => {
    let hasil = "";
    arr.map((val, idx) => {
        hasil += `
        <article class="product">
            <div class="img-container">
                <img src="${val.gambar}" alt="product" class="product-img">
                    <button class="bag-btn" data-id="1" onclick="addProduct(${idx})">
                        <i class="fas fa-shopping-cart"></i>
                            add to cart
                    </button>
             </div>
                 <h3>${val.nama}</h3>
            <h4>Rp.${val.harga},00</h4>
        </article>
        `;
    });
    document.getElementById("dataProduct").innerHTML = hasil;
};

addProduct = (idx) => {
    if (
        window.confirm(
            `Apakah anda ingin menambahkan ${data[idx].nama} ke dalam keranjang anda?`
        )
    ) {
        var qty = parseInt(prompt("Berapa banyak?"));

        if (!cartProduct.includes(data[idx])) {
            cartProduct.push(data[idx]);
            cartQty.push(qty);
        } else {
            cartQty[cartProduct.indexOf(data[idx])] += qty;
        }

        showCart(cartProduct);
    } 
};

addData = () => {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let img = document.getElementById("pic").value;
    var newData = new Product(name, price, img);
    data.push(newData);
    showData(data);
};

showCart = (arr) => {
    if (cartProduct.length > 0) {
        total = 0;
        totalPrice = 0;
        let hasil = "";
        arr.map((val, idx) => {
            hasil += `<tr>
                            <td>${val.nama}</td>
                            <td>${val.harga}</td>
                            <td><img src="${val.gambar}" width="50px"/></td>
                            <td>${cartQty[idx]}</td>
                            <td><input type="button" value="DELETE" onclick="deleteCart(${idx})" class="btn btn-danger"></td>
                        </tr>`;
        });
        for (var i = 0; i < cartQty.length; i++) {
            totalPrice += cartQty[i] * cartProduct[i].harga;
            total += cartQty[i];
        }

        document.getElementById(
            "cart-header"
        ).innerHTML = `CART ADA ${total} BARANG`;
        document.getElementById("total-cart").innerHTML = `${total}`;
        document.getElementById(
            "total-harga"
        ).innerHTML = `Total harga belanjaan anda adalah Rp.${totalPrice}`;
        document.getElementById("head-cart").innerHTML = `<tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Gambar</th>
            <th>Quantity</th>
            <th>Delete</th>
        </tr>`;
        document.getElementById("data-cart").innerHTML = hasil;
        document.getElementById(
            "checkout"
        ).innerHTML = `<input type="button" value="CHECKOUT" class="btn-warning" onclick="onCheckout()">`;
    } else {
        document.getElementById("cart-header").innerHTML = "CART KOSONG";
        document.getElementById("data-cart").innerHTML = "";
        document.getElementById("head-cart").innerHTML = "";
        document.getElementById("total-harga").innerHTML = "";
        document.getElementById("total-cart").innerHTML = 0;
        document.getElementById("checkout").innerHTML = "";
    }
};

onCheckout = () => {
    startTimer();
    document.getElementById("checkout").innerHTML = `<tr>
                                                        <td><input id="cash" placeholder="Input uang disini" type="number" ></td>
                                                        <td><input type="button" value="PAY" onclick="pay()" class="btn-info " ></td>
                                                    </tr>`;
};
checkoutTimer = () => {
    sec -= 1;
    document.getElementById(
        "countDown"
    ).innerHTML = `YOU HAVE ${sec} SECONDS LEFT`;
    if (sec == -1) {
        sec = 0;
        alert("TIME EXPIRED!");
        clearInterval(x);
        reset();
    }
};
var x;
var sec;
startTimer = () => {
    sec = 30;
    document.getElementById(
        "countDown"
    ).innerHTML = `YOU HAVE ${sec} SECONDS LEFT`;
    x = setInterval(checkoutTimer, 1000);
    // alert('masuk function')
};
pay = () => {
    var cash = document.getElementById("cash").value;
    var totalPrice = 0;
    for (var i = 0; i < cartQty.length; i++) {
        totalPrice += cartQty[i] * cartProduct[i].harga;
    }
    if (cash > totalPrice) {
        alert(`Terima kasih! Kembalian anda adalah Rp.${cash - totalPrice}`);
        clearInterval(x);
        reset();
    } else if (cash == totalPrice) {
        alert(`Terima kasih sudah membayar dengan uang pas!`);
        clearInterval(x);
        reset();
    } else if (cash < totalPrice) {
        alert(`Uang anda masih kurang Rp.${totalPrice - cash}`);
    }
};
reset = () => {
    cartProduct = [];
    cartQty = [];
    document.getElementById("countDown").innerHTML = ``;
    showCart(cartProduct);
};
deleteCart = (idx) => {
    if (
        window.confirm(
            `Apakah anda ingin menghapus ${cartProduct[idx].nama} dari keranjang anda?`
        )
    ) {
        var del = prompt("Berapa banyak?");
        if (del >= cartQty[idx]) {
            cartQty.splice(idx, 1);
            cartProduct.splice(idx, 1);
        } else {
            cartQty[idx] -= del;
        }
        showCart(cartProduct);
    }
};
showData(data);