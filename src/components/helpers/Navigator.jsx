import { useControls } from "leva";
import { useNavigate } from "react-router-dom";

function Navigator() {
  const navigate = useNavigate();

  useControls("helpers", {
    navigation: {
      options: [
        "/",
        "/login-authentication",
        "/dashboard/home",
        "/dashboard/well-log-viewer",
        "/dashboard/drilling-data-management",
        "/dashboard/workspaces",
        "/dashboar/production",
        "/project-management-configuration",
        "/well-trajectory-survey-visualization",
        "/plugin-management-sdk-configuration",
        "/dashboard/geology",
      ],
      // value: "/dashboard-project-overview",
      onChange: (r) => {
        navigate(r);
      },
    },
  });

  return (
    <>
      {/* <p></p> */}
    </>
  );
}

export { Navigator };
