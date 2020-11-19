export const MENU = [
  // Admin menu
  // 1
  {label: 'مدیریت کاربران', children: [
    {label: 'لیست کاربران', route: '/admin/users'},
  ]},
  // 2
  {label: 'مدیریت پرسشنامه‌ها', children: [
    {label: 'لیست پرسشنامه‌ها', route: '/admin/questionnaires'},
    {label: 'ایجاد پرسشنامه جدید', route: '/admin/questionnaires/new_questionnaire'},

  ]},
  // 3
  {label: 'مدیریت بیماران', children: [
    {label: 'لیست بیماران', route: '/admin/patients'},
    {label: 'ویرایش اطلاعات بیمار', route: '/admin/patients/patients-management'}
  ]},
  // 4
  {label: 'مدیریت صفحه اول', children: [
    {label: 'ویرایش صفحه اول', route: '/admin/blog'},
  ]}
]
