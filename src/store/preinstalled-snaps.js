const snaps = [
  {
    id: 'canonical-pc-linux',
    name: 'Canonical-pc-linux',
    type: 'Kernel',
    author: 'Canonical Ltd',
    price: 'free',
    rating: -1,
    category: 'kernel',
    interfaces: 'n/a',
    description: 'The generic Ubuntu kernel package',
    size: '128.01MB',
    version: '4.4.0-53-1',
    preinstalled: true,
  },
  {
    id: 'snapweb',
    name: 'Snapweb',
    type: 'device manager',
    author: 'Canonical Ltd',
    price: 'free',
    rating: -1,
    category: 'device manager',
    interfaces: 'network,network-bind,snapd-control,timeserver-control',
    description: "This service allows you to manage your Ubuntu Core device from a web interface or REST API.\n\nFeatures include:\n - manage updates to the system\n - control the state of other snap packages\n - browse the store to install new snap packages",
    size: '4.71MB',
    version: '0.21.2',
    preinstalled: true,
  },
  {
    id: 'ubuntu-core',
    name: 'Ubuntu Core',
    type: 'OS',
    author: 'Canonical Ltd',
    price: 'free',
    rating: -1,
    category: 'OS',
    interfaces: 'core:account-control,core:alsa,core:avahi-observe,core:bluetooth-control,core:browser-support,core:camera,...',
    description: 'The core runtime environment for snapd',
    size: '79.74MB',
    version: '16.04.1',
    preinstalled: true,
  },
  // below, the full interface list for reference
  // interfaces: 'core:account-control,core:alsa,core:avahi-observe,core:bluetooth-control,core:browser-support,core:camera,core:core-support,core:cups-control,core:dcdbas-control,core:docker-support,core:firewall-control,core:fuse-support,core:gsettings,core:hardware-observe,core:home,core:io-ports-control,core:kernel-module-control,core:libvirt,core:locale-control,core:log-observe,core:lxd-support,core:modem-manager,core:mount-observe,core:network,core:network-bind,core:network-control,core:network-manager,core:network-observe,core:network-setup-observe,core:ofono,core:opengl,core:openvswitch,core:openvswitch-support,core:optical-drive,core:physical-memory-control,core:physical-memory-observe,core:ppp,core:process-control,core:pulseaudio,core:raw-usb,core:removable-media,core:screen-inhibit-control,core:shutdown,core:snapd-control,core:system-observe,core:system-trace,core:time-control,core:timeserver-control,core:timezone-control,core:tpm,core:uhid,core:unity7,core:upower-observe,core:x11',
]

export default snaps
