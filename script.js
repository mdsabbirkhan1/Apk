document.getElementById("downloadBtn").addEventListener("click", function() {
    const apkLink = document.createElement("a");
    apkLink.href = "m.apk";
    apkLink.download = "MyApp.apk";
    apkLink.click();
});