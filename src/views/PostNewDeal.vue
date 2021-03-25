<template>
  <div>
    <AddDeal :tableName="'deals'"/>
    <h1>New Deal!</h1>
  </div>
</template>

<script>
export default {
  name: "PostNewDeal",
  components:{AddDeal}
}
import AddDeal from "@/components/AddDeal";
</script>



<style scoped>

</style>