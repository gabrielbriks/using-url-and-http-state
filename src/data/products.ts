// import { v4 as uuidv4 } from 'uuid';
// export function getProducts() {
//   let products: Array<any> = [];

//   Array.from({ length: 20 }).map((_, i) => products
//     .push({
//       id: uuidv4().toString(),
//       name: `Produto ${i}`,
//       price: Math.floor(Math.random() * 100),
//     })
//   )

//   return products;
// }

const productsData = [
  {
    "id": "c30d865f-df98-4d40-a51d-0f348bb641fe",
    "name": "Produto 0",
    "price": 19
  },
  {
    "id": "5846ae7f-8b62-43e0-9c7b-3ce18c6eb416",
    "name": "Produto 1",
    "price": 78
  },
  {
    "id": "deddfb66-9684-4215-bda4-d3d7a5db5b0d",
    "name": "Produto 2",
    "price": 86
  },
  {
    "id": "b815336b-bf47-49a2-96a5-fbc5147a15ca",
    "name": "Produto 3",
    "price": 98
  },
  {
    "id": "cbe5acd1-1b13-4f45-911c-9deaeb44875b",
    "name": "Produto 4",
    "price": 92
  },
  // {
  //   "id": "7e64bb13-6f4d-46a8-8c39-dac19345929a",
  //   "name": "Produto 5",
  //   "price": 35
  // },
  // {
  //   "id": "368e7d12-5c2d-4923-80c3-6e94772c9730",
  //   "name": "Produto 6",
  //   "price": 68
  // },
  // {
  //   "id": "1bc0d7dd-7e50-4697-84fa-34b63ded331b",
  //   "name": "Produto 7",
  //   "price": 59
  // },
  // {
  //   "id": "be694620-6787-4723-91d6-1a53c45105b9",
  //   "name": "Produto 8",
  //   "price": 10
  // },
  // {
  //   "id": "4a64cb23-5807-4c71-89dd-1199b187b904",
  //   "name": "Produto 9",
  //   "price": 39
  // },
  // {
  //   "id": "ef51474e-5ad8-48a5-81b7-7c7f6647ccd0",
  //   "name": "Produto 10",
  //   "price": 9
  // },
  // {
  //   "id": "e7f1f081-930a-41c9-93b4-70023224773c",
  //   "name": "Produto 11",
  //   "price": 28
  // },
  // {
  //   "id": "faea83d9-e72a-4690-80bf-f5440ec2bdef",
  //   "name": "Produto 12",
  //   "price": 41
  // },
  // {
  //   "id": "fd0b18a6-9599-4c8a-82ae-02fdf9141761",
  //   "name": "Produto 13",
  //   "price": 95
  // },
  // {
  //   "id": "dda61b45-c15f-4ae5-a6fb-3449c1d9e5ac",
  //   "name": "Produto 14",
  //   "price": 11
  // },
  // {
  //   "id": "498ed849-d97d-45a8-b6d7-93ccb93256d7",
  //   "name": "Produto 15",
  //   "price": 27
  // },
  // {
  //   "id": "b2497a06-8eed-4b23-89f3-b3452e0b72a6",
  //   "name": "Produto 16",
  //   "price": 58
  // },
  // {
  //   "id": "fade1c01-71f9-4967-9146-2fffaaaabebf",
  //   "name": "Produto 17",
  //   "price": 41
  // },
  // {
  //   "id": "20fbbac7-2071-40b2-8ceb-7dd0d53da944",
  //   "name": "Produto 18",
  //   "price": 63
  // },
  // {
  //   "id": "2e069418-7d19-48e1-8dd7-3ff965b265af",
  //   "name": "Produto 19",
  //   "price": 23
  // }
]

export interface Product {
  id: string;
  name: string;
  price: number;
}
interface CreateProductRequest {
  name: string;
  price: number;
}

interface GetProductsFilters {
  id: string | null;
  name: string | null;
}

export async function getProducts(filters: GetProductsFilters) {
  let products: Product[] = productsData;
  //daley 1seg
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (filters.id) {
    products = productsData.filter(product => product.id === filters.id);
  }

  if (filters.name) {
    products = productsData.filter(product => product.name === filters.name);
  }

  return products;
}

//Simulando chamada para API
export async function createProduct(data: CreateProductRequest) {
  //daley 1seg
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: crypto.randomUUID(),
    name: data.name,
    price: data.price
  }
}


