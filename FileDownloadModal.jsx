export default function FileDownloadModal({ file }) {
  const downloadFile = () => {
    const blob = new Blob([file.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
  };

  return (
    <div className="mt-2 p-2 bg-gray-800 rounded flex justify-between items-center shadow-md">
      <span>{file.name} ready</span>
      <button
        className="bg-green-500 text-black px-2 py-1 rounded hover:bg-green-600"
        onClick={downloadFile}
      >
        Download
      </button>
    </div>
  );
}