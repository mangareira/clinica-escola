import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteAppointment } from "@/utils/hooks/appointments/useDeleteAppointment";
import { useConfirm } from "@/utils/hooks/useConfirm";
import { MoreHorizontal, Edit, Trash } from "lucide-react";

interface Props {
  id: string;
}

export const Actions = ({ id }: Props) => {
  const [ConfimationDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um atendimento'
  )

  const { mutate, isPending } = useDeleteAppointment();
  

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      mutate(id);
    }
  };

  return (
    <>
      <ConfimationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            // disabled={isPending}
            // onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={onDelete}
          >
            <Trash className="size-4 mr-2" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};