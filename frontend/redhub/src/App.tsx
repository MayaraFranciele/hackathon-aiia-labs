import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Spending from "./pages/Spending";
import Statement from "./pages/Statement";
import Pix from "./pages/Pix";
import Payments from "./pages/Payments";
import Recharge from "./pages/Recharge";
import Cashback from "./pages/Cashback";
import Insurance from "./pages/Insurance";
import Loans from "./pages/Loans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/spending" element={<Spending />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/pix" element={<Pix />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/recharge" element={<Recharge />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
