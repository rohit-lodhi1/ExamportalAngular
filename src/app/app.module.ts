import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './Components/registration/registration.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { MaterialsModule } from './materials/materials.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { AuthInterceptorInterceptor, authInterceptorProviders } from './Services/auth-interceptor.interceptor';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './Components/User/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SidebarComponent } from './Components/Admin/sidebar/sidebar.component';
import { WelcomeComponent } from './Components/Admin/welcome/welcome.component';
import { ViewCategoryComponent } from './Components/Admin/view-category/view-category.component';
import { AddCategoryComponent } from './Components/Admin/add-category/add-category.component';
import { ShowQuizesComponent } from './Components/Admin/show-quizes/show-quizes.component';
import { AddQuizesComponent } from './Components/Admin/add-quizes/add-quizes.component';
import { UpdateQuizComponent } from './Components/Admin/update-quiz/update-quiz.component';
import { ShowQuestionsComponent } from './Components/Admin/show-questions/show-questions.component';
import { AddQuestionComponent } from './Components/Admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './Components/Admin/update-question/update-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UpdateProfileComponent } from './Components/Admin/update-profile/update-profile.component';
import { SideBarComponent } from './Components/User/side-bar/side-bar.component';
import { ViewQuizesComponent } from './Components/User/view-quizes/view-quizes.component';
import { ShowCategoryComponent } from './Components/User/show-category/show-category.component';
import { InstructionsComponent } from './Components/User/instructions/instructions.component';
import { StartComponent } from './Components/User/start/start.component';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { ShowUsersComponent } from './Components/Admin/show-users/show-users.component';
import { ShowRecentsComponent } from './Components/User/show-recents/show-recents.component';
import { UserAttemptesComponent } from './Components/Admin/user-attemptes/user-attemptes.component';
import { FeedbackComponent } from './Components/User/feedback/feedback.component';
import { ShowFeedbacksComponent } from './Components/Admin/show-feedbacks/show-feedbacks.component';
import { QuizRanksComponent } from './Components/quiz-ranks/quiz-ranks.component';
import { PlayListsComponent } from './Components/Admin/play-lists/play-lists.component';
import { LecturesComponent } from './Components/Admin/play-lists/lectures/lectures.component';



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.cubeGrid, // Replace with your desired spinner
  fgsColor: 'red', // Replace with your desired color
};

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    ShowQuizesComponent,
    AddQuizesComponent,
    UpdateQuizComponent,
    ShowQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UpdateProfileComponent,
    SideBarComponent,
    ViewQuizesComponent,
    ShowCategoryComponent,
    InstructionsComponent,
    StartComponent,
    ShowUsersComponent,
    ShowRecentsComponent,
    UserAttemptesComponent,
    FeedbackComponent,
    ShowFeedbacksComponent,
    QuizRanksComponent,
    PlayListsComponent,
    LecturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   
     FormsModule,
    MaterialsModule,
    HttpClientModule,
    CKEditorModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
     
    }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
