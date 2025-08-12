import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginAuthentication from "./pages/login-authentication";
import NotFound from "./pages/NotFound";
import WellLogViewerAnalysis from "./pages/well-log-viewer-analysis";
import GeologicalPetrophysicalEvaluation from "./pages/geological-petrophysical-evaluation";
import DashboardProjectOverview from "./pages/dashboard-project-overview";
import DrillingDataManagement from "./pages/drilling-data-management";
import WorkspaceManagement from "./pages/workspace-management";
import ProductionDataAnalysis from "./pages/production-data-analysis";
import ProjectManagementConfiguration from "./pages/project-management-configuration";
import WellTrajectorySurveyVisualization from "./pages/well-trajectory-survey-visualization";
import PluginManagementSdkConfiguration from "./pages/plugin-management-sdk-configuration";
import { DashboardLayout } from "components/layout/DashboardLayout";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Login */}
          <Route path="/" element={<LoginAuthentication />} />
          <Route
            path="/login-authentication"
            element={<LoginAuthentication />}
          />

          {/* Main Spaces*/}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="home" element={<DashboardProjectOverview />} />
            <Route
              path="projects"
              element={<ProjectManagementConfiguration />}
            />
            <Route path="workspaces" element={<WorkspaceManagement />} />
            {/* Primary Tools */}
            <Route path="well-log-viewer" element={<WellLogViewerAnalysis />} />
            <Route path="drilling" element={<DrillingDataManagement />} />

            <Route path="production" element={<ProductionDataAnalysis />} />

            {/* Secondary tools */}

            <Route
              path="geology"
              element={<GeologicalPetrophysicalEvaluation />}
            />
            <Route
              path="well-trajectory"
              element={<WellTrajectorySurveyVisualization />}
            />
            {/* Wishlist  */}
            <Route
              path="plugins"
              element={<PluginManagementSdkConfiguration />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
