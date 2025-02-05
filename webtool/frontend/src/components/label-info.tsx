import React from 'react';
import { Text, Popover } from "@radix-ui/themes"
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
                <Popover.Root>
                    <Popover.Trigger>
                        <span>
                            <PiInfoLight />
                        </span>
                    </Popover.Trigger>
                    <Popover.Content maxWidth='300px'>
                        <Text>
                            {data.infoText}
                        </Text>
                    </Popover.Content>
                </Popover.Root>{" "}
            </Text>
    );
};

export default LabelInfo;
