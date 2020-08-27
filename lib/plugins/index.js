import axios from 'axios';
import { menuIsInState, MENUSTATES } from '../util';
import GenericPage from '../components/systemPlugins/GenericPagePlugin';
import registerDynamicDirectives from '../util/registerDynamicDirectives';

import listDirective from './directives/list';
import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import editImageDirective from './directives/editImage';
import { Components } from './Components';

import LoadSiteSettings from './helpers/LoadSiteSettings';
import SaveSiteSettings from './helpers/SaveSiteSettings';
import PublishSiteSettings from './helpers/PublishSiteSettings';
import SavePage from './helpers/SavePage';
import PublishPage from './helpers/PublishPage';
import UnpublishPage from './helpers/UnpublishPage';
import DeletePage from './helpers/DeletePage';
import SaveFooter from './helpers/SaveFooter';
import PublishFooter from './helpers/PublishFooter';
import LoadFooter from './helpers/LoadFooter';
import SaveNav from './helpers/SaveNav';
import PublishNav from './helpers/PublishNav';
import LoadNav from './helpers/LoadNav';
import LoadPage from './helpers/LoadPage';
import CheckSlug from './helpers/CheckSlug';
import Select from './helpers/editors/Select';
import Hover from './helpers/editors/Hover';
import Image from './helpers/Image';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const whppt = (global.$whppt = {
    context,
    availablePlugins: { GenericPage },
    apiPrefix: options.apiPrefix,
    savePageCallback: undefined,
    disablePublishing: options.disablePublishing,
    onSavePage(callback) {
      this.savePageCallback = callback;
    },
    offSavePage() {
      this.savePageCallback = undefined;
    },
  });

  const { store } = context;

  Object.assign(global.$whppt, {
    editData: undefined,
    loadSiteSettings: LoadSiteSettings(context),
    saveSiteSettings: SaveSiteSettings(context),
    publishSiteSettings: PublishSiteSettings(context),
    savePage: SavePage(context),
    publishPage: PublishPage(context),
    unpublishPage: UnpublishPage(context),
    deletePage: DeletePage(context),
    loadPage: LoadPage(context),
    checkSlug: CheckSlug(context),
    loadFooter: LoadFooter(context),
    saveFooter: SaveFooter(context),
    publishFooter: PublishFooter(context),
    loadNav: LoadNav(context),
    saveNav: SaveNav(context),
    publishNav: PublishNav(context),
    templates: options.templates,
    pageTypes: options.pageTypes,
    components: Components(options),
    defaultPadding: {
      top: (options.defaultPadding && options.defaultPadding.top) || { base: 0, sm: 0, lg: 0 },
      bottom: (options.defaultPadding && options.defaultPadding.bottom) || { base: 0, sm: 0, lg: 0 },
    },
    defaultMargin: {
      top: (options.defaultMargin && options.defaultMargin.top) || { base: 0, sm: 2, lg: 4 },
      bottom: (options.defaultMargin && options.defaultMargin.bottom) || { base: 0, sm: 2, lg: 4 },
    },
    spacing: options.spacing || setSize, // why is this set on the global whppt obj?
  });
  Select(whppt);
  Image(whppt, store.state[`whppt-nuxt/editor`].baseImageUrl, store.state[`whppt-nuxt/editor`].baseCdnImageUrl);
  Hover(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  const $api = axios.create({
    baseURL: `${store.state['whppt-nuxt/editor'].baseAPIUrl}/${whppt.apiPrefix}`,
    timeout: 6000,
  });

  $api.$get = url => $api.get(url).then(res => res.data);
  $api.$post = (url, args) => $api.post(url, args).then(res => res.data);

  context.$api = $api;
  inject('api', $api);

  const dynamicDirectives = [
    { name: 'whppt-text', componentName: 'plainText' },
    { name: 'whppt-default', componentName: 'default' },
    { name: 'whppt-anchor', componentName: 'AnchorMenu' },
    { name: 'whppt-formatted-text', componentName: 'formattedText' },
    { name: 'whppt-link', componentName: 'wLink' },
    { name: 'whppt-date', componentName: 'date' },

    /* i feel like these 2 shouldn't be in the core bundle */
    { name: 'whppt-split-content', componentName: 'splitContent' },
    { name: 'whppt-split-gap', componentName: 'splitGap' },

    /* @deprecated 2.0 */
    // { name: 'whppt-color', componentName: 'colours' },
    // { name: 'whppt-menu', componentName: 'Menu' },
    // { name: 'whppt-youtube', componentName: 'youtube' },
    // { name: 'whppt-contact-icon', componentName: 'ContactIcon' },
  ];

  registerDynamicDirectives(context, menuIsInState, MENUSTATES, dynamicDirectives);

  listDirective({ ...context, menuIsInState, MENUSTATES });
  contentDirective({ ...context, menuIsInState, MENUSTATES });
  richTextDirective({ ...context, menuIsInState, MENUSTATES });
  editImageDirective({ ...context, menuIsInState, MENUSTATES }); // semi tested, need s3 creds

  /* @deprecated 2.0 */
  // editImageDirective({ ...context, menuIsInState, MENUSTATES });
};

function setSize(size) {
  switch (Number(size)) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 4;
    case 4:
      return 8;
    case 5:
      return 12;
    case 6:
      return 16;
    case 7:
      return 24;
    case 8:
      return 32;
    default:
      return 0;
  }
}

/* TODO: make private */
// function addPlugins(plugins) {
//   forEach(plugins, (plugin, key) => {
//     this.plugins[key] = plugin;
//
//     if (plugin.editors) {
//       forEach(plugin.editors, editor => {
//         if (editor.directive)
//           return editor.directive({
//             ...context,
//             menuIsInState,
//             MENUSTATES,
//             definition: editor,
//           });
//
// dynamicDirective({
//   ...context,
//   menuIsInState,
//   MENUSTATES,
//   definition: editor,
// });
//       });
//     }
//   });
// }