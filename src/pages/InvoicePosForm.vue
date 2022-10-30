<template>
  <PosContainer>        
        <!-- Page Header (Title, Buttons, etc) -->
        <template #header v-if="doc">          
          <StatusBadge :status="status" />
          <ExchangeRate
            v-if="doc.isMultiCurrency"
            :disabled="doc?.isSubmitted || doc?.isCancelled"
            :from-currency="fromCurrency"
            :to-currency="toCurrency"
            :exchange-rate="doc.exchangeRate"
            @change="
              async (exchangeRate) => await doc.set('exchangeRate', exchangeRate)
            "
          />
          <Button
            v-if="!doc.isCancelled && !doc.dirty"
            :icon="true"
            @click="routeTo(`/print/${doc.schemaName}/${doc.name}`)"
          >
            {{ t`Print` }}
          </Button>
          <Button
            :icon="true"
            v-if="!doc?.isSubmitted && doc.enableDiscounting"
            @click="toggleInvoiceSettings"
          >
            <feather-icon name="settings" class="w-4 h-4" />
          </Button>
          <DropdownWithActions :actions="actions()" />
          <Button
            v-if="doc?.notInserted || doc?.dirty"
            type="primary"
            @click="sync"
          >
            {{ t`Save` }}
          </Button>
          <Button
            v-if="!doc?.dirty && !doc?.notInserted && !doc?.submitted"
            type="primary"
            @click="submit"
            >{{ t`Submit` }}</Button
          >
        </template>
        <template #items v-if="doc">          
          <div>
            <div class="container my-12 mx-auto px-4 md:px-12">
              <div class="flex flex-wrap -mx-1 lg:-mx-4">

             <!-- Column -->
             <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                <!-- Article -->
                <article class="overflow-hidden border rounded">

                    <a href="#">
                        <img alt="Placeholder" class="block h-auto w-full" src="https://source.unsplash.com/random/600x400/?watch">
                    </a>

                    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-lg">
                            <a class="no-underline hover:underline text-black" href="#">
                                <strong>Watch</strong>  - $ 10
                            </a>
                        </h1>                              
                    </header>
                   
                </article>
                <!-- END Article -->

                </div>
                <!-- END Column -->
             <!-- Column -->
             <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden border rounded">

                <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://source.unsplash.com/random/600x400/?watch">
                </a>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-lg">
                            <a class="no-underline hover:underline text-black" href="#">
                                <strong>Watch</strong>  - $ 10
                            </a>
                        </h1>                              
                    </header>

                
            </article>
            <!-- END Article -->

            </div>
            <!-- END Column -->
            
                        <!-- Column -->
                        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden border rounded">

                <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://source.unsplash.com/random/600x400/?watch">
                </a>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-lg">
                            <a class="no-underline hover:underline text-black" href="#">
                                <strong>Watch</strong>  - $ 10
                            </a>
                        </h1>                              
                    </header>

                
            </article>
            <!-- END Article -->

            </div>
            <!-- END Column -->
            <!-- Column -->
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden border rounded">

            <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="https://source.unsplash.com/random/600x400/?watch">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                      <strong>Watch</strong>  - $ 10
                    </a>
                </h1>                              
            </header>

            
            </article>
            <!-- END Article -->

            </div>
            <!-- END Column -->
                        <!-- Column -->
                        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden border rounded">

                <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://source.unsplash.com/random/600x400/?watch">
                </a>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-lg">
                            <a class="no-underline hover:underline text-black" href="#">
                                <strong>Watch</strong>  - $ 10
                            </a>
                        </h1>                              
                    </header>

                
            </article>
            <!-- END Article -->

            </div>
            <!-- END Column -->
            <!-- Column -->
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden border rounded">

            <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="https://source.unsplash.com/random/600x400/?watch">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                      <strong>Watch</strong>  - $ 10
                    </a>
                </h1>                              
            </header>

            
            </article>
            <!-- END Article -->

            </div>
            <!-- END Column -->
 
              </div>
            </div>
          </div>
        </template>
        <!-- Invoice Form -->
        <template #body v-if="doc">
     

          <div>
            <!-- Invoice Form Data Entry -->
            <div class="m-4 grid grid-cols-3 gap-4 attempt-form-data-entry">
              <FormControl
                input-class="font-semibold"
                :border="true"
                :df="getField('party')"
                :value="doc.party"
                @change="(value) => doc.set('party', value, true)"
                @new-doc="(party) => doc.set('party', party.name, true)"
                :read-only="doc?.submitted"
              />            
              <FormControl
                :border="true"
                :df="getField('account')"
                :value="doc.account"
                @change="(value) => doc.set('account', value)"
                :read-only="doc?.submitted"
              />
              
            </div>
            <hr />

            <!-- Invoice Items Table -->
            <Table
              class="text-base"
              :df="getField('items')"
              :value="doc.items"
              :showHeader="true"
              :max-rows-before-overflow="4"
              @change="(value) => doc.set('items', value)"
              @editrow="toggleQuickEditDoc"
              :read-only="doc?.submitted"
            />
          </div>

          <!-- Invoice Form Footer -->

          <div v-if="doc.items?.length ?? 0" class="mt-auto">
            <hr />
            <div class="flex justify-between text-base m-4 gap-12">
              <div class="w-1/2 flex flex-col justify-between">
                <!-- Discount Note -->
                <p v-if="discountNote?.length" class="text-gray-600 text-sm">
                  {{ discountNote }}
                </p>
                <!-- Form Terms-->
                <FormControl
                  :border="true"
                  v-if="!doc?.submitted || doc.terms"
                  :df="getField('terms')"
                  :value="doc.terms"
                  class="mt-auto"
                  @change="(value) => doc.set('terms', value)"
                  :read-only="doc?.submitted"
                />
              </div>

              <!-- Totals -->
              <div class="w-1/2 gap-2 flex flex-col self-end ml-auto">
                <!-- Subtotal -->
                <div class="flex justify-between">
                  <div>{{ t`Subtotal` }}</div>
                  <div>{{ formattedValue('netTotal') }}</div>
                </div>
                <hr />

                <!-- Discount Applied Before Taxes -->
                <div
                  v-if="totalDiscount.float > 0 && !doc.discountAfterTax"
                  class="flex flex-col gap-2"
                >
                  <div
                    class="flex justify-between"
                    v-if="itemDiscountAmount.float > 0"
                  >
                    <div>{{ t`Discount` }}</div>
                    <div>
                      {{ `- ${fyo.format(itemDiscountAmount, 'Currency')}` }}
                    </div>
                  </div>
                  <div class="flex justify-between" v-if="discountAmount.float > 0">
                    <div>{{ t`Invoice Discount` }}</div>
                    <div>{{ `- ${fyo.format(discountAmount, 'Currency')}` }}</div>
                  </div>
                  <hr v-if="doc.taxes?.length" />
                </div>

                <!-- Taxes -->
                <div
                  v-if="doc.taxes?.length"
                  class="flex flex-col gap-2 max-h-12 overflow-y-auto"
                >
                  <div
                    class="flex justify-between"
                    v-for="tax in doc.taxes"
                    :key="tax.name"
                  >
                    <div>{{ tax.account }}</div>
                    <div>
                      {{
                        fyo.format(
                          tax.amount,
                          {
                            fieldtype: 'Currency',
                            fieldname: 'amount',
                          },
                          tax
                        )
                      }}
                    </div>
                  </div>
                </div>
                <hr v-if="doc.taxes?.length" />

                <!-- Discount Applied After Taxes -->
                <div
                  v-if="totalDiscount.float > 0 && doc.discountAfterTax"
                  class="flex flex-col gap-2"
                >
                  <div
                    class="flex justify-between"
                    v-if="itemDiscountAmount.float > 0"
                  >
                    <div>{{ t`Discount` }}</div>
                    <div>
                      {{ `- ${fyo.format(itemDiscountAmount, 'Currency')}` }}
                    </div>
                  </div>
                  <div class="flex justify-between" v-if="discountAmount.float > 0">
                    <div>{{ t`Invoice Discount` }}</div>
                    <div>{{ `- ${fyo.format(discountAmount, 'Currency')}` }}</div>
                  </div>
                  <hr />
                </div>

                <!-- Grand Total -->
                <div
                  class="
                    flex
                    justify-between
                    text-green-600
                    font-semibold
                    text-base
                  "
                >
                  <div>{{ t`Grand Total` }}</div>
                  <div>{{ formattedValue('grandTotal') }}</div>
                </div>

                <!-- Base Grand Total -->
                <div
                  v-if="doc.isMultiCurrency"
                  class="
                    flex
                    justify-between
                    text-green-600
                    font-semibold
                    text-base
                  "
                >
                  <div>{{ t`Base Grand Total` }}</div>
                  <div>{{ formattedValue('baseGrandTotal') }}</div>
                </div>

                <!-- Outstanding Amount -->
                <hr v-if="doc.outstandingAmount?.float > 0" />
                <div
                  v-if="doc.outstandingAmount?.float > 0"
                  class="flex justify-between text-red-600 font-semibold text-base"
                >
                  <div>{{ t`Outstanding Amount` }}</div>
                  <div>{{ formattedValue('outstandingAmount') }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #quickedit v-if="quickEditDoc">
          <QuickEditForm
            class="w-quick-edit"
            :name="quickEditDoc.name"
            :show-name="false"
            :show-save="false"
            :source-doc="quickEditDoc"
            :source-fields="quickEditFields"
            :schema-name="quickEditDoc.schemaName"
            :white="true"
            :route-back="false"
            :load-on-close="false"
            @close="toggleQuickEditDoc(null)"
          />
        </template>
    
  </PosContainer>
  
</template>
<script>
import { computed } from '@vue/reactivity';
import { getDocStatus } from 'models/helpers';
import { ModelNameEnum } from 'models/types';
import Button from 'src/components/Button.vue';
import ExchangeRate from 'src/components/Controls/ExchangeRate.vue';
import FormControl from 'src/components/Controls/FormControl.vue';
import Table from 'src/components/Controls/Table.vue';
import DropdownWithActions from 'src/components/DropdownWithActions.vue';
import PosContainer from 'src/components/PosContainer.vue';
import StatusBadge from 'src/components/StatusBadge.vue';
import { fyo } from 'src/initFyo';
import { docsPathMap } from 'src/utils/misc';
import {
docsPath,
getActionsForDocument,
routeTo,
showMessageDialog
} from 'src/utils/ui';
import { nextTick } from 'vue';
import { handleErrorWithDialog } from '../errorHandling';
import QuickEditForm from './QuickEditForm.vue';

export default {
  name: 'InvoicePosForm',
  props: { schemaName: String, name: String },
  components: {
    StatusBadge,
    Button,
    FormControl,
    DropdownWithActions,
    Table,
    PosContainer,
    QuickEditForm,
    ExchangeRate    
  },
  provide() {
    return {
      schemaName: this.schemaName,
      name: this.name,
      doc: computed(() => this.doc),
    };
  },
  data() {
    return {
      chstatus: false,
      doc: null,
      quickEditDoc: null,
      quickEditFields: [],
      color: null,
      printSettings: null,
      companyName: null,
    };
  },
  updated() {
    this.chstatus = !this.chstatus;
  },
  computed: {
    address() {
      return this.printSettings && this.printSettings.getLink('address');
    },
    status() {
      this.chstatus;
      return getDocStatus(this.doc);
    },
    discountNote() {
      const zeroInvoiceDiscount = this.doc?.discountAmount?.isZero();
      const zeroItemDiscount = this.itemDiscountAmount?.isZero();

      if (zeroInvoiceDiscount && zeroItemDiscount) {
        return '';
      }

      if (!this.doc?.taxes?.length) {
        return '';
      }

      let text = this.t`Discount applied before taxation`;
      if (this.doc.discountAfterTax) {
        text = this.t`Discount applied after taxation`;
      }

      return text;
    },
    totalDiscount() {
      return this.discountAmount.add(this.itemDiscountAmount);
    },
    discountAmount() {
      return this.doc?.getInvoiceDiscountAmount();
    },
    itemDiscountAmount() {
      return this.doc.getItemDiscountAmount();
    },
    fromCurrency() {
      return this.doc?.currency ?? this.toCurrency;
    },
    toCurrency() {
      return fyo.singles.SystemSettings.currency;
    },
  },
  activated() {
    docsPath.value = docsPathMap[this.schemaName];
  },
  deactivated() {
    docsPath.value = '';
  },
  async mounted() {
    try {
      this.doc = await fyo.doc.getDoc(this.schemaName, this.name);
    } catch (error) {
      if (error instanceof fyo.errors.NotFoundError) {
        routeTo(`/list/${this.schemaName}`);
        return;
      }
      await this.handleError(error);
    }
    this.printSettings = await fyo.doc.getDoc('PrintSettings');
    this.companyName = (await fyo.doc.getDoc('AccountingSettings')).companyName;

    let query = this.$route.query;
    if (query.values && query.schemaName === this.schemaName) {
      this.doc.set(this.$router.currentRoute.value.query.values);
    }

    if (fyo.store.isDevelopment) {
      window.inv = this;
    }
  },
  methods: {
    routeTo,
    toggleInvoiceSettings() {
      if (!this.schemaName) {
        return;
      }

      const fields = ['discountAfterTax'].map((fn) =>
        fyo.getField(this.schemaName, fn)
      );

      this.toggleQuickEditDoc(this.doc, fields);
    },
    async toggleQuickEditDoc(doc, fields = []) {
      if (this.quickEditDoc && doc) {
        this.quickEditDoc = null;
        this.quickEditFields = [];
        await nextTick();
      }

      this.quickEditDoc = doc;
      this.quickEditFields = fields;
    },
    actions() {
      return getActionsForDocument(this.doc);
    },
    getField(fieldname) {
      return fyo.getField(this.schemaName, fieldname);
    },
    async sync() {
      try {
        await this.doc.sync();
      } catch (err) {
        await this.handleError(err);
      }
    },
    async submit() {
      const message =
        this.schemaName === ModelNameEnum.SalesInvoice
          ? this.t`Submit Sales Invoice?`
          : this.t`Submit Purchase Invoice?`;
      const ref = this;
      await showMessageDialog({
        message,
        buttons: [
          {
            label: this.t`Yes`,
            async action() {
              try {
                await ref.doc.submit();
              } catch (err) {
                await ref.handleError(err);
              }
            },
          },
          {
            label: this.t`No`,
            action() {},
          },
        ],
      });
    },
    async handleError(e) {
      await handleErrorWithDialog(e, this.doc);
    },
    formattedValue(fieldname, doc) {
      if (!doc) {
        doc = this.doc;
      }

      const df = this.getField(fieldname);
      return fyo.format(doc[fieldname], df, doc);
    },
  },
};
</script>