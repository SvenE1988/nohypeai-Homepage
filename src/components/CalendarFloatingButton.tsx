
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
        "buttonColor": "#FF0099",
        "buttonTextColor": "#FFFFFF"
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
  
  // This component doesn't render anything visible itself,
  // it just initializes the floating button
  return null;
};

export default CalendarFloatingButton;
