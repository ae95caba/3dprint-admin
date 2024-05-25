import html2canvas from "html2canvas";
import { useEffect, useState, useContext, useRef } from "react";
import TimeStamp from "./TimeStamp";

export default function ShareMenuSection({
  children,
  productsList,
  flavoursList,
}) {
  const [shareData, setShareData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (ref.current) {
      captureImage();
      getDataToShare();
    }
  }, [ref.current, productsList, flavoursList]);

  async function getDataToShare() {
    setIsLoading(true);
    const scale = 2;
    const canvas = await html2canvas(ref.current, { scale });
    canvas.toBlob(async (blob) => {
      const files = [new File([blob], "image.png", { type: blob.type })];
      const shareData = {
        text: "Some text",
        title: "Some title",
        files,
      };
      setShareData(shareData);
      setIsLoading(false);
    });
  }

  const captureImage = async () => {
    const scale = 2;
    const canvas = await html2canvas(ref.current, { scale });
    const dataURL = canvas.toDataURL("image/png");
    setImageSrc(dataURL);
  };

  async function sendShare() {
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log("File was shared successfully");
        setShareData(null);
      } else {
        throw new Error("Funcion no compatible en tu dispositivo");
      }
    } catch (err) {
      console.error(err.name, err.message);
      alert(err.message);
    }
  }
  return (
    <section className="share">
      <div
        ref={ref}
        className="container"
        style={{ position: "absolute", right: "999990px" }}
      >
        <TimeStamp />

        {children}
      </div>
      {imageSrc && (
        <img className="promotional" src={imageSrc} alt="Captured content" />
      )}

      {isLoading && (
        <button className="loadingDots" disabled>
          CARGANDO
        </button>
      )}

      {shareData && <button onClick={sendShare}>COMPARTIR IMAGEN</button>}
    </section>
  );
}
