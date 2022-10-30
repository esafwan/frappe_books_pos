import { ModelNameEnum } from 'models/types';
import ChartOfAccounts from 'src/pages/ChartOfAccounts.vue';
import Dashboard from 'src/pages/Dashboard/Dashboard.vue';
import DataImport from 'src/pages/DataImport.vue';
import GetStarted from 'src/pages/GetStarted.vue';
import InvoiceForm from 'src/pages/InvoiceForm.vue';
import InvoicePosForm from 'src/pages/InvoicePosForm.vue';
import JournalEntryForm from 'src/pages/JournalEntryForm.vue';
import ListView from 'src/pages/ListView/ListView.vue';
import PrintView from 'src/pages/PrintView/PrintView.vue';
import QuickEditForm from 'src/pages/QuickEditForm.vue';
import Report from 'src/pages/Report.vue';
import Settings from 'src/pages/Settings/Settings.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/get-started',
    component: GetStarted,
  },
  {
    path: '/edit/JournalEntry/:name',
    name: 'JournalEntryForm',
    components: {
      default: JournalEntryForm,
      edit: QuickEditForm,
    },
    props: {
      default: (route) => {
        // for sidebar item active state
        route.params.schemaName = 'JournalEntry';
        return {
          schemaName: 'JournalEntry',
          name: route.params.name,
        };
      },
      edit: (route) => route.query,
    },
  },
  {
    path: '/edit/:schemaName/:name',
    name: 'InvoiceForm',
    components: {
      default: InvoiceForm,
      edit: QuickEditForm,    
    },
    props: {
      default: true,      
      edit: (route) => route.query,
    },
  },
  {
    path: '/pos/:schemaName/:name',
    name: 'InvoicePosForm',
    components: {
      default: InvoicePosForm,
      edit: QuickEditForm,      
    },
    props: {
      default: true,
      edit: (route) => route.query,
    },
  },
  {
    path: '/list/:schemaName/:fieldname?/:value?/:pageTitle?',
    name: 'ListView',
    components: {
      default: ListView,
      edit: QuickEditForm,
    },
    props: {
      default: (route) => {
        const { schemaName, fieldname, value, pageTitle } = route.params;
        let { filters } = route.params;

        if (filters === undefined && fieldname && value) {
          // @ts-ignore
          filters = { [fieldname as string]: value };
        }

        return {
          schemaName,
          filters,
          pageTitle: pageTitle ?? '',
        };
      },
      edit: (route) => {
        return route.query;
      },
    },
  },
  {
    path: '/print/:schemaName/:name',
    name: 'PrintView',
    component: PrintView,
    props: true,
  },
  {
    path: '/report/:reportClassName',
    name: 'Report',
    component: Report,
    props: true,
  },
  {
    path: '/chart-of-accounts',
    name: 'Chart Of Accounts',
    components: {
      default: ChartOfAccounts,
      edit: QuickEditForm,
    },
    props: {
      default: true,
      edit: (route) => route.query,
    },
  },
  {
    path: '/data-import',
    name: 'Data Import',
    component: DataImport,
  },
  {
    path: '/settings',
    name: 'Settings',
    components: {
      default: Settings,
      edit: QuickEditForm,
    },
    props: {
      default: true,
      edit: (route) => route.query,
    },
  },
];

export function getEntryRoute(schemaName: string, name: string) {
  if (
    [
      ModelNameEnum.SalesInvoice,
      ModelNameEnum.PurchaseInvoice,
      ModelNameEnum.JournalEntry,
    ].includes(schemaName as ModelNameEnum)
  ) {
    return `/edit/${schemaName}/${name}`;
  }

  return `/list/${schemaName}?edit=1&schemaName=${schemaName}&name=${name}`;
}

const router = createRouter({ routes, history: createWebHistory() });

export default router;
