import React from 'react';
import { Link, Text, HoverCard } from "@radix-ui/themes"
import { PiInfoLight } from 'react-icons/pi';

interface LabelInfoProps {
    data: {
        name: string;
        title: string;
        info: string;
    };
}

const LabelInfo: React.FC<LabelInfoProps> = ({ data }) => {
    return (
            <Text className="form-label" htmlFor={data.name}>
                {data.title}{" "}
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <Link href="#" target="_blank">
                            <PiInfoLight />
                        </Link>
                    </HoverCard.Trigger>
                    <HoverCard.Content maxWidth='300px'>
                        <Text>
                            {data.info}
                        </Text>
                    </HoverCard.Content>
                </HoverCard.Root>{" "}
            </Text>
    );
};

export default LabelInfo;