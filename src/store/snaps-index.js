const snaps = [
  {
    id: 'connected-grid-router',
    name: 'LimeNET',
    type: 'Gadget Snap',
    author: 'Lime Microsystems',
    price: 0,
    rating: -1,
    category: '',
    description: '',
    preinstalled: true,
  },
  {
    id: 'canonical-pc-linux',
    name: 'Canonical-pc-linux',
    type: 'Kernel Snap',
    author: 'Canonical Ltd',
    price: 0,
    rating: -1,
    category: '',
    description: '',
    preinstalled: true,
  },
  {
    id: 'ubuntu-core',
    name: 'Ubuntu-core',
    type: 'OS Snap',
    author: 'Canonical Ltd',
    price: 0,
    rating: -1,
    category: '',
    description: '',
    preinstalled: true,
  },
  {
    id: 'snapweb',
    name: 'Snapweb',
    type: 'Device Manager',
    author: 'Canonical Ltd',
    price: 0,
    rating: -1,
    category: '',
    description: '',
    preinstalled: true,
  },
  {
    id: 'amarisoft',
    name: 'Amarisoft',
    type: 'Snap',
    author: 'LTE eNodeB',
    price: 'free',
    rating: 9,
    category: 'Telecommunications',
    description: `Access everything with the tools you are already using,
    regardless of the device or platform you are on. Pictures, videos,
    documents, contacts, communications - they are all available right where
    you need them whether they are coming from your local storage or remote
    cloud services.`,
    preinstalled: false,
  },
  // {
  //   id: 'discourse',
  //   name: 'Discourse',
  //   type: 'Snap',
  //   author: 'Byron George',
  //   price: 'free',
  //   rating: 8,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'docker',
  //   name: 'Docker',
  //   type: 'Snap',
  //   author: 'Brett Romero',
  //   price: '$3.99',
  //   rating: 7,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'gitlab',
  //   name: 'GitLab',
  //   type: 'Snap',
  //   author: 'Salvador Miller',
  //   price: 'free',
  //   rating: 9,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'lxd',
  //   name: 'LXD',
  //   type: 'Snap',
  //   author: 'Stephen Ellis',
  //   price: '$1.99',
  //   rating: 10,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'minecraft',
  //   name: 'Minecraft',
  //   type: 'Snap',
  //   author: 'Stanley Griffin',
  //   price: '$0.99',
  //   rating: 9,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'mongodb',
  //   name: 'MongoDB',
  //   type: 'Snap',
  //   author: 'Vicki Mitchell',
  //   price: 'free',
  //   rating: 7,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'nextcloud',
  //   name: 'Nextcloud',
  //   type: 'Snap',
  //   author: 'Mary Dixon',
  //   price: 'free',
  //   rating: 9,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },

  {
    id: 'quortus',
    name: 'Quortus',
    type: 'Snap',
    author: 'Evolved Packed Core',
    price: 'free',
    rating: 9,
    category: 'Networks',
    description: `Access everything with the tools you are already using,
    regardless of the device or platform you are on. Pictures, videos,
    documents, contacts, communications - they are all available right where
    you need them whether they are coming from your local storage or remote
    cloud services.`,
    preinstalled: false,
  },
  // {
  //   id: 'redis',
  //   name: 'Redis',
  //   type: 'Snap',
  //   author: 'Alyssa Gutierrez',
  //   price: '$1.99',
  //   rating: 8,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
  // {
  //   id: 'rocketchat',
  //   name: 'Rocket.Chat',
  //   type: 'Snap',
  //   author: 'Wyatt Sutton',
  //   price: 'free',
  //   rating: 8,
  //   category: 'Databases',
  //   description: `Access everything with the tools you are already using,
  //   regardless of the device or platform you are on. Pictures, videos,
  //   documents, contacts, communications - they are all available right where
  //   you need them whether they are coming from your local storage or remote
  //   cloud services.`,
  //   preinstalled: false,
  // },
]

export const featuredSnaps = [
  'amarisoft',
  'quortus',
  // 'discourse',
  // 'docker',
  // 'gitlab',
  // 'lxd',
  // 'minecraft',
  // 'mongodb',
  // 'nextcloud',
  // 'redis',
  // 'rocketchat',
]

export default snaps
