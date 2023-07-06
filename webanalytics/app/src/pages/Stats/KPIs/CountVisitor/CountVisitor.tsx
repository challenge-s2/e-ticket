import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL_PROD
    : process.env.REACT_APP_URL_DEV;

interface Props {
  editing: boolean;
  filter: object;
}

const CountVisitor: React.FC<Props> = ({ editing, filter }) => {
  const [countVisitors, setCountVisitors] = useState(0);

  const { applicationId } = useParams();

  const fetchCount = useCallback(async () => {
    if (filter) {
      console.log("debug 2", filter);

      const {
        data: { countVisitors },
      } = await axios.post<string, { data: { countVisitors: number } }>(
        url + "/dashboard/countVisitor/" + applicationId,
        { filter }
      );

      setCountVisitors(countVisitors);
    }
  }, [applicationId, filter]);

  useEffect(() => {
    console.log("debug", filter);
    if (applicationId?.length === 36) {
      fetchCount();
    }
  }, [applicationId?.length, fetchCount, filter]);

  return (
    <div
      onMouseDown={(e) => {
        !editing && e.stopPropagation();
      }}
    >
      <div className="value" style={{ color: "rgb(136 186 70)" }}>
        {countVisitors}
      </div>
      <div className="label">visiteurs</div>
    </div>
  );
};

export default CountVisitor;
