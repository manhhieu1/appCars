import { Table, Button, Popover } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Admin = () => {
  const [dsCars, setDsCars] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Popover trigger="click" content={record?.code} title="Title">
          <Button type="primary">{text}</Button>
        </Popover>
      ),
    },
    {
      title: "code",
      dataIndex: "code",
      key: "age",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "address",
    },
  ];
  const getDsPhongBan1 = async () => {
    try {
      const resp = await axios.get(
        "https://cars-rental-api.herokuapp.com/cars",
        {}
      );
      setDsCars(resp?.data?.data?.cars);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDsPhongBan1();
  }, []);
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={dsCars} />
    </div>
  );
};

export default Admin;
