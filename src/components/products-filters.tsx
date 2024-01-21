import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from 'react-hook-form';
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const productsFilterSchema = z.object({
	id: z.string(),
	name: z.string(),
});

//integração com o typescript
type ProductFilterSchema = z.infer<typeof productsFilterSchema>



export function ProductFilters() {

	const [searchParams, setSearchParams] = useSearchParams();

	const id = searchParams.get('id');
	const name = searchParams.get('name');

	const { register, handleSubmit } = useForm<ProductFilterSchema>({
		resolver: zodResolver(productsFilterSchema),
		values: {
			id: id ?? '',
			name: name ?? '',
		}
	});

	function handleFilterProducts({ id, name }: ProductFilterSchema) {

		setSearchParams(state => {
			if (id) {
				state.set('id', id);
			}
			else {
				state.delete('id');
			}

			return state;
		});

		setSearchParams(state => {
			if (name) {
				state.set('name', name);
			}
			else {
				state.delete('name');
			}

			return state;
		});

	}

	return (
		<form onSubmit={handleSubmit(handleFilterProducts)} className="flex items-center gap-2">
			<Input id="id" placeholder="ID do pedido" className="w-auto" {...register('id')} />
			<Input id="name" placeholder="Nome do pedido" className="w-auto" {...register('name')} />
			<Button type="submit" variant="outline" className="bg-slate-200"  >
				<Search className="size-4 mr-2" />
				Filtrar resultados
			</Button>
		</form>
	);
}