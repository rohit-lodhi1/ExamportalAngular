import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './Components/User/user-dashboard/user-dashboard.component';
import { AdminGuard } from './Services/admin.guard';
import { NormalGuard } from './Services/normal.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { WelcomeComponent } from './Components/Admin/welcome/welcome.component';
import { ViewCategoryComponent } from './Components/Admin/view-category/view-category.component';
import { AddCategoryComponent } from './Components/Admin/add-category/add-category.component';
import { ShowQuizesComponent } from './Components/Admin/show-quizes/show-quizes.component';
import { AddQuizesComponent } from './Components/Admin/add-quizes/add-quizes.component';
import { UpdateQuizComponent } from './Components/Admin/update-quiz/update-quiz.component';
import { ShowQuestionsComponent } from './Components/Admin/show-questions/show-questions.component';
import { AddQuestionComponent } from './Components/Admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './Components/Admin/update-question/update-question.component';
import { UpdateProfileComponent } from './Components/Admin/update-profile/update-profile.component';
import { ViewQuizesComponent } from './Components/User/view-quizes/view-quizes.component';
import { ShowCategoryComponent } from './Components/User/show-category/show-category.component';
import { InstructionsComponent } from './Components/User/instructions/instructions.component';
import { StartComponent } from './Components/User/start/start.component';
import { ShowUsersComponent } from './Components/Admin/show-users/show-users.component';
import { ShowRecentsComponent } from './Components/User/show-recents/show-recents.component';
import { UserAttemptesComponent } from './Components/Admin/user-attemptes/user-attemptes.component';
import { FeedbackComponent } from './Components/User/feedback/feedback.component';
import { ShowFeedbacksComponent } from './Components/Admin/show-feedbacks/show-feedbacks.component';
import { QuizRanksComponent } from './Components/quiz-ranks/quiz-ranks.component';
import { LecturesComponent } from './Components/Admin/play-lists/lectures/lectures.component';

const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:'full'},
  {path:'navbar',component:NavbarComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegistrationComponent,pathMatch:'full'},
  {path:'admin',component:DashboardComponent,canActivate:[AdminGuard]
,children:[
  {
    path:'profile',component:ProfileComponent
  },
  {
      path:'',component:WelcomeComponent
  },
  {
    path:'view-category',component:ViewCategoryComponent
  },
  {
    path:'add-category',component:AddCategoryComponent
  },
  {
    path:'view-quizes/:cid',component:ShowQuizesComponent
  },
  {
    path:'add-quize',component:AddQuizesComponent
  },
  {
    path:'quiz/:qid',component:UpdateQuizComponent
  },
  {
    path:'view-questions/:qid/:title',component:ShowQuestionsComponent
  },
  {
    path:'add-question/:qid/:qtitle',component:AddQuestionComponent
  }
  ,{
    path:'update-question/:quesId',component:UpdateQuestionComponent
  },
  {
    path:'update-profile',component:UpdateProfileComponent
  },
  {
    path:'view-users',component:ShowUsersComponent
  },
  {
    path:'view-attempts/:qid',component:UserAttemptesComponent
  },
  {
    path:'show-user-feedback',component:ShowFeedbacksComponent
  },
  {
    path:'ranks/:qid',component:QuizRanksComponent
  }
]
}, 
  {path:'user-dashboard',component:UserDashboardComponent,canActivate:[NormalGuard],
children:[
  {
    path:'',component:ShowCategoryComponent
  },
  {
    path:'view-quizes/:cid',component:ViewQuizesComponent
  },
  {
    path:'instructions/:qid',component:InstructionsComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'show-recents',component:ShowRecentsComponent
  },{
    path:'user-feedback',component:FeedbackComponent
  },
  {
    path:'ranks/:qid',component:QuizRanksComponent
  },
  {
    path:'lectures',component:LecturesComponent
  }
]}
,
{
  path:'start/:qid',component:StartComponent,canActivate:[NormalGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
