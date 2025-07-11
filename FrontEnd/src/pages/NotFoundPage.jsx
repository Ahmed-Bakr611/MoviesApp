import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const [lottieReady, setLottieReady] = useState(false);

  useEffect(() => {
    const scriptUrl =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (existingScript) {
      if (window.customElements?.get("lottie-player")) {
        setLottieReady(true); // already loaded
      } else {
        existingScript.addEventListener("load", () => setLottieReady(true));
      }
    } else {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => setLottieReady(true);
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="d-flex align-items-center min-vh-100 py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            {lottieReady && (
              <div className="lc-block">
                <lottie-player
                  src="https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              </div>
            )}
          </div>
          <div className="col-md-6 text-center text-md-start ">
            <div className="lc-block mb-3">
              <h1 className="fw-bold h4">PAGE NOT FOUND!</h1>
            </div>
            <div className="lc-block mb-3">
              <h1 className="display-1 fw-bold text-muted">Error 404</h1>
            </div>
            <div className="lc-block mb-5">
              <p className="rfs-11 fw-light">
                The page you are looking for was moved, removed or might never
                existed.
              </p>
            </div>
            <div className="lc-block">
              <Link className="btn btn-lg btn-secondary" to="/" role="button">
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
