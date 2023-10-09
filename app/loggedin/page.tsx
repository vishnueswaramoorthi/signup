"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/router instead of next/navigation
import { Modal } from "antd";
import dashBoard from "./image/dashBoard.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  FileAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const { TextArea } = Input;
import { Layout, Menu, Button, theme, Card, Space } from "antd";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

const Page = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isAuthenticated = localStorage.getItem("auth");
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setData([...data, { title: title, desc: desc }]);
    setTitle(""); // Corrected to set an empty string
    setDesc(""); // Corrected to set an empty string
    console.log(title, "title-------");
    console.log(desc, "desc-------");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    router.push("/");
  };

  const deleteData = (i) => {
    const updatedData = [...data];
    updatedData.splice(i, 1);
    setData(updatedData);
  };
  const content = (
    <Modal
      title="Add project"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form>
        <>
          <div>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange} // Fixed event handler
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Input
              type="text"
              name="description"
              value={desc}
              onChange={handleDescChange} // Fixed event handler
            />
          </div>
        </>
      </form>
    </Modal>
  );

  if (!isAuthenticated) {
    // Redirect to the sign-in page if not authenticated
    router.push("/");
    return null;
  }
  console.log(data, "data");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div>
          <Image src={dashBoard} alt="image" width={150} height={50} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <FileAddOutlined />,
              label: "Add project",
              onClick: showModal,
            },

            {
              key: "3",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: logout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {data.map((e, i) => (
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Card title={e.title} size="small" key={i}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{e.desc}</p>
                  <span onClick={() => deleteData(i)}>
                    <DeleteOutlined />
                  </span>
                </div>
              </Card>
            </Space>
          ))}
        </Content>
      </Layout>
      {content} {/* Render the modal */}
    </Layout>
  );
};

export default Page;
