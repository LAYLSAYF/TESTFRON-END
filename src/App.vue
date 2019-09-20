<template>
    <div id="app">
    <b-container>
    <div class="text-center">
        <b><p class="">Affichage du tableau</p></b>
    </div>
        
        <table id="data-table" class="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th class="col-md-4" v-column-sortable:id>Id</th>
              <th class="col-md-4" v-column-sortable:attachments>PJ</th>
              <th class="col-md-4" v-column-sortable:first_name>De</th>
              <th class="col-md-4" v-column-sortable:status>Statut</th>
              <th class="col-md-4" v-column-sortable:interaction_creation_date>Création</th> 
              <th class="col-md-4" v-column-sortable:due_date>Echéance</th>
              <th class="col-md-4" v-column-sortable:contact_channel>Compétence</th>
              <th class="col-md-4" v-column-sortable:assignedTO>Assigné</th>
              <th class="col-md-4" v-column-sortable:last_comment >Dernier commentaire</th>
              <th class="col-md-4" >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in items">
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
              <td></td>
            </tr>
          </tbody>
        </table>
        </b-container>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import json from './json/MOCK_DATA.json'
import columnSortable from 'vue-column-sortable'


export default
{
    data(){
      perPage: 10
      currentPage: 1
      return{
        items: json
      }
    }, 
    computed: {
      rows() {
        return this.items.length
      }
    },
    methods: {
      orderBy(fn) {
        this.items.sort(fn);
      }
    },
    directives: {
      columnSortable,
    },
}
</script>
<style>

</style>
