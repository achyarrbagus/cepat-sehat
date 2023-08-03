import React from 'react'
import Layout from "@/components/Layout";
import ButtonComp from '@/components/shared/Button';
import { Button, Radio, Space, Divider } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router';


function Result() {
  const router = useRouter();

  // Mendapatkan query parameter dengan nama 'param'
  const { uid } = router.query;

  const handleGoProfilUser = () =>{
  router.push(`/profile/?id=${uid}`)
  }
  const handleWhatsapp =()=>{
    console.log("hello world")
  }

  return (
    <>
      <Head>
        <title>result</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" />
        <meta name="keywords" />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
      </Head>
      <div className="flex flex-col bg-blue min-h-screen overflow-hidden">
        <main className="w-full min-h-full absolute top-0 left-0 z-0">
          <div className="container mx-auto max-w-layout h-screen" style={{ backgroundColor: "#00BABA" }}>
            <div className="min-h-screen parent flex justify-center items-center">
              <div className="justify-center items-center w-full" style={{ marginTop: "-5rem" }}>
                <div className="flex justify-center items-center">
                  <div className="circle rounded-full bg-white w-24 h-24 flex justify-center items-center">
                    <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 10.5L10.6667 18L26 3"
                        stroke="#00BABA"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-center pt-3 text-2xl flex justify-center items-center">
                  <p className="w-52 text-white" style={{ fontFamily: "Urbanist, sans-serif" }}>
                    Pendaftaran Telah Kami Terima
                  </p>
                </div>
                <div className="text-center mt-3 text-base font-medium flex justify-center items-center">
                  <p className="w-64 text-white">Customer service kami akan segera menghubungi Anda</p>
                </div>
                <div className="text-center mt-10 text-base font-medium flex justify-center items-center">
                  <button
                  onClick={handleWhatsapp}
                    type="button"
                    style={{backgroundColor:"#FD8312",color:"#FFFFFF"}}
                    className="w-80 h-12 flex justify-center gap-2 items-center text-whitehover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2   dark:focus:ring-blue-800"
                  >
                    <div>
                     <Image src={"/images/icons/Whatsapp.png"} alt={"jenis"} height="30" width="30" />
                      </div>
                     Hubungi CS Kami
                  </button>
                </div>
                 <div className="text-center text-base font-medium flex justify-center items-center">
                  <button 
                  onClick={handleGoProfilUser}
                    type="button"
                    style={{backgroundColor:"#FFFFFF",color:"#FD8312"}}
                    className="w-80 h-12 flex justify-center gap-2 items-center text-whitehover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2   dark:focus:ring-blue-800"
                  >
                   
                   Kembali ke Profil Anak
                  </button>
                </div>


                <div>

                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <Navbar /> */}
      </div>
    </>
  );
}

export default Result