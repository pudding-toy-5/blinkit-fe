/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as SettingsIndexImport } from './routes/settings.index'
import { Route as ExpensesIndexImport } from './routes/expenses.index'
import { Route as SettingsAccountImport } from './routes/settings.account'
import { Route as ExpensesNewIndexImport } from './routes/expenses.new.index'
import { Route as ExpensesUidIndexImport } from './routes/expenses.$uid.index'
import { Route as ExpensesNewCategoriesIndexImport } from './routes/expenses.new.categories.index'
import { Route as ExpensesUidCategoriesIndexImport } from './routes/expenses.$uid.categories.index'
import { Route as ExpensesNewCategoriesCategoryuidIndexImport } from './routes/expenses.new.categories.$category_uid.index'
import { Route as ExpensesUidCategoriesCategoryuidIndexImport } from './routes/expenses.$uid.categories.$category_uid.index'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexRoute = SettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => rootRoute,
} as any)

const ExpensesIndexRoute = ExpensesIndexImport.update({
  id: '/expenses/',
  path: '/expenses/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsAccountRoute = SettingsAccountImport.update({
  id: '/settings/account',
  path: '/settings/account',
  getParentRoute: () => rootRoute,
} as any)

const ExpensesNewIndexRoute = ExpensesNewIndexImport.update({
  id: '/expenses/new/',
  path: '/expenses/new/',
  getParentRoute: () => rootRoute,
} as any)

const ExpensesUidIndexRoute = ExpensesUidIndexImport.update({
  id: '/expenses/$uid/',
  path: '/expenses/$uid/',
  getParentRoute: () => rootRoute,
} as any)

const ExpensesNewCategoriesIndexRoute = ExpensesNewCategoriesIndexImport.update(
  {
    id: '/expenses/new/categories/',
    path: '/expenses/new/categories/',
    getParentRoute: () => rootRoute,
  } as any,
)

const ExpensesUidCategoriesIndexRoute = ExpensesUidCategoriesIndexImport.update(
  {
    id: '/expenses/$uid/categories/',
    path: '/expenses/$uid/categories/',
    getParentRoute: () => rootRoute,
  } as any,
)

const ExpensesNewCategoriesCategoryuidIndexRoute =
  ExpensesNewCategoriesCategoryuidIndexImport.update({
    id: '/expenses/new/categories/$category_uid/',
    path: '/expenses/new/categories/$category_uid/',
    getParentRoute: () => rootRoute,
  } as any)

