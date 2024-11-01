export const enLocale = {
  // #region COMMON
  loading: 'Loading...',
  xList: '{feature} List',
  xDetail: '{feature} Detail',
  xCreateSuccess: '{feature} successfully created',
  xCreateError: '{feature} failed to create',
  xUpdateSuccess: '{feature} successfully updated',
  xUpdateError: '{feature} failed to update',
  xDeleteSuccess: '{feature} successfully deleted',
  xDeleteError: '{feature} failed to delete',
  backTo: 'Back to {target}',
  todoUpdateError: 'Todo failed to update',
  errorMinLength: '{field} must contain at least {length} characters',
  error: '{module} error',
  theme: 'Theme',
  system: 'System',
  light: 'Light',
  dark: 'Dark',
  add: 'Add',
  update: 'Update',
  remove: 'Remove',
  empty: 'Empty Data',
  unsavedChanges: 'Discard unsaved changes - are you sure?',
  appName: 'React Template',
  noPageContent: 'No Page Content',
  unauthorized: 'Unauthorized. Please login first',
  authorized: 'Already authorized',
  attention: 'Attention',
  language: 'Language',
  account: 'Account',
  profile: 'Profile',
  settings: 'Settings',
  cancel: 'Cancel',
  continue: 'Continue',
  reload: 'Reload',
  appReady: 'App ready to work offline',
  newContentAvailable:
    'New content available, click on reload button to update',
  // #endregion COMMON

  // #region AUTH
  username: 'Username',
  usernamePlaceholder: 'Your username...',
  password: 'Password',
  passwordPlaceholder: 'Your password...',
  loginLoading: 'Logging in...',
  login: 'Login',
  logout: 'Logout',
  notFound: 'Not Found',
  gone: "Sorry, we couldn't find the page you're looking for",
  welcome: 'Welcome Back',
  noAccount: "Don't have an account?",
  registerHere: 'Register here',
  // #endregion AUTH

  // #region HOME
  title: 'Home',
  sortButtons: 'Sort Buttons',
  clock: 'Clock',
  toggleClock: 'Toggle Clock',
  clickToggleClock: 'Click toggle clock to restart the clock',
  changeLanguage: 'Change Language',
  getStarted: 'Get Started',
  // #endregion HOME

  // #region PLAYGROUND
  playgroundTitle: 'Playground',
  // #endregion PLAYGROUND

  // #region TODO
  todoPlaceholder: 'What should you do next...',
  limit: 'Limit',
  selectTodoLimit: 'Select todo limit',
  // #endregion TODO
} as const;
