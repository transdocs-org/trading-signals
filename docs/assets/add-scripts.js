const scripts = [
  {
    src: 'https://cdn.jsdmirror.com/gh/transdocs-org/cdn/transdocs-info-modal.js',
    defer: true
  },
  {
    src: 'https://hm.baidu.com/hm.js?2fe1095387fd2f2c25892a4fde2f0cc2',
    async: true
  },
];

function addScriptsToPage() {
  scripts.forEach(scriptConfig => {
    const script = document.createElement('script');
    script.src = scriptConfig.src;

    if (scriptConfig.defer) {
      script.defer = true;
    }

    if (scriptConfig.async) {
      script.async = true;
    }

    document.head.appendChild(script);
  });
}

addScriptsToPage();