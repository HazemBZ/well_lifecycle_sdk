import { useControls } from "leva";
import { useNavigate } from "react-router-dom";

function Navigator() {
  const navigate = useNavigate();

  useControls("helpers", {
    navigation: {
      options: [
        "/",
        "/login-authentication",
        "/dashboard-project-overview",
        "/well-log-viewer-analysis",
        "/drilling-data-management",
        "/workspace-management",
        "/production-data-analysis",
        "/project-management-configuration",
        "/well-trajectory-survey-visualization",
        "/plugin-management-sdk-configuration",
        "/geological-petrophysical-evaluation",
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
