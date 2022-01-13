import {
  Table,
  Input,
  Select,
  Image,
  Form,
  Modal,
  Button,
  notification,
  Tooltip,
  InputNumber,
  Typography,
  Card,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiPlus, HiOutlineTrash, HiPencil } from "react-icons/hi";

const Admin = () => {
  const [dsCars, setDsCars] = useState([]);
  const [dsCarVendors, setDsCarsVendors] = useState([]);
  const [carDetail, setDarDetail] = useState();
  const [carDelete, setCarDelete] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchVender, setSearchVender] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchSeat, setSearchSeat] = useState("");
  const [mode, setMode] = useState("");
  const [idCar, setIdCar] = useState("");
  const [urlImage, setUrlImage] = useState();
  const [idCarDelete, setIdCarDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [form] = Form.useForm();
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const columns = [
    {
      title: "Mã xe",
      dataIndex: "code",
      key: "code",
      render: (text, record) => (
        <div
          className="underline text-blue-500 cursor-pointer"
          onClick={() => {
            setVisible(true);
            setIdCar(record?.id);
            setMode("view");
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Tên xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "url",
      key: "url",
      render: (text) => <Image src={text} width={100} />,
    },

    {
      title: "Biển số",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Số ghế",
      dataIndex: "seat",
      key: "seat",
    },
    {
      title: "Năm sản xuất",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Thao tác",
      width: 50,
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <Tooltip title="Chỉnh sửa thông tin xe">
              <Button
                className="flex justify-center items-center"
                type="primary"
                onClick={() => {
                  setVisible(true);
                  setMode("edit");
                  setIdCar(record?.id);
                }}
                icon={<HiPencil style={{ marginLeft: 6 }} />}
              ></Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Xóa thông tin xe">
              <Button
                className="flex justify-center items-center"
                type="primary"
                danger
                onClick={() => {
                  setIdCarDelete(record?.id);
                  setCarDelete(record);
                  setVisibleDelete(true);
                }}
                icon={<HiOutlineTrash style={{ marginLeft: 6 }} />}
              ></Button>
            </Tooltip>
          </div>
        </div>
      ),
      fixed: "right",
      align: "center",
    },
  ];
  const getDsCars = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `https://cars-rental-api.herokuapp.com/cars`,
        {}
      );
      setDsCars(resp?.data?.data?.cars);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getCarDetail = async () => {
    if (idCar) {
      try {
        const resp = await axios.get(
          `https://cars-rental-api.herokuapp.com/cars/${idCar}`,
          {}
        );
        setDarDetail(resp?.data?.data?.car);
        form.setFieldsValue(resp?.data?.data?.car);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // call api danh sách hãng
  const getDsCarsVendors = async () => {
    try {
      const resp = await axios.get(
        `https://cars-rental-api.herokuapp.com/vendors`,
        {}
      );
      setDsCarsVendors(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (idCar) {
      // call api chỉnh sửa
      try {
        await axios.put(
          `https://cars-rental-api.herokuapp.com/cars/${idCar}`,
          data
        );
        getDsCars();
        getCarDetail();
        notification.success({
          message: "Chỉnh sửa thành công",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // call api thêm mới
      try {
        await axios.post(`https://cars-rental-api.herokuapp.com/cars`, data);

        getDsCars();

        notification.success({
          message: "Thêm mới thành công!",
        });
        setVisible(false);
        setUrlImage(undefined);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //call api xóa
  const onDelete = async () => {
    if (idCarDelete) {
      try {
        await axios.delete(
          `https://cars-rental-api.herokuapp.com/cars/${idCarDelete}`,
          {}
        );
        getDsCars();
        notification.success({
          message: "Xóa Thành công",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const searchData = (searchName, data) => {
    let filterData = [];
    for (var i = 0; i < dsCars?.length; i++) {
      searchName = searchName.toLowerCase();
      var full_address = dsCars[i].name.toLowerCase();
      if (full_address.includes(searchName)) {
        filterData.push(data[i]);
      }
    }
    // console.log(filterData);
    return filterData;
  };
  const [dsData, setDsData] = useState([]);
  // console.log(dsData);
  useEffect(() => {
    getDsCars();
    getDsCarsVendors();
  }, []);
  useEffect(() => {
    getCarDetail();
  }, [idCar]);
  useEffect(() => {
    var storeName = searchData(searchName, dsCars);
    setDsData(storeName);
  }, [searchName]);
  const initialValue = {
    code: null,
    name: null,
    seat: null,
    year: null,
    url: null,
    description: null,
    price: null,
    vendorsId: null,
    color: null,
  };
  return (
    <div className=" flex justify-center justify-items-center pb-12  !bg-gray-600 h-full overflow-hidden overflow-y-scroll">
      <div>
        <Card
          title={
            <div>
              <div>
                <marquee
                  // behavior="alternate"
                  scrollamount="10"
                  className="bg-sky-300 font-semibold text-4xl py-4 rounded-xl"
                >
                  Đinh Mạnh Hiếu - D13CNPM5 - 18810310423 - Môn kiểm thử phần
                  mềm
                </marquee>
              </div>
              <Typography className="mt-10 text-5xl font-semibold">
                Quản lý xe
              </Typography>
            </div>
          }
        >
          <div className="flex justify-end">
            <Button
              className="!text-white !bg-blue-400 mb-3"
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              <div className="flex justify-between items-center">
                <HiPlus className="mr-1" /> <span>Thêm mới</span>
              </div>
            </Button>
          </div>
          <div className=" grid grid-cols-4 mb-3 gap-10 ">
            <Form>
              <Form.Item label={<span>Tên xe</span>}>
                <Input
                  value={searchName}
                  onChange={(e) => setSearchName(e?.target?.value)}
                />
              </Form.Item>
            </Form>
            <Form>
              <Form.Item label={<span>Tên hãng</span>}>
                <Input
                  value={searchVender}
                  onChange={(e) => setSearchVender(e?.target?.value)}
                />
              </Form.Item>
            </Form>
            <Form>
              <Form.Item label={<span>Số ghế</span>}>
                <Input
                  value={searchSeat}
                  onChange={(e) => setSearchSeat(e?.target?.value)}
                />
              </Form.Item>
            </Form>
            <Form>
              <Form.Item label={<span>Năm sản xuất</span>}>
                <Input
                  value={searchYear}
                  onChange={(e) => setSearchYear(e?.target?.value)}
                />
              </Form.Item>
            </Form>
          </div>
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={searchName ? dsData : dsCars}
            bordered
            size="small"
            pagination={{
              current: page,
              showSizeChanger: true,
              pageSize: pageSize,
              pageSizeOptions: ["10", "20", "50", "100"],
              onChange: onChangePage,
              position: ["bottomCenter"],
            }}
          />
        </Card>
      </div>
      {visible && (
        <Modal
          title="Thông tin chi tiết"
          width="1200px"
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setMode("");
            setDarDetail(undefined);
            setIdCar(undefined);
            form.setFieldsValue(initialValue);
          }}
          footer={[
            <Button
              key="back"
              type="text"
              className="!text-white !bg-gray-500"
              // icon={<HiOutlineXCircle className="mr-1 mb-0.5" />}
              onClick={() => {
                setVisible(false);
                setMode("");
                setDarDetail(undefined);
                setIdCar(undefined);
                form.setFieldsValue(initialValue);
              }}
            >
              Hủy
            </Button>,
            <Button
              onClick={() => {
                form
                  .validateFields()
                  .then((data) => {
                    onSubmit(data);
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
              htmlType="submit"
              key="submit"
              type="primary"
              // icon={<HiOutlineNewspaper className="mr-1 mb-0.5" />}
            >
              Lưu
            </Button>,
          ]}
        >
          <div>
            <Form
              form={form}
              name="basic"
              autoComplete="off"
              labelAlign="left"
              layout="vertical"
              onFinish={onSubmit}
            >
              <div className="grid grid-cols-2  gap-x-10   ">
                <Form.Item
                  label="Mã Xe"
                  name="code"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input disabled={mode === "view" || mode === "edit"} />
                </Form.Item>
                <Form.Item
                  label="Tên xe"
                  name="name"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input disabled={mode === "view"} />
                </Form.Item>
                <Form.Item
                  label="Hãng"
                  name="vendorsId"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Select
                    disabled={mode === "view"}
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    options={dsCarVendors?.map((e) => ({
                      ...e,
                      value: e?.id,
                      label: `${e?.code} - ${e?.name}`,
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ hình ảnh"
                  name="url"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input
                    placeholder="Nhập URL hình ảnh"
                    disabled={mode === "view"}
                    onChange={(e) => setUrlImage(e?.target?.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Năm sản xuất"
                  name="year"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input type="number" disabled={mode === "view"} />
                </Form.Item>
                <div className="flex justify-end">
                  <Image
                    style={{ width: 150 }}
                    preview={carDetail?.url ? true : false}
                    src={
                      urlImage
                        ? urlImage
                        : carDetail?.url
                        ? carDetail?.url
                        : "https://w7.pngwing.com/pngs/175/613/png-transparent-video-cameras-logo-graphy-camera-text-camera-lens-rectangle.png"
                    }
                    alt="ảnh xe"
                  />
                </div>
                <Form.Item
                  label="Số ghế"
                  name="seat"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Select
                    allowClear
                    placeholder="Tất cả"
                    disabled={mode === "view"}
                    options={[
                      { value: 4, label: "4 chỗ" },
                      { value: 7, label: "7 chỗ" },
                      { value: 16, label: "16 chỗ" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Giá xe"
                  name="price"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <InputNumber
                    className="!w-full !rounded-lg !text-black"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    disabled={mode === "view"}
                  />
                </Form.Item>
                <Form.Item
                  label="Biển số"
                  // name="price"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input disabled={mode === "view"} />
                </Form.Item>
                <Form.Item
                  label="Màu sắc"
                  name="color"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input disabled={mode === "view"} />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true, message: "không được bỏ trống !" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input.TextArea rows={4} disabled={mode === "view"} />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      )}
      <Modal
        title="Xóa thông tin xe"
        visible={visibleDelete}
        onCancel={() => setVisibleDelete(false)}
        onOk={() => {
          setVisibleDelete(false);
          onDelete();
        }}
      >
        <div>
          <span>
            Bạn có muốn xóa{" "}
            <span className="underline text-blue-500">{carDelete?.code}-</span>
            <span className="underline text-blue-500">
              {carDelete?.name}
            </span>{" "}
            hay không ?
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
