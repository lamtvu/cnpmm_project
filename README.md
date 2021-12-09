# Website bán đồng hồ

## Thành viên:

Vũ Thanh Lâm - 18110142/
Lê Hoàng Nam - 18110160

## Hướng dẫn cài đặt:

- Trước tiên bạn phải clone(hoặc tải) project về máy

---

    git clone https://github.com/lamtvu/cnpmm_project.git

---

### Back-end

- Di chuyển vào thư mục be của project

---

    cd cnpmm_project/be

---

- Cài đặt các package có trong project

---

    npm install

---

- Chạy project

---

    npm start

---

- Sau khi chạy project thành công, bạn sẽ thấy trong mongoose sẽ tạo database có tên là **watchstoredb** và các collection.
- Để tạo tài khoản employee bạn truy cập vào collection **employees** và tạo document có data:

---

    {
        "_id": {
        "$oid": "61a5ab062c879310174cea30"
        },
        "username": "lamtvuadmin",
        "name": "thanh lam",
        "password": "932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef"
    }

---

- Trong đa ta ở trên password là chuỗi string được hash từ password là **123123123** bằng thuật toán SH256
- Bạn có thể sinh chuỗi hash khác bằng cách truy cập và https://coding.tools/sha256 với option **UpperCase** là **Hash Result in UpperCase**

### front-end

- Di chuyển vào thư mục fe của project

---

    cd cnpmm_project/fe

---

- Cài đặt các package có trong project

---

    npm install

---

- Chạy project fe

---

    npm start

---
