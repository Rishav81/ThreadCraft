import Chatbot from "./Components/ChatBot/chatbot";

import OrganizationSchema from "./Components/SEO/OrganizationSchema";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <>
      <OrganizationSchema />
      <Chatbot />

      <AppRoutes />
    </>
  );
};

export default App;
