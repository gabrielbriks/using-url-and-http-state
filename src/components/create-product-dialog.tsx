import { Product, createProduct } from "@/data/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),//Convert string to number
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export function CreateProductDialog() {

  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema)
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(responseFromAPI, variables) {
      //Utilizado o Key, da query de produtos, para restaurar a lista completa
      const cachedProducts = queryClient.getQueryData(['products']);

      console.log('cachedProducts: ', cachedProducts);
      //Atualizado a lista de produtos com o novo item, sem precisar de uma nova requisição
      queryClient.setQueryData<Product[]>(['products'], data => {
        if (!data) {
          return;
        }

        return [...data, {
          id: responseFromAPI.id,
          name: responseFromAPI.name,
          price: responseFromAPI.price
        }]
      })

    }
  });

  async function handleCreateProduct(data: CreateProductSchema) {
    console.log(data);

    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      });

      alert('Produto cadastrado com sucesso!');

    } catch (error) {
      console.log('error: ', error);
      alert('Erro ao cadastrar produto.');
    }


  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Novo produto
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Cadastrar novo produto no sistema
      </DialogDescription>


      <form className="space-y-6" onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Produto</Label>
          <Input className="col-span-3" id="name" {...register("name")} />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="price">Preço</Label>
          <Input className="col-span-3" id="price" {...register("price")} />
        </div>


        <DialogFooter>
          <DialogClose asChild>
            {/* <Button variant="outline">Cancelar</Button> */}
          </DialogClose>
          <Button type="submit" id="save-product">Salvar</Button>
        </DialogFooter>
      </form>

    </DialogContent>
  );
}