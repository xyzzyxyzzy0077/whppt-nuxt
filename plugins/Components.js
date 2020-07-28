const Components = options => [
  {
    key: 'Text',
    name: 'Text',
    editorType: 'wPlainText',
    displayType: 'wPlainText',
    text: '',
    property: 'text',
    alignment: { label: 'Left', value: 'left' },
  },
  {
    key: 'RichText',
    name: 'Rich Text',
    editorType: 'wRichText',
    displayType: 'wRichText',
    text: '',
    property: 'text',
  },
  {
    key: 'FormattedText',
    name: 'Formatted Text',
    editorType: 'wFormattedText',
    displayType: 'wFormattedText',
    text: '',
    property: 'text',
  },
  {
    key: 'Link',
    name: 'Link',
    editorType: 'wLink',
    displayType: 'wLink',
    type: 'page',
    fileId: '',
    text: '',
    showOnDesktop: true,
    showOnTablet: true,
    showOnMobile: true,
  },
  {
    key: 'Menu',
    name: 'Menu',
    editorType: 'Menu',
    displayType: 'Menu',
    type: 'page',
    links: [],
    showOnDesktop: true,
    showOnTablet: true,
    showOnMobile: true,
  },
  {
    key: 'Carousel',
    name: 'Carousel',
    editorType: 'wList',
    displayType: 'wCarousel',
    reversed: false,
    title: '',
    description: '',
    button: {
      type: 'page',
      text: '',
      href: '',
      fileId: '',
    },
    property: 'items',
    items: [
      {
        text: {
          title: '',
          description: '',
        },
        button: {
          text: '',
          icon: undefined,
          href: '',
          type: 'page',
          fileId: '',
        },
        image: {
          imageId: undefined,
          crop: {},
        },
      },
    ],
  },
  {
    key: 'SplitContent',
    name: 'Split Content',
    editorType: 'wSplitContent',
    displayType: 'wSplitContent',
    property: 'width',
    contents: { left: [], right: [] },
    width: 6,
    gap: 0,
  },
  {
    key: 'Anchor',
    name: 'Anchor',
    editorType: 'AnchorMenu',
    displayType: 'Anchor',
    id: '',
    marginTop: 0,
  },
  {
    key: 'ContactIcon',
    name: 'Contact Icon',
    editorType: 'ContactIcon',
    displayType: 'ContactIcon',
  },
  {
    key: 'Youtube',
    name: 'Youtube Video',
    editorType: 'wYoutube',
    displayType: 'wYoutube',
    property: 'videoId',
    videoId: '',
  },
  {
    key: 'ImageNavigation',
    name: 'Image Navigation',
    displayType: 'ImageNavigation',
    editorType: 'Colours',
    reversed: false,
    imageCaption: { text: '', href: '', type: 'page' },
    links: [],
    image: {
      imageId: '',
      crop: {},
    },
  },
  ...options.components,
];

export { Components };
