import "./style.css";
import {loadData, saveCategories, delCategory, addCategory} from "./data_handler.js"
import {addCategoryToHTML, setupNewCatPop} from "./html_handler.js"
import {setupPops} from "./popup_logic.js"


loadData();
setupNewCatPop();

