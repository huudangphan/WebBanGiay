var usero = ['dang1']
var passo = ['123123']

function register() {
    var name = document.formDK.user.value;
    var pass = document.formDK.password.value;
    var pass2 = document.formDK.checkpassword.value;
    // var email = document.formDK.email.value;
    var phone = document.formDK.sdt.value;
    // var atposition = email.indexOf("@");
    // var dotposition = email.lastIndexOf(".");


    if (name == usero[i]) {
        alert("Tài khoản đã có người đăng ký !!!");
        return false;
    } else if (name == "") {
        alert("Tài Khoản Không Được Trống!!!");
        return false;
    } else if (pass.length < 6) {
        alert("Mật khẩu phải dài hơn 6 chữ số")
        return false;
    } else if (pass2 == "") {
        alert("Xác Nhận Mật Khẩu Không Được Để Trống !!!")
        return false;
    } else if (pass != pass2) {
        alert("Xác Nhận Mật Khẩu Không Giống !!! ")
        return false;
    }
    // else if (atposition < 1 || dotposition < (atposition + 2) || (dotposition + 2) >= x.length) {
    //     alert("Email Không Đúng");
    //     return false;
    // }
    else if (phone == "") {
        alert("Số điện thoại không được để trống");
        return false;
    } else {
        alert("Đăng ký thành công");
        return true;
    }
};

function dathang() {
    var ten = document.formDK.name.value;
    var diachi = document.formDK.address.value;
    // var email = document.formDK.em;
    var sdt = document.formDK.phone.value;
    if (ten == "") {
        alert("Không được để trống tên");
        return false;

    } else if (diachi == "") {
        alert("Không được để trống địa chỉ");
        return false;
    } else if (sdt == "") {
        alert("Không được để trống số điện thoại")
        return false;
    } else {
        alert("Đặt hàng thành công");
        return true;
    }


}
var del = document.getElementsByClassName("Delete");
for (var i = 0; i < del.length; i++) {
    var btn = del[i];
    btn.addEventListener("click", function(event) {
        var btndel = event.target;
        btndel.parentElement.parentElement.remove();
        displayShoppingCartItems();
    })
}

function sigup() {
    var name = document.formDK.user.value;
    var pass = document.formDK.password.value;

    for (var i = 0; i < usero.length; i++) {
        if (name == usero[i] && pass == passo[i]) {
            alert("Đăng nhập thành công");

            var namedn = document.formDK.user.value;
            document.getElementById('hello').innerHTML = 'Xin chào:' + namedn;
            return true;
            break;
        } else {
            alert("Tài khoản hoặc mật khẩu sai");
        }

    }
};

function muahang() {
    shoppingCartItems = [];
    sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
    $("#table-products > tbody").html("");
    alert("Mua hàng thành công");
}
// Định nghĩa một mảng các phần tử sẽ bỏ vào giỏ hàng

// Định nghĩa một mảng các phần tử sẽ bỏ vào giỏ hàng
var shoppingCartItems = [];

$(document).ready(function() {
    // Kiểm tra nếu đã có sessionStorage["shopping-cart-items"] hay chưa?
    if (sessionStorage["shopping-cart-items"] != null) {
        shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString());
    }

    // Hiển thị thông tin từ giỏ hàng
    displayShoppingCartItems();
});


// Sự kiện click các button có class=".add-to-cart"
$(".add-to-cart").click(function() {
    var button = $(this); // Lấy đối tượng button mà người dùng click
    var id = button.attr("id"); // id của sản phẩm là id của button
    var name = button.attr("data-name"); // name của sản phẩm là thuộc tính data-name của button
    var price = button.attr("data-price"); // price của sản phẩm là thuộc tính data-price của button
    var quantity = document.getElementById("values");; // Số lượng


    var item = {
        id: id,
        name: name,
        price: price,
        quantity: quantity
    };

    var exists = false;
    if (shoppingCartItems.length > 0) {
        $.each(shoppingCartItems, function(index, value) {
            // Nếu mặt hàng đã tồn tại trong giỏ hàng thì chỉ cần tăng số lượng mặt hàng đó trong giỏ hàng.
            if (value.id == item.id) {
                value.quantity++;
                exists = true;
                return false;
            }
        });
    }

    // Nếu mặt hàng chưa tồn tại trong giỏ hàng thì bổ sung vào mảng
    if (!exists) {
        shoppingCartItems.push(item);
    }

    // Lưu thông tin vào sessionStorage
    sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems); // Chuyển thông tin mảng shoppingCartItems sang JSON trước khi lưu vào sessionStorage
    // Gọi hàm hiển thị giỏ hàng
    displayShoppingCartItems();
});

// Xóa hết giỏ hàng shoppingCartItems
$("#button-clear").click(function() {
    shoppingCartItems = [];
    sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
    $("#table-products > tbody").html("");
});

// Hiển thị giỏ hàng ra table
function displayShoppingCartItems() {
    if (sessionStorage["shopping-cart-items"] != null) {
        shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString()); // Chuyển thông tin từ JSON trong sessionStorage sang mảng shoppingCartItems.

        $("#table-products > tbody").html("");
        // Duyệt qua mảng shoppingCartItems để append từng item dòng vào table
        $.each(shoppingCartItems, function(index, item) {
            var htmlString = "";
            htmlString += "<tr>";
            htmlString += "<td>" + item.id + "</td>";
            htmlString += "<td>" + item.name + "</td>";
            htmlString += "<td style='text-align: right'>" + item.price + "</td>";
            htmlString += "<td style='text-align: right'>" + item.quantity.value + "</td>";
            htmlString += "<td style='text-align: right'>" + item.price * item.quantity.value + "</td>";
            htmlString += "</tr>";

            $("#table-products > tbody:last").append(htmlString);

        });
    }
}