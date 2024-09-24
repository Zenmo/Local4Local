import { FunctionComponent } from "react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from "@radix-ui/themes"
import './styles.css';

export const CardMenu: FunctionComponent<{ 
    onEdit: () => void, onDelete: () => void, }> = ({onEdit, onDelete}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
            <Button aria-label="More options" style={{ position: "absolute", right: "12px", background: 'none', border: 'none', cursor: 'pointer' }}>
                <DotsVerticalIcon style={{ color: 'black' }}/>
            </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="dropdown-content" align="end">
            <DropdownMenu.Item onClick={onEdit} className="dropdown-item">
                Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={onDelete} className="dropdown-item">
                Delete
            </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
