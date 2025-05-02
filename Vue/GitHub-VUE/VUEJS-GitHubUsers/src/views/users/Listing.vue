<template>
  <div class="container pt-5 pb-5">
    <template v-if="!isLoading">
      <LoaderComponent />
    </template>
    <div class="card-body" v-if="isLoading">
      <h2 class="text-center mb-2">User Listing</h2>
      <div class="row mb-md-2 align-items-center">
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show
              <b-form-select
                v-model="perPage"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
              entries
            </label>
          </div>
        </div>
        <!-- Search -->

        <div class="col">
          <div
            id="tickets-table_filter"
            class="dataTables_filter text-md-right d-flex justify-content-end"
          >
            <label class="d-inline-flex align-items-center">
              Search:
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Search..."
                class="form-control form-control-sm m-2"
              ></b-form-input>
            </label>
          </div>
        </div>
      </div>

      <div class="table-responsive mb-0">
        <b-table
          bordered
          :items="items"
          :fields="fields"
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
          show-empty
          empty-text="No record found"
          empty-filtered-text="No search result found"
        >
          <template v-slot:cell(actions)="loans">
            <i
              class="fa-solid fa-eye cursor-pointer"
              @click="detail(loans)"
            ></i>
          </template>
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0 justify-content-end">
              <!-- pagination -->
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <template v-if="isShowModel">
      <Detail @closeModal="closeModal" />
    </template>
  </div>
</template>

<script>
import LoaderComponent from "../../components/LoaderComponent";
import Detail from "../../views/users/Detail.vue";

import { userListing } from "../../apis/services";
export default {
  name: "ListingComponent",
  components: {
    LoaderComponent,
    Detail,
  },
  data() {
    return {
      fields: [
        { key: "id", label: "#" },
        { key: "login", label: "Name" },
        { key: "node_id", label: "Node id" },
        { key: "type", label: "Type" },
        { key: "actions" },
      ],
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      isShowModel: false,
      isLoading: false,
      filter: null,
      filterOn: [],
      pageOptions: [10, 25, 50, 100],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  mounted() {
    userListing().then((response) => {
      if (response) {
        this.items = response;
        this.isLoading = true;
      }
    });
  },
  methods: {
    detail(object) {
      localStorage.setItem("userId", JSON.stringify(object.item.id));
      this.isShowModel = true;
      // this.$router.push("/user-detail/" + object.item.id);
    },
    closeModal(value) {
      this.isShowModel = value;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
