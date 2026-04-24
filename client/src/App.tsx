// =============================================================
// App.tsx — Root router with 3 main routes + sub-routes
// Design: Dark Glassmorphism Elite
// Routes:
//   /dashboard → overview / revenue / targets
//   /crm       → customers / leads / contacts
//   /sales     → orders / pipeline / reports
// =============================================================

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";

// Dashboard pages
import Overview from "./pages/dashboard/Overview";
import Revenue from "./pages/dashboard/Revenue";
import Targets from "./pages/dashboard/Targets";

// CRM pages
import Customers from "./pages/crm/Customers";
import Leads from "./pages/crm/Leads";
import Contacts from "./pages/crm/Contacts";

// Sales pages
import Orders from "./pages/sales/Orders";
import Pipeline from "./pages/sales/Pipeline";
import Reports from "./pages/sales/Reports";

// 404
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        {/* Root redirect */}
        <Route path="/">
          <Redirect to="/dashboard/overview" />
        </Route>

        {/* ── Dashboard ── */}
        <Route path="/dashboard">
          <Redirect to="/dashboard/overview" />
        </Route>
        <Route path="/dashboard/overview" component={Overview} />
        <Route path="/dashboard/revenue" component={Revenue} />
        <Route path="/dashboard/targets" component={Targets} />

        {/* ── CRM ── */}
        <Route path="/crm">
          <Redirect to="/crm/customers" />
        </Route>
        <Route path="/crm/customers" component={Customers} />
        <Route path="/crm/leads" component={Leads} />
        <Route path="/crm/contacts" component={Contacts} />

        {/* ── Sales ── */}
        <Route path="/sales">
          <Redirect to="/sales/orders" />
        </Route>
        <Route path="/sales/orders" component={Orders} />
        <Route path="/sales/pipeline" component={Pipeline} />
        <Route path="/sales/reports" component={Reports} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
