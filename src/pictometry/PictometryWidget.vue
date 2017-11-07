<template>
  <div class="mb-root row collapse"
       id="mb-root"
       :style="styleObject"
  >
    <div id="pict-container"
         :class="this.pictContainerClass"
    >
      <iframe
        id="pictometry-ipa"
        src="#"
        ref="pictometryIpa"
      />
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const data = {
        'apiKey': null,
        'secretKey': null,
        styleObject: {
          'position': 'relative',
          // 'top': '86px',
          // 'overflow-y': 'auto',
          'width': '100%',
          'height': '100%'
          // 'height': null
        }
      };
      return data;
    },
    created() {
      this.$IFRAME_ID = 'pictometry-ipa';
      this.apiKey = this.$config.pictometrySite.apiKey;
      this.secretKey = this.$config.pictometrySite.secretKey;
    },
    mounted() {
      // fetch pictometry ipa script
      const scriptUrl = 'https://pol.pictometry.com/ipa/v1/embed/host.php' + '?apikey=' + this.apiKey;
      const self = this;
      $.getScript(scriptUrl, self.init);
      window.addEventListener('resize', this.handleWindowResize);
      this.handleWindowResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleWindowResize);
    },
    computed: {
      cyclomediaActive() {
        return this.$store.state.cyclomedia.active;
      },
      pictContainerClass() {
        if (this.cyclomediaActive) {
          return 'large-8 columns mb-panel';
        } else {
          return 'large-24 columns mb-panel';
        }
      },
      center() {
        // return this.$store.state.map.center;
        const parameterString = window.location.search;
        const parameters = parameterString.split('&');
        // console.log('parameterString', parameterString, 'parameters', parameters[0].substring(1), parameters[1]);
        const center = {
          lat: parseFloat(parameters[0].substring(1)),
          lng: parseFloat(parameters[1])
        }
        return center;
      },
      pictZoom() {
        return this.$store.state.map.zoom + 2;
      },
    },
    methods: {
      init() {
        // construct signed url
        const d = new Date();
        const t = Math.floor(d.getTime() / 1000);
        const unsignedUrl = 'https://pol.pictometry.com/ipa/v1/load.php' + "?apikey=" + this.apiKey + "&ts=" + t;
        const hash = md5(unsignedUrl, this.secretKey);
        const iframeId = this.$IFRAME_ID;
        const signedUrl = unsignedUrl + "&ds=" + hash + "&app_id=" + iframeId;

        // set the iframe src to load the IPA
        const iframe = this.$refs.pictometryIpa;
        // REVIEW can we bind this to a computed instead?
        iframe.setAttribute('src', signedUrl);

        // create pictometry host
        const ipa = this.$ipa = new PictometryHost(iframeId, 'https://pol.pictometry.com/ipa/v1/load.php');
        this.$store.commit('setPictometryIpa', ipa);
        ipa.ready = this.ipaReady;
      },
      ipaReady() {
        this.$ipa.setLocation({
          y: this.center.lat,
          x: this.center.lng,
          zoom: this.pictZoom
        });
      },
      handleWindowResize() {
        const rootElement = document.getElementById('application');
        const rootStyle = window.getComputedStyle(rootElement);
        const rootHeight = rootStyle.getPropertyValue('height');
        const rootHeightNum = parseInt(rootHeight.replace('px', ''));
        const topicsHeight = rootHeightNum - 76;
        // console.log('handleWindowResize is running, rootElement:', rootElement, 'rootStyle', rootStyle, 'rootHeight:', rootHeight, 'rootHeightNum', rootHeightNum);
        this.styleObject.height = topicsHeight.toString() + 'px';
        // this.styleObject.height = '100%';
      }
    }, // end of methods




  }; // end of export

</script>


<style scoped>
/*header.site-header > .row:last-of-type {
  background: #2176d2;
}
*/

/*#application {
  height: 90%;
}*/

#mb-root {
  height: 100%;
}

#pict-container {
  padding: 0px;
  height: 100%;
}

#pictometry-ipa {
  height: 100%;
  width: 100%;
}
/*
#search-container {
    float: right;
}

#search-input {
    float: left;
    width: 400px;
}

#search-button {
    height: 2.78571rem;
}

#data-panel {
    background: #fff;
    padding-left: 12px;
    padding-right: 12px;
    height: 100%;
}

.data-row {
    padding: 10px;
    margin-bottom: 10px;
    display: none;
}

.data-row table th, .data-row table td {
    font-size: 15px;
}

.data-row table tr th {
    text-align: left;
    vertical-align: top;
}

#map {
    height: 100%;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

img { max-width: inherit; }*/


</style>
