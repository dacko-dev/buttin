// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout/AppLayout'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import LoadingPage from 'src/pages/LoadingPage/LoadingPage'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Audits" titleTo="audits" buttonLabel="New Audit" buttonTo="newAudit">
        <Route path="/audits/new" page={AuditNewAuditPage} name="newAudit" />

        <Route path="/audits/{id}/edit" page={AuditEditAuditPage} name="editAudit" />

        <Route path="/audits/{id}" page={AuditAuditPage} name="audit" />

        <Route path="/audits" page={AuditAuditsPage} name="audits" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Tags" titleTo="tags" buttonLabel="New Tag" buttonTo="newTag">
        <Route path="/tags/new" page={TagNewTagPage} name="newTag" />

        <Route path="/tags/{id:Int}/edit" page={TagEditTagPage} name="editTag" />

        <Route path="/tags/{id:Int}" page={TagTagPage} name="tag" />

        <Route path="/tags" page={TagTagsPage} name="tags" />
      </Set>

      <Set wrap={ScaffoldLayout} title="ButtonClicks" titleTo="buttonClicks" buttonLabel="New ButtonClick" buttonTo="newButtonClick">
        <Route path="/button-clicks/new" page={ButtonClickNewButtonClickPage} name="newButtonClick" />

        <Route path="/button-clicks/{id}/edit" page={ButtonClickEditButtonClickPage} name="editButtonClick" />

        <Route path="/button-clicks/{id}" page={ButtonClickButtonClickPage} name="buttonClick" />

        <Route path="/button-clicks" page={ButtonClickButtonClicksPage} name="buttonClicks" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Walls" titleTo="walls" buttonLabel="New Wall" buttonTo="newWall">
        <Route path="/walls/new" page={WallNewWallPage} name="newWall" />

        <Route path="/walls/{id:Int}/edit" page={WallEditWallPage} name="editWall" />

        <Route path="/walls/{id:Int}" page={WallWallPage} name="wall" />

        <Route path="/walls" page={WallWallsPage} name="walls" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Buttons" titleTo="buttons" buttonLabel="New Button" buttonTo="newButton">
        <Route path="/buttons/new" page={ButtonNewButtonPage} name="newButton" />

        <Route path="/buttons/{id}/edit" page={ButtonEditButtonPage} name="editButton" />

        <Route path="/buttons/{id}" page={ButtonButtonPage} name="button" />

        <Route path="/buttons" page={ButtonButtonsPage} name="buttons" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />

        <Route path="/users/{id}/edit" page={UserEditUserPage} name="editUser" />

        <Route path="/users/{id}" page={UserUserPage} name="user" />

        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>

      <Set whileLoadingPage={LoadingPage} whileLoadingAuth={LoadingPage} wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <PrivateSet whileLoadingPage={LoadingPage} whileLoadingAuth={LoadingPage} wrap={AppLayout} unauthenticated="login">
        <Route path="/profile/{tab}" page={ProfilePage} name="profile" />
        <Route path="/add-button" page={AddButtonPage} name="addButton" />
      </PrivateSet>

      <Set whileLoadingPage={LoadingPage} wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/sign-up" page={SignupPage} name="signUp" />

        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