const ExpensesUidCategoriesCategoryuidIndexRoute =
  ExpensesUidCategoriesCategoryuidIndexImport.update({
    id: '/expenses/$uid/categories/$category_uid/',
    path: '/expenses/$uid/categories/$category_uid/',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/settings/account': {
      id: '/settings/account'
      path: '/settings/account'
      fullPath: '/settings/account'
      preLoaderRoute: typeof SettingsAccountImport
      parentRoute: typeof rootRoute
    }
    '/expenses/': {
      id: '/expenses/'
      path: '/expenses'
      fullPath: '/expenses'
      preLoaderRoute: typeof ExpensesIndexImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsIndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/$uid/': {
      id: '/expenses/$uid/'
      path: '/expenses/$uid'
      fullPath: '/expenses/$uid'
      preLoaderRoute: typeof ExpensesUidIndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/new/': {
      id: '/expenses/new/'
      path: '/expenses/new'
      fullPath: '/expenses/new'
      preLoaderRoute: typeof ExpensesNewIndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/$uid/categories/': {
      id: '/expenses/$uid/categories/'
      path: '/expenses/$uid/categories'
      fullPath: '/expenses/$uid/categories'
      preLoaderRoute: typeof ExpensesUidCategoriesIndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/new/categories/': {
      id: '/expenses/new/categories/'
      path: '/expenses/new/categories'
      fullPath: '/expenses/new/categories'
      preLoaderRoute: typeof ExpensesNewCategoriesIndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/$uid/categories/$category_uid/': {
      id: '/expenses/$uid/categories/$category_uid/'
      path: '/expenses/$uid/categories/$category_uid'
      fullPath: '/expenses/$uid/categories/$category_uid'
      preLoaderRoute: typeof ExpensesUidCategoriesCategoryuidIndexImport
      parentRoute: typeof rootRoute
    }
    '/expenses/new/categories/$category_uid/': {
      id: '/expenses/new/categories/$category_uid/'
      path: '/expenses/new/categories/$category_uid'
      fullPath: '/expenses/new/categories/$category_uid'
      preLoaderRoute: typeof ExpensesNewCategoriesCategoryuidIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/login': typeof LoginRoute
  '/settings/account': typeof SettingsAccountRoute
  '/expenses': typeof ExpensesIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/expenses/$uid': typeof ExpensesUidIndexRoute
  '/expenses/new': typeof ExpensesNewIndexRoute
  '/expenses/$uid/categories': typeof ExpensesUidCategoriesIndexRoute
  '/expenses/new/categories': typeof ExpensesNewCategoriesIndexRoute
  '/expenses/$uid/categories/$category_uid': typeof ExpensesUidCategoriesCategoryuidIndexRoute
  '/expenses/new/categories/$category_uid': typeof ExpensesNewCategoriesCategoryuidIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/settings/account': typeof SettingsAccountRoute
  '/expenses': typeof ExpensesIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/expenses/$uid': typeof ExpensesUidIndexRoute
  '/expenses/new': typeof ExpensesNewIndexRoute
  '/expenses/$uid/categories': typeof ExpensesUidCategoriesIndexRoute
  '/expenses/new/categories': typeof ExpensesNewCategoriesIndexRoute
  '/expenses/$uid/categories/$category_uid': typeof ExpensesUidCategoriesCategoryuidIndexRoute
  '/expenses/new/categories/$category_uid': typeof ExpensesNewCategoriesCategoryuidIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/login': typeof LoginRoute
  '/settings/account': typeof SettingsAccountRoute
  '/expenses/': typeof ExpensesIndexRoute
  '/settings/': typeof SettingsIndexRoute
  '/expenses/$uid/': typeof ExpensesUidIndexRoute
  '/expenses/new/': typeof ExpensesNewIndexRoute
  '/expenses/$uid/categories/': typeof ExpensesUidCategoriesIndexRoute
  '/expenses/new/categories/': typeof ExpensesNewCategoriesIndexRoute
  '/expenses/$uid/categories/$category_uid/': typeof ExpensesUidCategoriesCategoryuidIndexRoute
  '/expenses/new/categories/$category_uid/': typeof ExpensesNewCategoriesCategoryuidIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/login'
    | '/settings/account'
    | '/expenses'
    | '/settings'
    | '/expenses/$uid'
    | '/expenses/new'
    | '/expenses/$uid/categories'
    | '/expenses/new/categories'
    | '/expenses/$uid/categories/$category_uid'
    | '/expenses/new/categories/$category_uid'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/settings/account'
    | '/expenses'
    | '/settings'
    | '/expenses/$uid'
    | '/expenses/new'
    | '/expenses/$uid/categories'
    | '/expenses/new/categories'
    | '/expenses/$uid/categories/$category_uid'
    | '/expenses/new/categories/$category_uid'
  id:
    | '__root__'
    | '/login'
    | '/settings/account'
    | '/expenses/'
    | '/settings/'
    | '/expenses/$uid/'
    | '/expenses/new/'
    | '/expenses/$uid/categories/'
    | '/expenses/new/categories/'
    | '/expenses/$uid/categories/$category_uid/'
    | '/expenses/new/categories/$category_uid/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LoginRoute: typeof LoginRoute
  SettingsAccountRoute: typeof SettingsAccountRoute
  ExpensesIndexRoute: typeof ExpensesIndexRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
  ExpensesUidIndexRoute: typeof ExpensesUidIndexRoute
  ExpensesNewIndexRoute: typeof ExpensesNewIndexRoute
  ExpensesUidCategoriesIndexRoute: typeof ExpensesUidCategoriesIndexRoute
  ExpensesNewCategoriesIndexRoute: typeof ExpensesNewCategoriesIndexRoute
  ExpensesUidCategoriesCategoryuidIndexRoute: typeof ExpensesUidCategoriesCategoryuidIndexRoute
  ExpensesNewCategoriesCategoryuidIndexRoute: typeof ExpensesNewCategoriesCategoryuidIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  LoginRoute: LoginRoute,
  SettingsAccountRoute: SettingsAccountRoute,
  ExpensesIndexRoute: ExpensesIndexRoute,
  SettingsIndexRoute: SettingsIndexRoute,
  ExpensesUidIndexRoute: ExpensesUidIndexRoute,
  ExpensesNewIndexRoute: ExpensesNewIndexRoute,
  ExpensesUidCategoriesIndexRoute: ExpensesUidCategoriesIndexRoute,
  ExpensesNewCategoriesIndexRoute: ExpensesNewCategoriesIndexRoute,
  ExpensesUidCategoriesCategoryuidIndexRoute:
    ExpensesUidCategoriesCategoryuidIndexRoute,
  ExpensesNewCategoriesCategoryuidIndexRoute:
    ExpensesNewCategoriesCategoryuidIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/login",
        "/settings/account",
        "/expenses/",
        "/settings/",
        "/expenses/$uid/",
        "/expenses/new/",
        "/expenses/$uid/categories/",
        "/expenses/new/categories/",
        "/expenses/$uid/categories/$category_uid/",
        "/expenses/new/categories/$category_uid/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/settings/account": {
      "filePath": "settings.account.tsx"
    },
    "/expenses/": {
      "filePath": "expenses.index.tsx"
    },
    "/settings/": {
      "filePath": "settings.index.tsx"
    },
    "/expenses/$uid/": {
      "filePath": "expenses.$uid.index.tsx"
    },
    "/expenses/new/": {
      "filePath": "expenses.new.index.tsx"
    },
    "/expenses/$uid/categories/": {
      "filePath": "expenses.$uid.categories.index.tsx"
    },
    "/expenses/new/categories/": {
      "filePath": "expenses.new.categories.index.tsx"
    },
    "/expenses/$uid/categories/$category_uid/": {
      "filePath": "expenses.$uid.categories.$category_uid.index.tsx"
    },
    "/expenses/new/categories/$category_uid/": {
      "filePath": "expenses.new.categories.$category_uid.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
