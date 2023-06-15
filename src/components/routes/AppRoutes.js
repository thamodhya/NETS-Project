import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ArticleContent from '../pages/article page/ArticleContent';
import Content from '../pages/Chapter page/Content';
import UnitContent from '../pages/Unit page/UnitContent';
import ViewKT from '../pages/KT view/ViewKT';
import ViewContent from '../pages/article view/ViewContent';
import Edit from "../pages/Chapter page/EditUnit";
import QuizEntry from '../pages/Quiz/QuizEntry';
 
import Quizpage from "../pages/Quiz/Quizpage";
//import NotificationPage from "../pages/Quiz/NotificationPage";

import UnitHistory from "../pages/Chapter page/UnitHistory";
import KTHistory from "../pages/Unit page/KTHistory";
import ArticleHistory from "../pages/article page/ArticleHistory";
import QuestionEditHistory from "../pages/Quiz/QuestionEditHistory";
import EditHistory from "../pages/EditHistory";

import QuizComponent from "../pages/Quiz/QuizAttempt";
import QuizQuestions from "../pages/Quiz/QuizQuestions";
import QuizPopup from "../pages/Quiz/Test";

const AppRoutes = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Content/>} />

                    <Route exact path="/Unit" element={<UnitContent/>} />
                    <Route exact path="/Unit/:id" element={<UnitContent/>} />

                    <Route exact path="/article" element={<ArticleContent/>} />
                    <Route exact path="/article/View/:id" element={<ViewContent/>} />
                    <Route exact path="/Unit/View/:id" element={<ViewKT/>} />
                    <Route exact path="/edit/:id" element={<Edit/>} />
                    
                    <Route exact path="/quiz/view" element={<QuizEntry/>}/>
                    <Route exact path="/quiz/view/:id" element={<QuizEntry/>}/>
                     
                    {/* <Route exact path="/notification" element={<NotificationPage/>} /> */}
                     
                    <Route exact path="/quiz" element={<Quizpage/>} />
                    <Route exact path="/quiz/:id" element={<Quizpage/>} />

                    <Route exact path="/editunits" element={<UnitHistory/>} />
                    <Route exact path="/editkts" element={<KTHistory/>} />
                    <Route exact path="/editarticles" element={<ArticleHistory/>} />
                    <Route exact path="/editquestions" element={<QuestionEditHistory/>} />
                    <Route exact path="/edithistory" element={<EditHistory/>} />

                    <Route exact path="/quiz/attempt/:id" element={<QuizQuestions/>}/>
                    <Route exact path="/quiz/attempttest/:id" element={<QuizPopup/>}/>

                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}
export default AppRoutes;
