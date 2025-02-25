import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {z} from "zod";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

import { isValidCpf } from "../helpers/cpf";
  

  const formSchema = z.object({
    name:z.string().trim().min(1, {
        message: 'O nome é obrigatório.',
    }),
    cpf: z.string().refine((value) => isValidCpf(value), {
        message: "CPF inválido",
    })
  });

type FormSchema = z.infer<typeof formSchema>

const FinishOrderDialog = () => {
    const {} = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })

    return (
    
    <Drawer>
  <DrawerTrigger asChild>
     <Button className="w-full rounded-full">Finalizar Pedido</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Finalizar Pedido</DrawerTitle>
      <DrawerDescription>insira suas informações abaixo para finalizar o seu pedido</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

    
    
);
}
 
export default FinishOrderDialog;