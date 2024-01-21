import { Dialog } from "@radix-ui/react-dialog";
import { useQuery } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { useSearchParams } from "react-router-dom";
import { CreateProductDialog } from "../components/create-product-dialog";
import { ProductFilters } from "../components/products-filters";
import { Button } from "../components/ui/button";
import { DialogTrigger } from "../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { getProducts } from "../data/products";

export default function Products() {


  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const name = searchParams.get('name');

  const { data: products } = useQuery({
    queryKey: ['products', id, name],//Passando os parametros para que cada listagem com filtro diferente permaneça com um key unico
    queryFn: () => getProducts({ id, name }), //Qual é a função chamada
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold">
        Produtos
      </h1>


      <div className="flex items-center justify-between">
        <ProductFilters />
        <Dialog>
          <DialogTrigger>
            <Button id="new-product">
              <PlusCircle className="size-4 mr-2" />
              Novo produto
            </Button>
          </DialogTrigger>
          <CreateProductDialog />
        </Dialog>


      </div>

      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              products?.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </div>
    </div>
  )
}

