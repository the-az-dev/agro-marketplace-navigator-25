import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import { useTranslation } from "react-i18next";
import "./lib/i18next"; // Імпортуємо i18n
import Article from "./pages/Article";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import PaymentDelivery from "./pages/PaymentDelivery";
import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient();

function App (){

  const { t } = useTranslation();

  return(
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/articles" element={<Article />}/>
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contacts />}/>
          <Route path="/payments-and-delivery" element={<PaymentDelivery />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
}

export default App;