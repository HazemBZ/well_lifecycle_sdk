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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoginAuthentication />} />
          <Route path="/login-authentication" element={<LoginAuthentication />} />
          <Route path="/dashboard-project-overview" element={<DashboardProjectOverview />} />
          <Route path="/well-log-viewer-analysis" element={<WellLogViewerAnalysis />} />
          <Route path="/drilling-data-management" element={<DrillingDataManagement />} />
          <Route path="/workspace-management" element={<WorkspaceManagement />} />
          <Route path="/production-data-analysis" element={<ProductionDataAnalysis />} />
          <Route path="/project-management-configuration" element={<ProjectManagementConfiguration />} />
          <Route path="/well-trajectory-survey-visualization" element={<WellTrajectorySurveyVisualization />} />
          <Route path="/plugin-management-sdk-configuration" element={<PluginManagementSdkConfiguration />} />
          <Route path="/geological-petrophysical-evaluation" element={<GeologicalPetrophysicalEvaluation />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;