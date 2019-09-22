<template>
    <div id="app">
    <b-container>
    <div class="text-center">
        <b><p>Affichage du tableau</p></b>
    </div>
    
    <b-col lg="12" class="my-1">
        <b-form-group
          label="Filtrer"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="chercher"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Effacer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <br />
    <b-table 
      striped hover
      id="my-table"    
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      @filtered="onFiltered"
      >
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Cacher' : 'Afficher'}} Détails
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>ID:</b></b-col>
            <b-col>{{ row.item.id }}</b-col>
          </b-row>
           <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>PJ:</b></b-col>
            <b-col>{{ row.item.attachments }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>DE:</b></b-col>
            <b-col>{{ row.item.customer.last_name }} {{ row.item.customer.first_name }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Status:</b></b-col>
            <b-col>{{ row.item.status }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Création:</b></b-col>
            <b-col>{{ row.item.interaction_creation_date|formatDate}}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Echéance:</b></b-col>
            <b-col>{{ row.item.due_date|formatDate }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Compétence:</b></b-col>
            <b-col>{{ row.item.contact_channel }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Assigné:</b></b-col>
            <b-col>{{ row.item.assignedTO }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Dernier commentaire:</b></b-col>
            <b-col>{{ row.item.last_comment}}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Cacher Détails</b-button>
        </b-card>
      </template>
    </b-table>
  
    <b-pagination align="center" v-model="currentPage" :total-rows="rows" :per-page="perPage"
      aria-controls="my-table" ></b-pagination>
   
    </b-container>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import json from './json/MOCK_DATA.json'

  export default {
    data() {
      return {
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        filter: null,
        filterOn: [],
        fields: [
          { key: 'id', label: 'ID' , sortable: true },
          { key: 'attachments', label: 'PJ' ,sortable: true  },
          { key: 'customer.last_name', label: 'DE', sortable: true  },
          { key: 'status', label: 'Statut', sortable: true },
          { key: 'interaction_creation_date', label: 'Création', sortable: true  },
          { key: 'due_date', label: 'Echéance', sortable: true  },
          { key: 'contact_channel', label: 'Compétence', sortable: true  },
          { key: 'assignedTO', label: 'Assigné', sortable: true  },
          { key: 'last_comment', label: 'Dernier commentaire' , sortable: true },
          'show_details'
        ],
        items: json
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      rows() {
        return this.items.length
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
        onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
<style></style>
