<template>
  <div class="multi-step-form container mx-auto px-4">
    <form class="p-10 w-9/12 mx-auto" @submit.prevent="">
      <div v-if="!submitted">
        <h1 class="mb-5 font-semibold text-4xl">User Details</h1>
        <!-- form step indicator -->
        <div class="flex items-stretch gap-2">
          <div
            v-for="(step, index) in totalSteps"
            :key="index"
            class="h-2 w-full rounded text-indigo-500"
            style="border: 1px solid;"
            :class="{'bg-indigo-500 ': step - 1 <= currentStep}"
          ></div>
        </div>

        <!-- Form fields -->
        <div v-for="(fieldKeys, step) in steps" :key="step">
          <div v-if="currentStep === step">    
            <div v-for="(field, index) in fieldKeys" :key="index" class="relative">
              <input-field-component
                :fieldData="fields[field]"
                :isInvalid="!!invalids[field]"
                :invalidMessage="invalids[field]"
                :validate="validateField(field)"
              />
            </div>
          </div>
        </div>
        <footer class="flex flex-row-reverse gap-2 justify-start mt-5">
          <button class="btn btn-primary bg-indigo-600 hover:bg-indigo-700 submit-btn" v-if="isLastStep" @click="submit"> Submit </button>
          <button class="btn btn-primary bg-indigo-600 hover:bg-indigo-700 next-btn" v-if="!isLastStep" @click="nextStep"> Next </button>
          <button class="btn previous-btn" v-if="!isFirstStep" @click.prevent="previousStep"> Previous </button>
        </footer>
      </div>
      <div v-else class="rounded mx-auto bg-white  pb-4 text-left shadow-xl border transition-all  sm:w-full sm:max-w-sm  ">
        <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <h3 class="text-lg  font-bold antialiased leading-6 text-slate-900">User Detail</h3>
        </div>
        <h3 class="p-5 text-lg ">
          <p><b>Name : </b> <span>{{ fields.firstName.value }} {{ fields.lastName.value }}</span></p>
          <p><b>Date Of Birth : </b> <span> {{ fields.dateOfBirth.value }} </span></p>
          <p class="mt-3">Hey <b>{{fields.firstName.value}}</b>, thanks for add details!</p>
        </h3>
      </div>
      
    </form>

    <!-- Confirmation Dialog -->
    <div v-if="openConfirm" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">User Details Added</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">User details save successfully!!</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button @click="openConfirm=false" type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm confirm-btn">Okay</button>
              <button @click="openConfirm=false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputFieldComponent from '../components/InputFieldComponent.vue';

export default {
  name: 'UserDetail',
  components: {
    InputFieldComponent
  },
  data() {
    return {
      fields: {
        firstName: {
          label: "First Name",
          type: "text",
          id: 'first_name',
          value: "",
          validations: [
            {
              message: "First Name is a required field",
              test: (value) => value
            }
          ]
        },
        lastName: {
          label: "Last Name",
          type: "text",
          id: 'last_name',
          value: "",
          validations: [
            {
              message: "Last Name is a required field",
              test: (value) => value
            }
          ]
        },
        middleName: {
          label: "Middle Name",
          type: "text",
          id: "middle_name",
          value: "",
        },
        dateOfBirth: {
          label: "Date Of Birth",
          type: "date",
          id: 'date_of_birth',
          value: "",
          validations: [
            {
              message: "Date Of Birth is a required field",
              test: (value) => value
            }
          ]
        }
      },
      steps: [
        ["firstName", "lastName"],
        ["middleName"],
        ["dateOfBirth"]
      ],
      currentStep: 0,
      invalids: {},
      openConfirm: false,
    }
  },
  computed: {
    totalSteps() {
      return this.steps.length;
    },
    isFirstStep() {
      return this.currentStep === 0;
    },
    isLastStep() {
      return this.currentStep === this.totalSteps - 1;
    },
    currentFields() {
      return this.steps[this.currentStep];
    },
    isInvalid() {
      return !!Object.values(this.invalids).filter((key) => key).length;
    }
  },
  methods: {
    previousStep() {
      if (this.isFirstStep) return;
      this.invalids = {};
      this.currentStep--;
    },
    nextStep() {
      if (this.isLastStep) return;
      this.validate();
      if (this.isInvalid) return;
      this.currentStep++;
    },
    validate() {
      this.invalids = {};
      this.currentFields.forEach((key) => {
        this.validateField(key);
      });
    },
    validateField(fieldKey) {
      this.invalids[fieldKey] = false;
      const field = this.fields[fieldKey];
      field.validations?.forEach(validation => {
        if (!validation.test(field.value)) {
          this.invalids[fieldKey] = validation.message;
        }
      });
    },
    async submit() {
      // check form validation
      this.validate();
      if (this.isInvalid) return;

      // submit if form valid
      this.openConfirm = true;
      this.submitted = true;
    },
  }
}
</script>

<style scoped>

</style>
