document.getElementById("convertBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("upload");
  const file = fileInput.files[0];
  
  if (!file) {
    alert("Please upload a JPEG image!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.getElementById("downloadLink");
      downloadLink.href = pngUrl;
      downloadLink.style.display = "block";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
