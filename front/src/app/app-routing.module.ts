import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { userGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { AddQuestionToquizComponent } from './pages/admin/add-question-toquiz/add-question-toquiz.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"admin",
    component:DashboardComponent,
    children:[{
      path:"profile",
      component:ProfileComponent,
      },
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'view-category',
        component:ViewCategoryComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },{
        path:'update-quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-quiz-question/:qid/:qtitle',
        component:ViewQuizQuestionComponent
      },
      {
        path:'addquestion/:qid/:qtitle',
        component:AddQuestionToquizComponent
      }
    ],
    canActivate:[adminGuard]
  },
  {
    path:"user",
    component:UserDashboardComponent,
    canActivate:[userGuard],
    children:[
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent
      },
      {
        path:'view-category',
        component:ViewCategoryComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      }
    ]
  },
  {
    path:'start/:qid',
    component:StartComponent,
    canActivate:[userGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
