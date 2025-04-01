
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CalendarFloatingButton = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"erstanalyse"});
      cal("floatingButton", {
        "calLink": "sven-erkens-bp1ovm/erstanalyse",
        "config": {
          "layout": "month_view"
        }
      });
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#292929"},
          "dark": {"cal-brand": "#fafafa"}
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
