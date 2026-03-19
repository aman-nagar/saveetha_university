// src/pages/public/DownloadPage.jsx

import { usePublicContent } from "../../hooks/usePublicContent";
import {
  MdOutlineFileDownload,
  MdPictureAsPdf,
  MdOutlineCloudDownload,
} from "react-icons/md";
import { motion } from "framer-motion";

export default function DownloadFormPage() {
  const { data, loading } = usePublicContent();
  const forms = data?.downloadForms || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleDownload = (url, fileName) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || "download.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header Section - Adjusted padding for mobile */}
      <div className="bg-primary pt-20 md:pt-24 pb-24 md:pb-32 px-4 text-center relative overflow-hidden">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest"
          >
            Downloads
          </motion.h1>
          <div className="h-1.5 w-16 md:w-24 bg-accent mx-auto mt-4 rounded-full" />
          <p className="text-white/60 mt-4 max-w-xl mx-auto font-light italic text-sm md:text-base">
            Access official university forms, brochures, and examination
            documents.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Section Title */}
          <div className="bg-white p-5 md:p-8 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <MdOutlineCloudDownload size={24} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-primary">
              Available Forms
            </h2>
          </div>

          {/* Table Container */}
          <div className="w-full">
            {/* Desktop Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black p-4 px-8">
              <div className="col-span-1">#</div>
              <div className="col-span-8">Document Name</div>
              <div className="col-span-3 text-center">Action</div>
            </div>

            {/* List Body */}
            <div className="divide-y divide-gray-100">
              {forms.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-accent/5 transition-colors"
                >
                  {/* Mobile Layout (< md) */}
                  <div className="md:hidden p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <MdPictureAsPdf className="text-red-500 text-2xl shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-primary font-bold text-base leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase mt-1">
                          Updated:{" "}
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {item.file_url ? (
                      <button
                        onClick={() => handleDownload(item.file_url, item.file)}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95"
                      >
                        <MdOutlineFileDownload size={20} />
                        Download PDF
                      </button>
                    ) : (
                      <div className="w-full py-3 bg-gray-100 text-gray-400 text-center rounded-xl text-xs italic">
                        File Pending
                      </div>
                    )}
                  </div>

                  {/* Desktop Layout (>= md) */}
                  <div className="hidden md:grid grid-cols-12 items-center p-6 px-8">
                    <div className="col-span-1 text-sm font-medium text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-8">
                      <div className="flex items-center gap-3">
                        <MdPictureAsPdf className="text-red-500 text-xl shrink-0" />
                        <div>
                          <span className="text-primary font-bold text-base group-hover:text-accent transition-colors block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase">
                            Updated:{" "}
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 text-center">
                      {item.file_url ? (
                        <button
                          onClick={() =>
                            handleDownload(item.file_url, item.file)
                          }
                          className="inline-flex items-center gap-2 bg-primary text-white hover:bg-accent px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
                        >
                          <MdOutlineFileDownload size={18} />
                          Download
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs italic">
                          File Pending
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {forms.length === 0 && (
            <div className="p-16 text-center text-gray-400 italic">
              No documents available at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
