// StrukturOrganisasi.jsx

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StrukturOrganisasi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* BUTTON KEMBALI */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-3xl p-10 shadow-xl mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Struktur Organisasi
          </h1>

          <p className="mt-3 text-green-100 text-lg">
            Rumah Sakit UMS A.R. Fachrudin
          </p>
        </div>

        {/* STRUKTUR */}
        <div className="overflow-x-auto">
          <div className="min-w-[1200px] flex flex-col items-center gap-10">

            {/* UMS */}
            <div className="bg-white border-2 border-gray-300 px-10 py-4 rounded-xl shadow-md font-bold text-lg">
              UMS
            </div>

            {/* DIREKTUR */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-10 bg-gray-400"></div>

              <div className="bg-green-600 text-white px-10 py-4 rounded-xl shadow-lg font-bold text-lg">
                DIREKTUR
              </div>
            </div>

            {/* SPI */}
            <div className="flex justify-between w-full px-20">
              
              {/* KOMITE */}
              <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="bg-green-100 text-green-700 font-bold text-center py-4 rounded-t-2xl">
                  KOMITE
                </div>

                <ul className="p-6 space-y-2 text-gray-700 text-sm">
                  <li>• Komite Medis</li>
                  <li>• Komite Perawatan</li>
                  <li>• Komite Mutu</li>
                  <li>• Komite Pencegahan Infeksi</li>
                  <li>• Komite Etik & Hukum RS</li>
                  <li>• Komite Farmasi & Terapi</li>
                  <li>• Komite Rekam Medis</li>
                  <li>• Komite Tenaga Kesehatan</li>
                </ul>
              </div>

              {/* WAKIL DIREKTUR */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white px-10 py-4 rounded-xl shadow-lg font-bold">
                  WAKIL DIREKTUR
                </div>

                <div className="w-1 h-10 bg-gray-400"></div>

                {/* 3 CABANG */}
                <div className="flex gap-10">

                  {/* PELAYANAN */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-md font-bold text-center">
                      MANAJER
                      <br />
                      PELAYANAN & SDM
                    </div>

                    <div className="w-1 h-8 bg-gray-400"></div>

                    <div className="grid grid-cols-2 gap-4 w-[500px]">

                      <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-green-700 mb-3">
                          Pelayanan Medis
                        </h3>

                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• IGD</li>
                          <li>• Bedah Sentral</li>
                          <li>• Rawat Jalan</li>
                          <li>• Rawat Inap</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-green-700 mb-3">
                          Penunjang Medis
                        </h3>

                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Farmasi</li>
                          <li>• Radiologi</li>
                          <li>• Laboratorium</li>
                          <li>• Rekam Medis</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-green-700 mb-3">
                          SDM
                        </h3>

                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Kepegawaian</li>
                          <li>• Pendidikan</li>
                          <li>• Penelitian</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-green-700 mb-3">
                          Keperawatan
                        </h3>

                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Keperawatan</li>
                          <li>• Kebidanan</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* KEUANGAN */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-md font-bold text-center">
                      MANAJER
                      <br />
                      KEUANGAN
                    </div>

                    <div className="w-1 h-8 bg-gray-400"></div>

                    <div className="bg-gray-50 border rounded-xl p-5 shadow-sm w-64">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Billing</li>
                        <li>• Kasir</li>
                        <li>• Administrasi</li>
                        <li>• Pajak</li>
                        <li>• Logistik</li>
                      </ul>
                    </div>
                  </div>

                  {/* SARANA */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-md font-bold text-center">
                      MANAJER SARANA
                      <br />
                      & PRASARANA
                    </div>

                    <div className="w-1 h-8 bg-gray-400"></div>

                    <div className="bg-gray-50 border rounded-xl p-5 shadow-sm w-72">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Instalasi IT</li>
                        <li>• IPSRS</li>
                        <li>• CSSD</li>
                        <li>• Linen & Laundry</li>
                        <li>• Sanitasi Lingkungan</li>
                        <li>• Keamanan</li>
                        <li>• Kebersihan</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* SPI */}
              <div className="w-72 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="bg-red-100 text-red-700 font-bold text-center py-4 rounded-t-2xl">
                  SATUAN PEMERIKSAAN INTERNAL
                </div>

                <div className="p-6 text-center text-gray-700 font-medium">
                  SPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}