import { Route, Routes } from "react-router-dom";
import { Authorized } from "./components/auth/Authorized.jsx";
import { Login } from "./components/auth/Login.jsx";
import { HomePage } from "./components/homepage/home.jsx";
// import { Register } from "./components/auth/Register.jsx";
import { OfficeDashboard } from "./components/officeViews/officeDashboard.jsx";
import { useCurrentUser } from "./TSQ_hooks/useCurrentUser.js";
import { ConsultationDetail } from "./components/consultation/ConsultationDetail.jsx";
import { PrimaryCare } from "./components/services/primaryCare.jsx";
import { ErectileDysfunction } from "./components/services/ed.jsx";
import { TestosteroneReplacement } from "./components/services/trt.jsx";
import { SiteFooter } from "./components/homepage/siteFooter.jsx";
import { ArticleHome } from "./components/articles/articlesHome.jsx";
import { ContactHome } from "./components/contact/contactHome.jsx";
import { OfficeUserProfile } from "./components/officeViews/profile/officeUserProfile.jsx";
import { AllConsultations } from "./components/consultation/AllConsultations.jsx";
import { TheProviderAbout } from "./components/providers/TheProviderAbout.jsx";
import { ViewArticle } from "./components/articles/ViewArticle.jsx";
import { ViewAllArticles } from "./components/officeViews/articles/ViewAllArticles.jsx";
import { ArticleDetails } from "./components/officeViews/articles/ArticleDetails.jsx";
import { CreateArticle } from "./components/officeViews/articles/CreateArticle.jsx";

export const App = () => {

  const { currentUser} = useCurrentUser();

  return (
    <>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage currentUser={currentUser} />} />
          <Route path="/office-login" element={<Login />} />
          <Route path="/articles" element={<ArticleHome />}/>
          <Route path="/articles/:articleId" element={<ViewArticle />} />
          <Route path="/about-us" element={<ContactHome />}/>
          <Route path="/about-me/:id" element={<TheProviderAbout />} />
          <Route path="/services/primary-care" element={<PrimaryCare />} />
          <Route path="/services/testosterone-replacement" element={<TestosteroneReplacement />} />
          <Route path="/services/erectile-dysfunction" element={<ErectileDysfunction />} />

          <Route element={<Authorized currentUser={currentUser}/>}>
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/office-dashboard" element={<OfficeDashboard currentUser={currentUser}/>} />
            <Route path="/consultation/:id" element={< ConsultationDetail />} />
            <Route path="/consultation-all" element={<AllConsultations />} />
            <Route path="/profile/:id" element={<OfficeUserProfile />} />
            <Route path="/articles/:id/edit" element={< ArticleDetails />} />
            <Route path="/articles-all" element={<ViewAllArticles />} />
            <Route path="/article-new" element={<CreateArticle />} />
          </Route>
        </Routes>
      </div>
      <SiteFooter />
    </>
  );
};


// :userId - pull a PARAMETER 
// {currentUser} - pass a PROP

// "/article-new"