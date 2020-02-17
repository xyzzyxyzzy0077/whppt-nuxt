<template>
  <div>
    <div v-if="isSizesEmpty">Missing Image Sizes</div>
    <div v-if="!isSizesEmpty">
      <div v-for="canvas in imageOptionsCopy.sizes" :key="canvas.name" class="whppt-cropper-container">
        <label class="whppt-cropper-label">{{ canvas.name }}</label>
        <croppa
          :key="canvas.name"
          :disable-drag-and-drop="true"
          :disable-click-to-choose="true"
          :width="canvas.width / canvas.quality"
          :height="canvas.height / canvas.quality"
          v-model="canvas.croppa"
          :initial-image="$whppt.originalImageUrl(imageOptionsCopy.imageId)"
          :placeholder="'Choose an image'"
          :accept="'image/*'"
          :file-size-limit="0"
          :prevent-white-space="true"
          @initial-image-loaded="applyManipulation"
          @draw="change(canvas)"
        />
      </div>
      <whppt-button @click="applyChanges" class="whppt-cropper__apply-change">Apply Change</whppt-button>
    </div>
  </div>
</template>

<script>
import { each, cloneDeep, assign } from 'lodash';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import WhpptButton from '../../whpptComponents/WhpptButton';

export default {
  name: 'EditorImageCropping',
  components: { croppa: Croppa.component, WhpptButton },
  data() {
    return {
      imageOptionsCopy: {},
    };
  },
  props: {
    imageOptions: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.imageOptions.crop = this.imageOptions.crop || {};
    each(this.imageOptions.sizes, (size, key) => {
      size.name = key;
      size.croppa = size.croppa || {};
    });
    this.imageOptionsCopy = cloneDeep(this.imageOptions);
  },
  computed: {
    isSizesEmpty() {
      return !Object.keys(this.imageOptions.sizes).length;
    },
  },
  methods: {
    applyManipulation() {
      this.$nextTick(() =>
        each(this.imageOptionsCopy.sizes, (size, key) => {
          size.croppa.applyMetadata(this.imageOptions.crop[key] || {});
        })
      );
    },
    change(canvas) {
      const meta = {
        startX: canvas.croppa.imgData.startX,
        startY: canvas.croppa.imgData.startY,
        orientation: canvas.croppa.orientation,
        scale: canvas.croppa.scaleRatio,
      };
      this.imageOptionsCopy.crop[canvas.name] = meta;
    },
    applyChanges() {
      assign(this.imageOptions.crop, this.imageOptionsCopy.crop);
      this.imageOptions.imageId = this.imageOptionsCopy.imageId;
    },
  },
};
</script>
<style scoped>
.whppt-cropper-container {
  margin-bottom: 10px;
}
.whppt-cropper-label {
  color: white;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-cropper__apply-change {
  margin: 10px 0;
}
</style>