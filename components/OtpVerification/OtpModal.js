/* eslint-disable react/no-unescaped-entities */
import { Table, Tabs, Modal, Button, Form } from "antd";
import react from "react";
import { useState } from "react";
import axios from "axios";

const OtpModal = ({ visible, setVisible, form, data, fecthUser }) => {
  const cooldownTime = 120000;
  const [cooldown, setCooldown] = useState(false);

  const resendCode = async () => {
    if (cooldown) {
      window.alert("Please wait. Resending code is in cooldown.");
      return;
    }
    try {
      const response = await fetch(`${process.env.URL_API}/login-phone/?phone=${data.phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });

      if (!response.ok) {
        throw new Error("Failed to send POST request");
      }
      // Set cooldown untuk mencegah permintaan berikutnya
      setCooldown(true);

      // Mulai countdown untuk mengatur kembali cooldown setelah batas waktu tertentu

      setTimeout(() => {
        setCooldown(false);
      }, cooldownTime);
    } catch (error) {
      console.error(error);
      // Set cooldown untuk mencegah permintaan berikutnya
      setCooldown(true);

      // Mulai countdown untuk mengatur kembali cooldown setelah batas waktu tertentu
      setTimeout(() => {
        setCooldown(false);
      }, cooldownTime);
    }
  };

  const handleOk = async () => {
    let otp1 = document.getElementById("otp1").value;
    let otp2 = document.getElementById("otp2").value;
    let otp3 = document.getElementById("otp3").value;
    let otp4 = document.getElementById("otp4").value;

    let dataRequest = {
      phone: data.phone,
      anak_id: form.anak_id,
      tinggi_badan: form.tinggi_badan,
      berat_badan: form.berat_badan,
      lingkar_kepala: form.lingkar_kepala,
      otp: otp1 + otp2 + otp3 + otp4,
    };

    try {
      const response = await fetch(`${process.env.URL_API}/tumbuh-kembang`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRequest),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error("Failed to send POST request");
        window.alert("Failed to send POST request");
        setVisible(false);
      }

      const responseData = await response.json();
      await fecthUser();
      window.alert("Updated Data success");
      setVisible(false);

      // Hapus window.location.reload() jika tidak diperlukan atau jika ingin memproses respons server lebih lanjut.
    } catch (error) {
      window.alert("Failed to send POST request");
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        title=""
        centered
        visible={visible}
        onOk={setVisible}
        onCancel={handleCancel}
        maskClosable={false}
        width={370}
        footer={[
          <Button
            key="back"
            className="w-2/4 rounded-full bg-white text-secondary-500 hover:bg-secondary-500 hover:border-secondary-500 hover:text-white border-solid border border-secondary-500"
            onClick={handleCancel}
          >
            Batal
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="w-2/4 bg-secondary-500 rounded-full hover:bg-white hover:text-secondary-500 hover:border-secondary-500 border-solid border border-secondary-500"
            onClick={handleOk}
          >
            Update{" "}
          </Button>,
        ]}
      >
        <div>
          <div className="pb-4">
            <h1>Otp Verification</h1>
          </div>
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            <div className="w-16 h-16 ">
              <input
                maxLength="1"
                className=" w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id="otp1"
              />
            </div>
            <div className="w-16 h-16 ">
              <input
                maxLength="1"
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id="otp2"
              />
            </div>
            <div className="w-16 h-16 ">
              <input
                maxLength="1"
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id="otp3"
              />
            </div>
            <div className="w-16 h-16 ">
              <input
                maxLength="1"
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id="otp4"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
            <p>Didn't recieve code?</p>{" "}
            <button
              disabled={cooldown}
              onClick={resendCode}
              className="flex flex-row items-center text-blue-600"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OtpModal;
