export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  featured?: boolean;
  image?: string;
  offerPrice?: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}
export const menuData: MenuCategory[] = [
  {
    id: "burger",
    title: "BURGER",
    items: [
      {
        id: 1,
        name: "Classic Burger",
        description:
          "Grilled beef patty cooked to perfection, layered with fresh lettuce, sliced tomatoes, melted cheese, and our signature house sauce in a toasted bun",
        price: 9.99,
        featured: true,
        image: "/menu/servings/burger/burger.jpg",
        offerPrice: 7.49,
      },
      {
        id: 2,
        name: "Cheese Burger",
        description:
          "Juicy beef patty topped with rich melted cheddar cheese, crisp lettuce, and tangy sauce, served inside a soft toasted bun",
        price: 10.49,
        image: "/menu/servings/burger/cheese-burger.jpg",
        offerPrice: 7.49,
      },
      {
        id: 3,
        name: "Chicken Burger",
        description:
          "Crispy fried chicken patty seasoned with spices, paired with creamy mayo, fresh lettuce, and pickles for a perfect crunch",
        price: 9.49,
        image: "/menu/servings/burger/chicken-burger.jpg",
        offerPrice: 7.49,
      },
      {
        id: 4,
        name: "Veggie Burger",
        description:
          "Grilled vegetable patty made from fresh veggies and herbs, topped with lettuce, tomatoes, and mild sauce in a toasted bun",
        price: 8.99,
        image: "/menu/servings/burger/veg-burger.jpg",
        offerPrice: 7.49,
      },
    ],
  },

  {
    id: "pizza",
    title: "PIZZA",
    items: [
      {
        id: 1,
        name: "Margherita",
        description:
          "Classic Italian pizza topped with rich tomato sauce, fresh mozzarella cheese, and aromatic herbs, baked until perfectly crisp",
        price: 11.99,
        featured: true,
        image: "/menu/servings/pizzas/margherita.jpg",
        offerPrice: 7.49,
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        description:
          "Stone-baked pizza layered with mozzarella cheese and spicy pepperoni slices, delivering a bold and savory flavor",
        price: 13.99,
        image: "/menu/servings/pizzas/pepperoni.jpg",
        offerPrice: 7.49,
      },
      {
        id: 3,
        name: "BBQ Chicken Pizza",
        description:
          "Smoky BBQ sauce base topped with tender grilled chicken, onions, and melted cheese for a sweet and savory bite",
        price: 14.49,
        offerPrice: 12.99,
        image: "/menu/servings/pizzas/bbq-pizza.jpg",
      },
    ],
  },

  {
    id: "coffee",
    title: "COFFEE",
    items: [
      {
        id: 1,
        name: "Espresso",
        description:
          "Strong and bold single shot of finely ground coffee beans, brewed under high pressure for an intense flavor",
        price: 3.49,
        image: "/menu/servings/coffees/espresso.jpg",
        offerPrice: 7.49,
      },
      {
        id: 2,
        name: "Cappuccino",
        description:
          "Perfect balance of espresso, steamed milk, and thick milk foam, finished with a smooth and creamy texture",
        price: 4.49,
        featured: true,
        image: "/menu/servings/coffees/cappuccino.jpg",
        offerPrice: 7.49,
      },
      {
        id: 3,
        name: "Caramel Latte",
        description:
          "Smooth espresso blended with steamed milk and sweet caramel syrup, creating a rich and comforting drink",
        price: 4.99,
        image: "/menu/servings/coffees/caramel-latte.jpg",
        offerPrice: 7.49,
      },
    ],
  },

  {
    id: "desserts",
    title: "DESSERTS",
    items: [
      {
        id: 1,
        name: "Chocolate Brownie",
        description:
          "Rich and fudgy chocolate brownie baked fresh daily, served warm with a soft center and crisp edges",
        price: 5.49,
        featured: true,
        image: "/menu/servings/desserts/brownie.jpg",
        offerPrice: 7.49,
      },
      {
        id: 2,
        name: "Cheesecake",
        description:
          "Creamy New York–style cheesecake with a buttery biscuit base, smooth texture, and lightly sweet flavor",
        price: 6.99,
        image: "/menu/servings/desserts/cheesecake.jpg",
        offerPrice: 7.49,
      },
      {
        id: 3,
        name: "Waffle with Ice Cream",
        description:
          "Crispy golden waffle served warm and topped with a scoop of vanilla ice cream and sweet syrup",
        price: 7.49,
        offerPrice: 6.49,
        image: "/menu/servings/desserts/waffle.jpg",
      },
    ],
  },
];

