
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CalendarFloatingButton = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"erstanalyse"});
      cal("floatingButton", {
        "calLink": "nohypeai/erstanalyse", 
        "config": {
          "layout": "month_view"
        },
        "buttonText": "Termin buchen",
        "buttonColor": "#1A1F35", // Dunklere Farbe wie im Screenshot
        "buttonTextColor": "#FF0099" // Pink für den Text
      });
      cal("ui", {
        "styles": {
          "branding": {
            "brandColor": "#FF0099"
          }
        },
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#FF0099"},
          "dark": {"cal-brand": "#FF0099"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);
  
  return null;
};

export default CalendarFloatingButton;
