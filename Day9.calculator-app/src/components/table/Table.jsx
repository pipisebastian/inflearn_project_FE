import React from "react";
import TextButton from "../button/textButton";
import { priceConvertor } from "../../util/priceConvertor";

const Table = ({
  products,
  selectedProductId,
  handleDeleteProduct,
  handleModifyProduct,
}) => {
  const totalAmount = products.reduce(
    (total, product) => total + product.price,
    0
  );
  return (
    <div class="relative w-full overflow-x-auto rounded shadow  border-b-4 border-slate-200">
      <table class="w-full text-left rtl:text-right text-slate-500  ">
        <thead class=" text-white  bg-emerald-500  ">
          <tr className=" ">
            <th scope="col" class="px-6 py-2 w-2/5">
              항목
            </th>
            <th scope="col" class="px-6 py-2 w-2/5">
              비용
            </th>
            <th scope="col" class="p-4"></th>
            <th scope="col" class="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="4" class="py-3 text-center text-slate-400">
                지출 항목이 없습니다.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr
              class={`${
                selectedProductId === product.id
                  ? "bg-slate-100 text-emerald-500 font-semibold"
                  : "bg-white  border-slate-200"
              } text-sm`}
            >
              <td class="px-6 py-3.5 w-2/5">{product.name}</td>
              <td class="px-6 py-3.5 w-2/5">
                {priceConvertor(product.price)}{" "}
              </td>{" "}
              <td class="w-4">
                <TextButton
                  message="수정"
                  type="modify"
                  onClick={() => handleModifyProduct(product.id)}
                />
              </td>
              <td class="w-4">
                <TextButton
                  message="삭제"
                  type="delete"
                  onClick={() => handleDeleteProduct(product.id)}
                />
              </td>
            </tr>
          ))}
          <tr className="border-t border-dashed border-slate-300">
            <td
              colSpan="4"
              class="py-2 pr-5 text-right text-emerald-500 font-semibold"
            >
              <span className="text-slate-500">총지출</span>{" "}
              {priceConvertor(totalAmount)}원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
