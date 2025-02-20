import React from 'react';
import { Text, Popover, IconButton } from "@radix-ui/themes"
import {InfoCircledIcon} from "@radix-ui/react-icons"

interface LabelInfoProps {
    data: {
        name: string;
        title: string;
        infoText: string;
    };
}

const LabelInfo: React.FC<LabelInfoProps> = ({ data }) => {
    return (
            <div className="form-label" htmlFor={data.name} css={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                color: "black",
            }}>
                <Text>{data.title}</Text>
                <Popover.Root>
                    <Popover.Trigger>
                        <IconButton variant="ghost" size="1" color="gray">
                            <InfoCircledIcon />
                        </IconButton>
                    </Popover.Trigger>
                    <Popover.Content maxWidth='300px'>
                        <Text>
                            {data.infoText}
                        </Text>
                    </Popover.Content>
                </Popover.Root>
            </div>
    );
};

export default LabelInfo;
