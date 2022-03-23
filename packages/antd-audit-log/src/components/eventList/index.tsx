import React from "react";
import { UseQueryResult } from "react-query";
import {
    AntdList,
    Dropdown,
    Menu,
    Icons,
    Button,
    Badge,
    Typography,
} from "@pankod/refine-antd";
import { ILog, ILogData, useUpdate } from "@pankod/refine-core";
import dayjs from "dayjs";

const { Text } = Typography;

interface EventListProps {
    logQueryResult?: UseQueryResult<ILogData>;
    showModal: () => void;
    setSelectedLog: React.Dispatch<React.SetStateAction<ILog | undefined>>;
}

export const EventList: React.FC<EventListProps> = ({
    logQueryResult,
    showModal,
    setSelectedLog,
}) => {
    const { mutate } = useUpdate();

    return (
        <AntdList
            dataSource={logQueryResult?.data}
            renderItem={(log) => (
                <AntdList.Item
                    style={{
                        alignItems: "flex-start",
                        padding: "8px 0px 8px 8px",
                    }}
                    extra={
                        <Dropdown
                            overlay={
                                <Menu mode="vertical">
                                    <Menu.Item
                                        key="1"
                                        onClick={() => {
                                            mutate({
                                                resource: "posts",
                                                id: log.data.id,
                                                values: log.previousData,
                                            });
                                        }}
                                    >
                                        Restore
                                    </Menu.Item>
                                    <Menu.Item key="2">Rename</Menu.Item>
                                </Menu>
                            }
                            trigger={["click"]}
                        >
                            <Icons.MoreOutlined style={{ fontSize: "18px" }} />
                        </Dropdown>
                    }
                >
                    <Button
                        type="text"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                        onClick={() => {
                            showModal();
                            setSelectedLog(log);
                        }}
                    >
                        <Text strong>
                            {log.name ??
                                dayjs(log.timestamp).format(
                                    "MM/DD/YYYY, hh:mm",
                                )}
                        </Text>
                        <Badge color="blue" text={log?.author?.name} />
                    </Button>
                </AntdList.Item>
            )}
        />
    );
};
