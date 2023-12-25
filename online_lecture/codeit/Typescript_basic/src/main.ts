const codeitmall: {
  stock: { [id: string]: number };
  cart: string[];
  addToCart: (id: string, quantity?: number) => boolean;
  addManyToCart: (...ids: string[]) => void;
} = {
  stock: {
    c001: 3,
    c002: 1,
  },
  cart: [],
  addToCart,
  addManyToCart,
};

const cart: string[] = [];

function addToCart(id: string, quantity: number = 1): boolean {
  if (typeof quantity === "undefined") {
    quantity = 1;
  }

  if (codeitmall.stock[id] < quantity) {
    return false;
  }

  codeitmall.stock[id] -= quantity;
  for (let i = 0; i < quantity; i++) {
    cart.push(id);
  }

  return true;
}

function addManyToCart(...ids: string[]) {
  for (const id of ids) {
    addToCart(id);
  }
}
