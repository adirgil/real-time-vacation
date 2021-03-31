<template>
  <div style="background-color: #f1f2f8">
    <q-item-section avatar style="display: flex">
      <q-btn no-caps flat round icon="add" rounded text-color="none" class="header">
        Post a New Deal
      </q-btn>
    </q-item-section>
    <AddDeal :tableName="'deals'"/>
  </div>
</template>

<script>
export default {
  name: "PostNewDeal",
  components:{AddDeal}
}
import AddDeal from "@/components/AddDeal";
</script>



<style lang="sass" scoped>
.header
  font-size: 30px
  padding: 10px
</style>