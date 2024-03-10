import "./App.css";
import Toast from "./components/toast/Toast";
import React from "react";
import IconButton from "./components/button/IconButton";

import OutlinedInput from "./components/input/OutlinedInput";
import Table from "./components/table/Table";

function App() {
  const [toasts, setToasts] = React.useState([]);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [products, setProducts] = React.useState([
    { id: 1, name: "노트북", price: 3000000 },
    { id: 2, name: "무선 마우스", price: 150000 },
    { id: 3, name: "터치패드", price: 150000 },
  ]);

  const showToast = (message, type) => {
    console.log(toasts.length);
    const newToast = {
      id: Date.now(),
      index: toasts.length + 1,
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 1300);
  };

  const [selectedProductId, setSelectedProductId] = React.useState(null);
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const handleAddProduct = () => {
    // 유효성 검사 함수 호출
    if (!isValidInput()) return;

    const newProduct = {
      id: products.length + 1,
      name: productName,
      price: parseFloat(productPrice),
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);

    // Reset input values
    setProductName("");
    setProductPrice("");
    showToast(
      <span>
        상품이 <span className="text-base font-bold">추가</span>되었습니다.
      </span>,
      "success"
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    if (selectedProductId === id) {
      setSelectedProductId(null);
      // 수정 모드 해제 및 입력 폼 초기화
      setIsEditMode(false);
      setProductName("");
      setProductPrice("");
    }
    showToast(
      <span>
        상품이 <span className="text-base font-bold">삭제</span>되었습니다.
      </span>,
      "success"
    );
  };

  const handleDeleteAllProducts = () => {
    setProducts([]);
    setSelectedProductId(null);
    // 수정 모드 해제 및 입력 폼 초기화
    setIsEditMode(false);
    setProductName("");
    setProductPrice("");
    showToast(
      <span>
        모든 상품이 <span className="text-base font-bold">삭제</span>
        되었습니다.
      </span>,
      "success"
    );
  };

  // 유효성 검사 함수
  const isValidInput = () => {
    // 앞뒤 공백이 있는지 확인
    if (productName.trim() === "" || productPrice === "") {
      showToast("지출 항목과 비용을 입력하세요.", "error");
      return false;
    }
    // 문자열 판단
    if (!isNaN(productName)) {
      showToast("지출 항목은 문자여야 합니다.", "error");
      return false;
    }
    // 유효성 검사. 비용이 숫자가 아닐경우 toast 메시지 출력
    if (isNaN(productPrice)) {
      showToast("비용은 숫자여야 합니다.", "error");
      return false;
    }
    return true;
  };

  const handleModifyProduct = (id) => {
    // 유효성 검사 함수 호출

    setIsEditMode(true);
    const product = products.find((product) => product.id === id);
    setSelectedProductId(product.id);
    setProductName(product.name);
    setProductPrice(product.price);
  };

  const handleModifySetProduct = () => {
    if (!isValidInput()) return;

    const selectedProductIndex = products.findIndex(
      (product) => product.id === selectedProductId
    );

    if (selectedProductIndex !== -1) {
      const modifiedProducts = [...products];
      modifiedProducts[selectedProductIndex] = {
        id: selectedProductId,
        name: productName,
        price: parseFloat(productPrice),
      };

      setProducts(modifiedProducts);
      setSelectedProductId(null);
      // 수정 모드 해제 및 입력 폼 초기화
      setIsEditMode(false);
      setProductName("");
      setProductPrice("");
      showToast(
        <span>
          상품이 <span className="text-base font-bold">수정</span>되었습니다.
        </span>,
        "success"
      );
    } else {
      showToast("상품을 찾을 수 없습니다.", "error");
    }
  };

  return (
    <div className="w-full min-h-screen p-4 flex justify-center items-center bg-slate-200 ">
      <div className="flex-col flex relative p-8 gap-4 bg-white rounded w-[600px] h-[550px] overflow-auto">
        <div class="flex gap-2 ">
          <OutlinedInput
            label="이름"
            placeholder="예) 노트북, 키보드, 마우스"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <OutlinedInput
            label="비용"
            placeholder="예) 1000"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <IconButton
            disabled={productName.trim() === "" || productPrice === ""}
            message={isEditMode ? "수정" : "추가"}
            type={isEditMode ? "modify" : "add"}
            onClick={isEditMode ? handleModifySetProduct : handleAddProduct}
          />
        </div>
        <Table
          products={products}
          handleDeleteProduct={handleDeleteProduct}
          handleModifyProduct={handleModifyProduct}
          selectedProductId={selectedProductId}
        />
        <div className="flex justify-end">
          <IconButton
            disabled={products.length === 0}
            type="delete"
            message="목록 지우기"
            onClick={handleDeleteAllProducts}
          />
        </div>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            index="1"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
