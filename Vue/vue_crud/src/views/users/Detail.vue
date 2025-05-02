<template>
  <div>
    <b-modal
      :no-close-on-backdrop="true"
      id="user-detail"
      class="mx-auto"
      centered
      ref="user-detail"
      title="User Detail"
    >
      <template v-if="!isLoading">
        <LoaderComponent />
      </template>
      <div v-if="isLoading">
        <div class="row">
          <div class="col-md-6">
            <div class="font-w-700"><span>#</span></div>
            <div>
              <b
                ><h6>{{ this.userObject.id }}</h6></b
              >
            </div>

            <div class="font-w-700"><span>Name</span></div>
            <div>
              <b
                ><h6>{{ this.userObject.name }}</h6></b
              >
            </div>

            <div class="font-w-700"><span>Followers</span></div>
            <div>
              <b
                ><h6>{{ this.userObject.followers }}</h6></b
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="font-w-700"><span>Public repos</span></div>
            <div>
              <b
                ><h6>{{ this.userObject.public_repos }}</h6></b
              >
            </div>

            <div class="font-w-700"><span>Type</span></div>
            <div>
              <b
                ><h6>{{ this.userObject.type }}</h6></b
              >
            </div>
            <div class="font-w-700"><span>Location</span></div>
            <div>
              <b
                ><h6>{{ this.userObject.location }}</h6></b
              >
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-end pt-4 mb-2">
        <button class="btn btn-danger btn-sm ml-2" @click="hideModal()">
          Close
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { userDetail } from "../../apis/services";
import LoaderComponent from "../../components/LoaderComponent";
export default {
  name: "UserDetail",
  data() {
    return {
      userObject: {},
      isLoading: false,
    };
  },

  components: { LoaderComponent },
  methods: {
    hideModal() {
      this.showModel = false;
      this.$refs["user-detail"].hide();
      this.$emit("closeModal", false);
    },
  },
  mounted() {
    let userId = JSON.parse(localStorage.getItem("userId"));
    userDetail(userId).then((response) => {
      if (response) {
        this.userObject = response;
        console.log(this.userObject);
        this.isLoading = true;
      }
    });
    this.$refs["user-detail"].show();
  },
};
</script>

<style scoped>
.label {
  font-size: 15px;
  color: #666;
  padding-top: 20px;
  padding-bottom: 5px;
}

textarea {
  width: 100%;
  resize: none;
  border-radius: 5px;
  border-color: #dedede;
  padding: 5px;
}
</style>
