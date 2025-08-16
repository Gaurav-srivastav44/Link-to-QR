import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

const App = () => {
  const [type, setType] = useState("link");
  const [inputValue, setInputValue] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const qrRef = useRef(null);

  // Initialize QR code instance
  const qrCode = useRef(
    new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: "https://example.com",
      image: "",
      dotsOptions: { color: "#000000", type: "rounded" },
      backgroundOptions: { color: "transparent" },
      imageOptions: { crossOrigin: "anonymous", margin: 0 },
    })
  ).current;

  // Mount QR code on first render
  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, []);

  // Update QR code when type/input/logo changes
  useEffect(() => {
    let qrData = "https://example.com";

    if (inputValue) {
      if (type === "link" || type === "image" || type === "pdf") {
        qrData = inputValue;
      } else if (type === "contact") {
        qrData = `BEGIN:VCARD
VERSION:3.0
FN:${inputValue}
TEL:1234567890
EMAIL:example@email.com
END:VCARD`;
      }
    }

    qrCode.update({
      data: qrData,
      image: imageURL || "",
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, [type, inputValue, imageURL]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };

  // Download QR code
  const downloadQR = () => {
    qrCode.download({ name: "qr-code", extension: "png" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row background-mountains relative text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Sidebar / Navbar */}
      <div className="relative z-10 w-full md:w-56 bg-gradient-to-b from-[#0f172a] to-[#1e293b] 
      flex flex-col md:items-center py-4 md:py-10 shadow-xl">

        {/* Logo / Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-cyan-400 border-2 border-cyan-400 
          py-2 px-4 rounded-full tracking-wide shadow-md hover:bg-cyan-400 hover:text-black 
          transition duration-300 mb-4 md:mb-8">
          QR Maker
        </h1>

        {/* Navigation */}
        <nav className="flex flex-wrap md:flex-col gap-2 md:gap-4 text-sm md:text-lg 
          w-full px-2 md:px-6 justify-center items-center">
          {["link", "image", "pdf", "contact"].map((item, i) => (
            <button
              key={i}
              onClick={() => setType(item)}
              className={`px-3 py-2 rounded-lg font-semibold transition duration-300 ${
                type === item
                  ? "bg-cyan-400 text-black"
                  : "text-cyan-200 hover:bg-cyan-400 hover:text-black"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center p-4 md:p-10">
        {/* Heading */}
        <section className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wide drop-shadow-md">
            CREATE YOUR QR CODE
          </h2>
          <p className="text-gray-300 mt-2 text-sm md:text-lg">
            Generate QR for {type.toUpperCase()}
          </p>
        </section>

        {/* Form & QR Box */}
        <div className="bg-[#132b46]/80 backdrop-blur-lg p-4 md:p-8 rounded-2xl shadow-2xl 
          w-full max-w-md md:max-w-xl text-center border border-white/10">

          {/* Input field */}
          <input
            type="text"
            placeholder={
              type === "link"
                ? "Enter your URL"
                : type === "image"
                ? "Enter Image URL"
                : type === "pdf"
                ? "Enter PDF URL"
                : "Enter Contact Name"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 md:py-3 rounded-lg mb-4 md:mb-5 text-black 
              focus:ring-2 focus:ring-yellow-400 outline-none text-sm md:text-base"
          />

          {/* Upload logo */}
          <label className="block mb-4 md:mb-6 text-left text-sm md:text-base">
            <span className="text-yellow-400 font-semibold">
              Upload Logo to Add at Center
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full mt-2 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 file:text-sm file:font-semibold
                file:bg-yellow-400 file:text-black
                hover:file:bg-yellow-300 cursor-pointer"
            />
          </label>

          {/* QR Preview */}
          <div
            ref={qrRef}
            className="flex justify-center items-center mb-4 md:mb-6 bg-gradient-to-br 
              from-white via-gray-200 to-gray-300 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-300"
          ></div>

          {/* Download Button */}
          <button
            onClick={downloadQR}
            className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 
              text-black font-bold rounded-xl shadow-lg hover:scale-105 
              hover:shadow-yellow-500/50 transform transition-all duration-300 
              text-sm md:text-base"
          >
            Download QR
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
