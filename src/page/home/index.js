import { Button, Carousel, Image, Typography } from "antd";
import React, { useState, useEffect } from "react";

import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import Header from "../../components/header";
import { DoubleRightOutlined } from "@ant-design/icons";
import Footer from "../../components/footer";
const Home = () => {
  const [dsCars, setDsCars] = useState([]);
  const [carDetail, setCarDetail] = useState([]);
  const [idCar, setIdCar] = useState();
  const [visible, setVisible] = useState(false);
  const getDsCars = async () => {
    try {
      const resp = await axios.get(
        `https://cars-rental-api.herokuapp.com/cars`,
        {}
      );
      setDsCars(resp?.data?.data?.cars);
    } catch (error) {
      console.log(error);
    }
  };
  const getCarDetail = async () => {
    if (idCar) {
      try {
        const resp = await axios.get(
          `https://cars-rental-api.herokuapp.com/cars/${idCar}`,
          {}
        );
        setCarDetail([resp?.data?.data?.car]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCarDetail();
  }, [idCar]);
  useEffect(() => {
    getDsCars();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <Carousel autoplay>
          <div>
            <img
              src="https://hondagiaiphong.net/images/2018/Tin%20tuc/10.honda-viet-nam-cong-bo-gia-ban-le-moi/01-banner-top-gia-xe-oto-honda.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-o-to_103213258.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="https://honda-mydinh.com.vn/wp-content/uploads/2016/12/01-banner-top-xe-oto-honda-city-2018.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="http://hondaotohungyen.com/wp-content/uploads/2018/06/Xe-Honda-Odyssey-2016-tai-viet-nam-1088x403.png"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
        </Carousel>
      </div>
      <div className=" flex justify-center justify-items-center pb-12">
        <div className="w-4/5">
          {/* <div id="4cho" style={{ marginTop: -100 }} className="hidden"></div> */}
          <Typography>Xe 4 chỗ</Typography>

          <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-x-10">
            {dsCars?.map((e) => {
              return (
                <div className="flex  mt-10 border rounded-md shadow-sm px-3 py-4">
                  <div className="mr-2">
                    <img
                      className="rounded-md shadow-sm "
                      src={e?.url}
                      style={{ height: 250, width: 350 }}
                      alt="ảnh ô tô"
                    />
                  </div>
                  <div>
                    <span>{e?.name}</span>
                    <div>
                      <Button
                        className="mr-2 !text-white !bg-green-500"
                        type="primary"
                        onClick={() => {
                          setVisible(true);
                          setIdCar(e?.id);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <DoubleRightOutlined className="mr-2" />{" "}
                          <span>Xem chi tiết</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Thông tin chi tiết"
        width="1200px"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <div className=" border rounded-md shadow-sm px-3 py-4">
          {carDetail?.map((e) => {
            return (
              <div className="flex  ">
                <div className="mr-10">
                  <Image
                    // className="rounded-md shadow-sm "
                    src={e?.url}
                    width={500}
                    alt="ảnh ô tô"
                  />
                </div>
                <div>
                  <span>{e?.name}</span>
                </div>
              </div>
            );
          })}
          <div className="pl-10 mt-10 border-dashed border-2 pt-2">
            <h1 className="text-2xl">Chú ý</h1>
            <ul className="list-disc">
              <li>
                Giá trên áp dụng cho mỗi ca xe được phép đi 250km và trong 8
                giờ. (Ca xe từ 6-8h đến 18h00 hàng ngày).
              </li>
              <li>Giao xe từ 6h00 đến 8h00 hoặc 19h00 đến 21h00 hàng ngày.</li>
              <li>
                Sử dụng xe dưới 4giờ giá 450.000đ/ca. Mỗi giờ tiếp theo giá:
                100.000 đ/giờ.
              </li>
              <li>
                Quý khách lưu ý trả xe vào 18h00 đến 19h00 hàng ngày. (Sau 18h00
                chúng tôi tính phí phụ trội theo báo giá).
              </li>
              <li>
                Quý khách tự ý sử dụng xe quá giờ ghi trong Hợp đồng sẽ tính
                bằng 150% giá giờ phụ trội trong báo giá này.
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default Home;
