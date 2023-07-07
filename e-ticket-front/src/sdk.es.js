import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const urlAPI = "http://151.80.32.111:5001";

const generateId = (type) => {
  return `${type}-${crypto.randomUUID()}`;
};

const getScreenSize = (window2) => {
  const { innerWidth } = window2;
  if (innerWidth < 576) return "sm";
  if (innerWidth < 768) return "md";
  if (innerWidth < 992) return "lg";
  return "xl";
};

let timeoutId;
let lastExecutedTime = 0;
const throttle = (func, delay) => {
  return function (...args) {
    const currentTime = Date.now();

    const executeFunction = () => {
      lastExecutedTime = currentTime;
      func.apply(this, args);
    };

    if (currentTime - lastExecutedTime > delay) {
      executeFunction();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(executeFunction, delay);
    }
  };
};
const resolution = {
  width: 0,
  height: 0,
};

const apiRequest = ({ beacon, url, payload }) => {
  if (beacon) {
    navigator.sendBeacon(urlAPI + url, JSON.stringify(payload));
  } else {
    axios.post(urlAPI + url, payload).catch((err) => {
      console.log("debug", err);
    });
  }
};

const TrackingContext = React.createContext({
  visitorId: "",
  appId: "",
});

const TrackingProvider = ({
  children,
  appId,
  withTrackingSession = true,
  withTrackingMouse = true,
}) => {
  const visitorId = React.useMemo(() => {
    const localStorageClientId = localStorage.getItem("clientId");
    if (localStorageClientId) return localStorageClientId;
    else {
      const newClientId = generateId("client");
      localStorage.setItem("clientId", newClientId);
      return newClientId;
    }
  }, []);

  const trackingContext = React.useMemo(() => {
    return { visitorId, appId };
  }, [visitorId, appId]);

  const location = useLocation();

  React.useEffect(() => {
    if (withTrackingSession) {
      apiRequest({
        beacon: true,
        url: "/webanalytics/trackLocation",
        payload: {
          location: location.pathname,
          visitorId,
          appId,
        },
      });
    }
  }, [appId, location, visitorId, withTrackingSession]);

  React.useEffect(() => {
    if (withTrackingSession) {
      const time = {
        start: Date.now(),
        end: null,
      };

      const trackTime = () => {
        time.end = Date.now();
        apiRequest({
          beacon: true,
          url: "/webanalytics/trackSession",
          payload: {
            visitorId,
            appId,
            ...time,
          },
        });
      };
      window.addEventListener("beforeunload", trackTime);

      return () => {
        window.removeEventListener("beforeunload", trackTime);
        trackTime();
      };
    }
  }, [appId, visitorId, withTrackingSession]);

  withTrackingMouse && TrackMouseMovement(visitorId, appId, location.pathname);

  return /* @__PURE__ */ React.createElement(
    TrackingContext.Provider,
    {
      value: trackingContext,
    },
    children
  );
};

const useTrackingContext = () => {
  const context = React.useContext(TrackingContext);
  if (context === void 0) {
    throw new Error(
      "useTrackingContext must be used within a TrackingProvider"
    );
  }
  return context;
};

const useTrackEvent = ({ tag, type }) => {
  const ref = React.useRef(null);
  const { visitorId, appId } = useTrackingContext();
  React.useEffect(() => {
    const track = () => {
      apiRequest({
        beacon: true,
        url: "/webanalytics/trackBeacon",
        payload: {
          event: type,
          tag,
          visitorId,
          appId,
        },
      });
    };

    if (ref.current) {
      ref.current.addEventListener(type, track);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener(type, track);
      }
    };
  }, [ref, visitorId]);

  return {
    ref,
  };
};

const setSize = () => {
  resolution.height = window.innerHeight;
  resolution.width = document.documentElement.clientWidth;
  console.log("debug ", { resolution });
};

const TrackMouseMovement = (visitorId, appId, path) => {
  const [mousePosition, setMousePosition] = React.useState([]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    setMousePosition([
      ...mousePosition,
      {
        x: clientX,
        y: clientY,
        screenSize: getScreenSize(window),
        ...resolution,
      },
    ]);
  };

  React.useEffect(() => {
    setSize();
  }, []);

  React.useEffect(() => {
    const track = () => {
      console.log("debug", { mousePosition });

      mousePosition.length > 0 &&
        apiRequest({
          beacon: true,
          url: "/webanalytics/trackPosition",
          payload: {
            event: "mouse",
            visitorId,
            appId,
            location: path,
            mousePosition,
          },
        });

      setMousePosition([]);
    };
    let handleThrottledTrack = null;
    if (document) {
      handleThrottledTrack = throttle(track, 2000);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousemove", handleThrottledTrack);
      window.addEventListener("resize", setSize);
    }
    return () => {
      if (document) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mousemove", handleThrottledTrack);
        document.removeEventListener("resize", setSize);
      }
    };
  }, [mousePosition, document]);
  return mousePosition;
};

export {
  TrackingProvider,
  apiRequest,
  generateId,
  getScreenSize,
  throttle,
  useTrackEvent,
  useTrackingContext,
};
