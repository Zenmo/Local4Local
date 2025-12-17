import { FunctionComponent } from "react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from "@radix-ui/themes"
import './styles.css';

export const CardMenu: FunctionComponent<{ 
    onDelete?: () => void,
    onEdit?: () => void,
}> = ({onDelete, onEdit}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
            <Button aria-label="More options" style={{right: "12px", background: 'none', border: 'none', cursor: 'pointer' }}>
                <DotsVerticalIcon style={{ color: 'black' }}/>
            </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="dropdown-content" align="end" style={{cursor: "pointer"}}>
                {onDelete && <DropdownMenu.Item onClick={onDelete} className="dropdown-item">
                    Verwijderen
                </DropdownMenu.Item>}
                {onEdit && <DropdownMenu.Item onClick={onEdit} className="dropdown-item">
                    Bewerken
                </DropdownMenu.Item>}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
