<template>
  <div class="flex bg-gray-25 PosContainer">
    <div class="flex flex-1 flex-col">
      <!-- Page Header (Title, Buttons, etc) -->
      <PageHeader :title="t`Point of Sale`" :border="false" :searchborder="searchborder">
        <slot name="header" />
      </PageHeader>

      

      <!-- Invoice Form -->
      <div
        class="
          flex           
          grid 
          grid-cols-12
          bg-white 
          pos_container
          PosContainer
          border-t
          border-b
          h-full
        "
      >
      <div class="flex-none col-span-8  h-full flex-auto p-2">
        <slot name="items" />
      </div>
      <div class="flex-none col-span-4 h-full border-l">
        <slot name="body" />
      </div>
        
      </div>
    </div>

    <!-- Invoice Quick Edit -->
    <slot name="quickedit" />
  </div>
</template>
<script>
import PageHeader from './PageHeader.vue';
export default {
  components: { PageHeader },
  props: {
    title: { type: String, default: '' },
    searchborder: { type: Boolean, default: true },
  },
};
</script>
