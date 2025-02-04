import React from 'react';
import { Text, HoverCard } from "@radix-ui/themes"
import { PiInfoLight } from 'react-icons/pi';

interface LabelInfoProps {
    data: {
        name: string;
        title: string;
        infoText: string;
    };
}

const LabelInfo: React.FC<LabelInfoProps> = ({ data }) => {
    return (
            <Text className="form-label" htmlFor={data.name}>
                {data.title}{" "}
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <span>
                            <PiInfoLight />
                        </span>
                    </HoverCard.Trigger>
                    <HoverCard.Content maxWidth='300px'>
                        <Text>
                            {data.infoText}
                        </Text>
                    </HoverCard.Content>
                </HoverCard.Root>{" "}
            </Text>
    );
};

export default LabelInfo;