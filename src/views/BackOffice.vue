<template>
  <div style="background-color: #f1f2f8">
    <div class="q-pa-md"><h4>Admin`s Managment</h4></div>
    <AddDeal :tableName="'deals'" @dealAdded="reloadTable"/>
    <AdminTable :tableName="'deals'" :isReload="isReload"/>
  </div>
</template>

<script>
import AdminTable from '../components/AdminTable';
import AddDeal from "@/components/AddDeal";
export default {
  name: "BackOffice",
  components: {AdminTable ,AddDeal},
  data(){
    return{
      isReload : false
    }
  },
  methods:{
    reloadTable(){
      this.isReload = !this.isReload
    }
  }
}
</script>

<style scoped>

</style>