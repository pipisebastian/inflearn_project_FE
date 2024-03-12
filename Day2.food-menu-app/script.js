window.addEventListener("DOMContentLoaded", () => {
  displayCategoryButton();
  displayMenu(food);
});

const displayCategoryButton = () => {
  const buttonContainer = document.querySelector(".button-container");

  const categoryList = ["all", ...new Set(food.map((item) => item.category))];

  const categoryButton = categoryList.map((category) => {
    return `<button class="button" data-id=${category}>${changeCategoryName(
      category
    )}</button>`;
  });

  buttonContainer.innerHTML = categoryButton.join("");

  const button = buttonContainer.querySelectorAll(".button");

  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id;

      const menuCategory =
        category === "all"
          ? food
          : food.filter((menuItem) => menuItem.category === category);
      displayMenu(menuCategory);
    });
  });
};

const displayMenu = (food) => {
  const foodContainer = document.querySelector(".food-container");

  let menus = food.map((item) => {
    return `
    <div class="menu-item">
        <img src=${item.img} class="img"/>
        <div>
            <div class="title-container">
                <h3>${item.name}</h3>
                <p>${item.price}원</p>
            </div>
            <p>${item.description}</p>
        </div>
    </div>`;
  });

  foodContainer.innerHTML = menus.join("");
};

const changeCategoryName = (englishName) => {
  switch (englishName) {
    case "korean":
      return "한식";
    case "chinese":
      return "중식";
    case "western":
      return "양식";
    default:
      return "전체보기";
  }
};

const food = [
  {
    id: 1,
    name: "곱도리탕",
    category: "korean",
    price: 10000,
    img: "./images/korean/곱도리탕.jpeg",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellendus repellat exercitationem commodi! Cumque perferendis molestias iste aliquam, nulla, qui reprehenderit ea, sequi eveniet dolorem praesentium aliquid aperiam vel libero!`,
  },
  {
    id: 2,
    name: "짜장면",
    category: "chinese",
    price: 10000,
    img: "./images/chinese/짜장면.jpeg",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellendus repellat exercitationem commodi! Cumque perferendis molestias iste aliquam, nulla, qui reprehenderit ea, sequi eveniet dolorem praesentium aliquid aperiam vel libero!`,
  },
  {
    id: 3,
    name: "피자",
    category: "western",
    price: 10000,
    img: "./images/western/피자.jpeg",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellendus repellat exercitationem commodi! Cumque perferendis molestias iste aliquam, nulla, qui reprehenderit ea, sequi eveniet dolorem praesentium aliquid aperiam vel libero!`,
  },
  {
    id: 4,
    name: "부대찌개",
    category: "korean",
    price: 10000,
    img: "./images/korean/부대찌개.jpeg",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellendus repellat exercitationem commodi! Cumque perferendis molestias iste aliquam, nulla, qui reprehenderit ea, sequi eveniet dolorem praesentium aliquid aperiam vel libero!`,
  },

  {
    id: 5,
    name: "짬뽕",
    category: "chinese",
    price: 10000,
    img: "./images/chinese/짬뽕.jpeg",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellendus repellat exercitationem commodi! Cumque perferendis molestias iste aliquam, nulla, qui reprehenderit ea, sequi eveniet dolorem praesentium aliquid aperiam vel libero!`,
  },
  {
    id: 6,
    name: "스테이크",
    category: "western",
    price: 10000,
    img: "./images/western/스테이크.jpeg",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellendus repellat exercitationem commodi! Cumque perferendis molestias iste aliquam, nulla, qui reprehenderit ea, sequi eveniet dolorem praesentium aliquid aperiam vel libero!`,
  },
];
