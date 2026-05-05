// StrukturOrganisasi.jsx

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StrukturOrganisasi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-8 overflow-x-auto">
      
      {/* BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition-all"
      >
        <ArrowLeft size={20} />
        Kembali
      </button>

      {/* TITLE */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">
          STRUKTUR ORGANISASI RUMAH SAKIT UMS A.R. FACHRUDIN
        </h1>
      </div>

      {/* STRUCTURE */}
      <div className="relative min-w-[1800px] pb-20">

        {/* ================= TOP ================= */}
        <div className="flex justify-center relative">
          <div className="border-2 border-gray-500 bg-white px-10 py-4 font-bold shadow">
            UMS
          </div>
        </div>

        {/* garis bawah UMS */}
        <div className="flex justify-center">
          <div className="w-[2px] h-12 bg-black"></div>
        </div>

        {/* garis horizontal */}
        <div className="absolute top-[95px] left-[34%] w-[32%] h-[2px] bg-black"></div>

        {/* ================= BPH + DIREKTUR ================= */}
        <div className="flex justify-center gap-[350px] relative">

          {/* BPH */}
          <div className="relative">
            <div className="border-2 border-gray-500 bg-white px-12 py-4 font-bold shadow text-center">
              BADAN PEMBINA HARIAN (BPH) RS
            </div>

            {/* garis vertikal */}
            <div className="absolute left-1/2 -top-12 w-[2px] h-12 bg-black"></div>
          </div>

          {/* DIREKTUR */}
          <div className="relative flex flex-col items-center">
            <div className="border-2 border-gray-500 bg-white px-14 py-4 font-bold shadow">
              DIREKTUR
            </div>

            {/* garis vertikal */}
            <div className="w-[2px] h-32 bg-black"></div>
          </div>
        </div>

        {/* ================= KOMITE - SPI ================= */}
        <div className="absolute top-[175px] left-[220px] right-[220px] h-[2px] border-t-2 border-dashed border-black"></div>

        {/* KOMITE */}
        <div className="absolute top-[120px] left-0 w-[330px] border-2 border-gray-500 bg-white shadow">
          <div className="border-b-2 border-gray-400 py-4 text-center font-bold text-2xl">
            KOMITE
          </div>

          <div className="p-6 text-[17px] leading-9">
            <ul className="list-disc pl-6">
              <li>Komite Medis</li>
              <li>Komite Perawatan</li>
              <li>Komite Mutu</li>
              <li>Komite Pencegahan dan Pengendalian Infeksi</li>
              <li>Komite Etik & Hukum RS</li>
              <li>Komite Farmasi & Terapi</li>
              <li>Komite Keselamatan dan Kesehatan Kerja RS</li>
              <li>Komite Rekam Medis</li>
              <li>Komite Tenaga Kesehatan lain</li>
              <li>Komite Program Pengendalian Resistensi Antimikroba</li>
            </ul>
          </div>
        </div>

        {/* SPI */}
        <div className="absolute top-[130px] right-0 w-[300px] border-2 border-gray-500 bg-white shadow">
          <div className="py-8 text-center font-bold text-2xl">
            SATUAN PEMERIKSAAN INTERNAL (SPI)
          </div>
        </div>

        {/* ================= WAKIL DIREKTUR ================= */}
        <div className="flex justify-center mt-20">
          <div className="flex flex-col items-center">
            <div className="border-2 border-gray-500 bg-white px-12 py-4 font-bold shadow">
              WAKIL DIREKTUR
            </div>

            <div className="w-[2px] h-20 bg-black"></div>
          </div>
        </div>

        {/* garis horizontal utama */}
        <div className="relative">
          <div className="absolute left-[370px] right-[320px] h-[2px] bg-black top-0"></div>
        </div>

        {/* ================= 3 MANAJER ================= */}
        <div className="flex justify-center gap-[220px] mt-20">

          {/* PELAYANAN */}
          <div className="flex flex-col items-center relative">
            <div className="absolute -top-20 w-[2px] h-20 bg-black"></div>

            <div className="border-2 border-gray-500 bg-white px-8 py-4 font-bold text-center shadow">
              MANAJER
              <br />
              PELAYANAN & SDM
            </div>

            <div className="w-[2px] h-16 bg-black"></div>

            <div className="flex gap-6">

              {/* PELAYANAN MEDIS */}
              <div className="flex flex-col items-center">
                <div className="border-2 border-gray-500 bg-white px-5 py-4 font-bold text-center shadow w-[250px]">
                  KEPALA SEKSI
                  <br />
                  PELAYANAN MEDIS
                </div>

                <div className="w-[2px] h-12 bg-black"></div>

                <div className="border-2 border-gray-400 bg-white p-5 w-[250px] text-[16px] leading-8 shadow">
                  <ul className="list-disc pl-5">
                    <li>Instalasi Gawat Darurat</li>
                    <li>Instalasi Bedah Sentral</li>
                    <li>Instalasi Perawatan Intensif</li>
                    <li>Instalasi Rawat Jalan</li>
                    <li>Instalasi Rawat Inap</li>
                  </ul>
                </div>
              </div>

              {/* PENUNJANG */}
              <div className="flex flex-col items-center">
                <div className="border-2 border-gray-500 bg-white px-5 py-4 font-bold text-center shadow w-[280px]">
                  KEPALA SEKSI
                  <br />
                  PENUNJANG MEDIS &
                  <br />
                  PELAYANAN NON MEDIS
                </div>

                <div className="w-[2px] h-12 bg-black"></div>

                <div className="border-2 border-gray-400 bg-white p-5 w-[280px] text-[16px] leading-8 shadow">
                  <ul className="list-disc pl-5">
                    <li>Instalasi Farmasi</li>
                    <li>Instalasi Radiologi</li>
                    <li>Instalasi Laboratorium</li>
                    <li>Instalasi Gizi</li>
                    <li>Instalasi Rekam Medis</li>
                    <li>Instalasi Rehabilitasi Medis</li>
                    <li>Kerohanian</li>
                    <li>Pemulasaran Jenazah</li>
                    <li>Humas dan Marketing</li>
                  </ul>
                </div>
              </div>

              {/* SDM */}
              <div className="flex flex-col items-center">
                <div className="border-2 border-gray-500 bg-white px-5 py-4 font-bold text-center shadow w-[240px]">
                  KEPALA SEKSI SDM
                </div>

                <div className="w-[2px] h-12 bg-black"></div>

                <div className="border-2 border-gray-400 bg-white p-5 w-[240px] text-[16px] leading-8 shadow">
                  <ul className="list-disc pl-5">
                    <li>Kesekretariatan</li>
                    <li>Kepegawaian</li>
                    <li>Pendidikan dan Penelitian</li>
                  </ul>
                </div>
              </div>

              {/* KEPERAWATAN */}
              <div className="flex flex-col items-center">
                <div className="border-2 border-gray-500 bg-white px-5 py-4 font-bold text-center shadow w-[240px]">
                  KEPALA SEKSI
                  <br />
                  KEPERAWATAN &
                  <br />
                  KEBIDANAN
                </div>

                <div className="w-[2px] h-12 bg-black"></div>

                <div className="border-2 border-gray-400 bg-white p-5 w-[240px] text-[16px] leading-8 shadow">
                  <ul className="list-disc pl-5">
                    <li>Keperawatan</li>
                    <li>Kebidanan</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* KEUANGAN */}
          <div className="flex flex-col items-center relative">
            <div className="absolute -top-20 w-[2px] h-20 bg-black"></div>

            <div className="border-2 border-gray-500 bg-white px-10 py-4 font-bold text-center shadow">
              MANAJER
              <br />
              KEUANGAN
            </div>

            <div className="w-[2px] h-16 bg-black"></div>

            <div className="border-2 border-gray-500 bg-white px-8 py-4 font-bold text-center shadow">
              KEPALA SEKSI
              <br />
              KEUANGAN
            </div>

            <div className="w-[2px] h-12 bg-black"></div>

            <div className="border-2 border-gray-400 bg-white p-5 w-[250px] text-[16px] leading-8 shadow">
              <ul className="list-disc pl-5">
                <li>Billing</li>
                <li>Kasir</li>
                <li>Administrasi Keuangan</li>
                <li>Pajak</li>
                <li>Logistik</li>
              </ul>
            </div>
          </div>

          {/* SARANA */}
          <div className="flex flex-col items-center relative">
            <div className="absolute -top-20 w-[2px] h-20 bg-black"></div>

            <div className="border-2 border-gray-500 bg-white px-8 py-4 font-bold text-center shadow">
              MANAJER SARANA
              <br />
              DAN PRASARANA
            </div>

            <div className="w-[2px] h-16 bg-black"></div>

            <div className="border-2 border-gray-500 bg-white px-8 py-4 font-bold text-center shadow">
              KEPALA SEKSI SARANA &
              <br />
              PRASARANA
            </div>

            <div className="w-[2px] h-12 bg-black"></div>

            <div className="border-2 border-gray-400 bg-white p-5 w-[320px] text-[16px] leading-8 shadow">
              <ul className="list-disc pl-5">
                <li>Instalasi Information Technology (IT)</li>
                <li>Instalasi Pemeliharaan Sarana Rumah Sakit (IPSRS)</li>
                <li>Instalasi Central Sterile Supply Department (CSSD)</li>
                <li>Instalasi Linen dan Laundry</li>
                <li>Instalasi Sanitasi Lingkungan</li>
                <li>Unit Keamanan</li>
                <li>Unit Kebersihan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}