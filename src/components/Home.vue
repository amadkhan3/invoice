<template>
    <el-row :gutter="20">
      <el-col :span="10">
          <h2>Invoice Form</h2>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Activity time">
                <el-date-picker type="date" placeholder="Pick a date" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item
                label="amount"
                prop="amount"
            >
                <el-input type="number" v-model.number="form.amount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if="editMode === false" type="primary" @click="onSubmit" size="small">Create</el-button>
                <el-button v-if="editMode === true" type="primary" @click="onSave" size="small">Save</el-button>
                <el-button @click="getAggregate" type="success" size="small">Get Aggregate</el-button>
            </el-form-item>
            </el-form>
      </el-col>
      <el-col :span="12" :offset="1">
        <h2>Invoices</h2>
        <el-table
        ref="filterTable"
        :data="tableData.filter(data => !search || data.date.includes(search))"
        style="width: 100%">
            <el-table-column
                prop="date"
                sortable
                label="Date"
                >
            </el-table-column>
            <el-table-column
                prop="amount"
                label="Amount"
                >
            </el-table-column>
            <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="Type to search"/>
            </template>
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" circle></el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
            </template>
            </el-table-column>
        </el-table>
        <h2>Aggregate Data</h2>
            <el-table
        ref="filterTable"
        :data="aggregate"
        style="width: 100%">
            <el-table-column
                prop="date"
                sortable
                label="Date"
                >
            </el-table-column>
            <el-table-column
                prop="amount"
                label="Total"
                >
            </el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>

<script>
import moment from 'moment'
var _ = require('lodash');
export default {
  name: 'Home',
  props: {
  },
  data() {
      return {
        search: '',
        editMode: false,
        tempIndex: '',
        tableData: [],
        aggregate: [],
        form: {
          amount: '',
          date: '',  
        }
      }
    },
    methods: {
      onSave () {
          this.tableData[this.tempIndex].date = this.form.date
          this.tableData[this.tempIndex].amount = this.form.amount
          this.clearForm()
          this.editMode = false
      },
      handleEdit (index, row) {
          this.editMode = true
          this.form.amount = row.amount
          this.form.date = row.date
          this.tempIndex = index
      },
      handleDelete (index) {
          this.tableData.splice(index, 1)
      },
      filterHandler (value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      clearForm () {
          this.form.amount = ''
          this.form.date = ''
      },
      getAggregate () {
            this.aggregate = []
            var grouped = _.groupBy(this.tableData, 'date')
            var sum = 0
            var date = ''
            const keys  = Object.keys(grouped);
            keys.forEach(element => {
                date = element
                grouped[element].map((item) => {
                    sum += item.amount
                })
                this.aggregate.push({date: date, amount: sum})
                sum = 0
                date = ''
            });
      },
      onSubmit () {
          this.tableData.push({amount: this.form.amount, date: moment(this.form.date).format('MM/DD/YYYY')})
          this.clearForm()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
