<!-- eslint-disable vue/no-mutating-props -->
<template id="field-component-template">
  <!--Form Field-->
  <div class="relative">
    <div class="form-control">
      <label class="label">
        <span class="font-semibold">{{fieldData.label}}</span>
        <input
          class="input input-bordered m-2 w-10/12"
          :id="fieldData.id"
          :type=fieldData.type
          v-model="fieldData.value"
          :class="{'input-error' : isInvalid}"
          @input="validate"
        />
      </label>
    </div>
    <div
      v-if="isInvalid"
      class="text-error text-right text-sm pr-5 absolute right-0"
      style="bottom: -7px;"
    >
      {{invalidMessage}}
    </div>
  </div>
</template>

<script>
import { nextTick } from '@vue/runtime-core';
export default {
  name: "field-component-template",
  props: ['fieldData', 'isInvalid', 'invalidMessage'],
  methods: {
    validate() {
      nextTick(() => {
        if (this.isInvalid) this.props.validate();
      });
    }
  }
}
</script>