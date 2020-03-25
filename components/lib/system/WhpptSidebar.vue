<template>
  <div v-if="draft" class="whppt-sidebar" :class="{ 'whppt-openEditor': editSidebar }">
    <div class="whppt-sidebar__inner">
      <whppt-tabs>
        <whppt-tab title="Selected Component">
          <component :is="editSidebarType"></component>
          <div v-if="selectedComponent && selectedComponent.value && selectedContent" class="whppt__default-container">
            <whppt-check-box
              v-if="selectedComponent.value.hasOwnProperty('reversed')"
              :value="selectedComponent.value.reversed"
              label="Reversed"
              @click="selectedComponent.value.reversed = !selectedComponent.value.reversed"
            ></whppt-check-box>
            <whppt-check-box
              :value="selectedComponent.value.inContainer"
              label="Put in a Container"
              @click="selectedComponent.value.inContainer = !selectedComponent.value.inContainer"
            ></whppt-check-box>
            <whppt-text-input
              v-model="selectedComponent.value.marginTopLarge"
              type="number"
              max="8"
              min="0"
              :placeholder="$whppt.defaultMarginTop"
              label="Margin Top - Large Screens (Desktop)"
              class="marin-top-input"
            />
            <whppt-text-input
              v-model="selectedComponent.value.marginTopMedium"
              type="number"
              max="8"
              min="0"
              :placeholder="$whppt.defaultMarginTop"
              label="Margin Top - Medium Screens (Tablet)"
              class="marin-top-input"
            />
            <whppt-text-input
              v-model="selectedComponent.value.marginTopSmall"
              type="number"
              max="8"
              min="0"
              :placeholder="$whppt.defaultMarginTop"
              label="Margin Top - Small Screens (Mobile)"
              class="marin-top-input"
            />
          </div>
        </whppt-tab>
        <whppt-tab v-if="selectedContent" title="Contents Tree">
          <contents-tree></contents-tree>
        </whppt-tab>
      </whppt-tabs>
      <whppt-button class="whppt-button__close" @click="closeSidebar">
        Close
      </whppt-button>
    </div>
  </div>
</template>

<script>
import { filter, flatMap, forEach } from 'lodash';
import { mapActions, mapState } from 'vuex';
import WhpptTabs from '../whpptComponents/WhpptTabs';
import ContentsTree from '../whpptComponents/ContentsTree';
import WhpptTab from '../whpptComponents/WhpptTab';
import WhpptButton from '../whpptComponents/WhpptButton';

const additionalComponents = {};

const types = global.$whppt.types;
const editors = flatMap(
  filter(types, t => t.editors),
  t => t.editors
);

forEach(editors, editor => {
  additionalComponents[editor.name] = editor.component;
});

console.log(editors);

export default {
  name: 'WhpptSidebar',
  components: {
    ...additionalComponents,
    WhpptTabs,
    ContentsTree,
    WhpptTab,
    WhpptButton,
  },
  computed: {
    ...mapState('whppt-nuxt/editor', [
      'editSidebar',
      'editSidebarType',
      'editData',
      'selectedComponent',
      'selectedContent',
      'draft',
    ]),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
  },
};
</script>

<style scoped></style>