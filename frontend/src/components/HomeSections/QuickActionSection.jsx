import React from "react";
import { Stethoscope, MonitorSmartphone, PhoneCall } from "lucide-react";

const QuickActionSection = () => {
  const actions = [
    {
      id: 1,
      title: "Pelayanan IGD 24 Jam",
      desc: "Layanan gawat darurat yang siap sedia selama 24 jam dengan respon cepat untuk kondisi kritis.",
      icon: <Stethoscope size={32} className="text-red-500" />,
      iconBg: "bg-red-50",
      btnText: "Hubungi IGD",
      btnColor: "bg-red-500 hover:bg-red-600",
      waLink:
        "https://wa.me/6285113055755?text=Assalamualaikum%20wr.%20wb.%20RS%20UMS%20A.R.%20Fachrudin,%20saya%20membutuhkan%20bantuan%20IGD%20darurat%20sekarang.",
    },
    {
      id: 2,
      title: "Pendaftaran Online",
      desc: "Dengan fasilitas ini Anda dapat mendaftarkan diri sebagai pasien secara online dengan mudah tanpa antre.",
      icon: <MonitorSmartphone size={32} className="text-green-600" />,
      iconBg: "bg-green-50",
      btnText: "Daftar",
      btnColor: "bg-green-600 hover:bg-green-700",
      waLink:
        "https://wa.me/6285129972996?text=Assalamualaikum%20wr.%20wb.%20RS%20UMS%20A.R.%20Fachrudin,%20saya%20ingin%20melakukan%20pendaftaran%20online.",
    },
    {
      id: 3,
      title: "Informasi & Pengaduan",
      desc: "Layanan informasi ini memberikan kemudahan bagi pasien, keluarga pasien, dan pengunjung rumah sakit.",
      icon: <PhoneCall size={32} className="text-[#175e97]" />,
      iconBg: "bg-blue-50",
      btnText: "Selengkapnya",
      btnColor: "bg-[#175e97] hover:bg-blue-900",
      waLink:
        "https://wa.me/6285169799799?text=Assalamualaikum%20wr.%20wb.%20RS%20UMS%20A.R.%20Fachrudin,%20saya%20ingin%20bertanya%20seputar%20informasi%20layanan.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {actions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[1.5rem] p-6 lg:p-8 border border-gray-100 shadow-sm flex items-start gap-4 lg:gap-5 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group"
            >
              {/* Ikon */}
              <div
                className={`p-4 rounded-2xl shrink-0 transition-colors duration-300 ${item.iconBg}`}
              >
                {item.icon}
              </div>

              {/* Teks & Tombol */}
              <div className="flex flex-col h-full">
                <h3 className="text-lg lg:text-xl font-extrabold text-gray-800 mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-5 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
                <a
                  href={item.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto w-fit text-white text-xs lg:text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg ${item.btnColor}`}
                >
                  {item.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionSection;
