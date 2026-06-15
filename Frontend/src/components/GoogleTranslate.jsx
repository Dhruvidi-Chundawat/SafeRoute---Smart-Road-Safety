
import React, { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu,mr,ta,te",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="translateWrapper">
      <div id="google_translate_element"></div>
    </div>
  );
}

