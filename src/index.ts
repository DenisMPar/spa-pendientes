import "./components/header";
import "./components/text";
import "./components/form";
import "./components/task";
import { initPageMain } from "./pages/main";

(function () {
  const rootEl = document.querySelector(".root");
  initPageMain(rootEl);
})();
