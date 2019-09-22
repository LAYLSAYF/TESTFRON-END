<template>
    <div id="app">
    <b-container>
    <div class="text-center">
        <b><p class="">Affichage du tableau</p></b>
    </div>
        Rechercher <input placeholder="fitrer" class="form-control" v-model="searchText">
        <table id="data-table" class="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th class="col-md-4" @click="sort('id')">Id</th>
              <th class="col-md-4" @click="sort('attachments')">PJ</th>
              <th class="col-md-4" @click="sort('first_name')">De</th>
              <th class="col-md-4" @click="sort('status')">Statut</th>
              <th class="col-md-4" @click="sort('interaction_creation_date')">Création</th> 
              <th class="col-md-4" @click="sort('due_date')">Echéance</th>
              <th class="col-md-4" @click="sort('contact_channel')">Compétence</th>
              <th class="col-md-4" @click="sort('assignedTO')">Assigné</th>
              <th class="col-md-4" @click="sort('last_comment')">Dernier commentaire</th>
              <th class="col-md-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in sortedItems">
              <td >{{data.id}}</td>
              <td >{{data.attachments}}</td>
              <td>{{data.customer.first_name}} {{data.customer.last_name}}</td>
              <td>{{data.status}}</td>
              <td>{{ data.interaction_creation_date|formatDate }}</td>
              <td>{{ data.due_date|formatDate }}</td>
              <td>{{data.contact_channel}}</td>
              <td>{{data.assignedTO}}</td>
              <td v-if="data.last_comment.length<15">{{data.last_comment}}</td>
              <td v-if="data.last_comment.length>=15">{{data.last_comment.substring(0,15)+"..." }}
              </td>
              <td>
              <b-button>Détails</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
        <p>
        <b-button variant="primary" @click="prevPage">Précedent</b-button>
        <b-button variant="primary" @click="nextPage">Suivant</b-button>
        </p>
        </div>
                </b-container>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import json from './json/MOCK_DATA.json'

export default
{
    data(){
      return{
        items:[],
        currentSort:'name',
        currentSortDir:'asc',
        pageSize:10,
        currentPage:1,
        items: json
      }
    }, 
    computed: {
      sortedItems:function() {
  return this.items.sort((a,b) => {
    let modifier = 1;
    if(this.currentSortDir === 'desc') modifier = -1;
    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
    return 0;
  }).filter((row, index) => {
    let start = (this.currentPage-1)*this.pageSize;
    let end = this.currentPage*this.pageSize;
    if(index >= start && index < end) return true;
  });
}
    },
    methods: {
      sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      },
      nextPage:function() {
        if((this.currentPage*this.pageSize) < this.items.length) this.currentPage++;
      },
      prevPage:function() {
        if(this.currentPage > 1) this.currentPage--;
      }
    }
}
</script>
<style></style>
