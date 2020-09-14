// global components
Vue.component("detail-section", {
  template: `<div class="detail-section">
    <slot name="header"></slot>
    <slot name="body"></slot>
    </div>`,
});

Vue.component("strong-link", {
  props: ["to", "text", "selectedColor"],
  template: `<a :href="to" class="strong-link" @click="onClick" :style="{color:selectedColor}">
        {{text}} <i class="fa fa-chevron-down "></i>
    </a>`,
  methods: {
    onClick: function (e) {
      e.preventDefault();
      this.$emit("onclick");
    },
  },
});

Vue.component("text-smooth", {
  props: ["text"],
  template: `<p class="text-smooth">{{text}}</p>`,
});

Vue.component("paragraph-detail", {
  props: ["title", "detail", "id"],
  template: `<div class="paragraph" :id="id">
    <div class="p-title"><i class="iconic fa fa-paperclip"></i> <span class="sp">{{title}}</span></div>
    <div class="p-detail">{{detail}}</div>
    </div>`,
});

Vue.component("card", {
  props: ["title"],
  template: `<div class="card"><strong>{{title}}</strong><slot></slot></div>`,
});

Vue.component("simple-toast", {
  props: ["message"],
  template: `<div class="simple-toast"><span class="text from-top">{{message}}</span></div>`,
});

// main app components
const SquareMotion = {
  props: {
    nameAnimation: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "70px",
    },
  },
  template: `<div :style="{width:size,height:size}" :class="{ square : true , [nameAnimation] : true }"></div>`,
};

const TypeAnimation = {
  props: ["text"],
  template: `<span class="type-animation" @click="onClick">{{text}}</span>`,
  methods: {
    onClick: function () {
      this.$emit("onclick", this.text);
    },
  },
};

const CircleButton = {
  props: ["icon", "bg", "fg"],
  template: `<button class="circle-button" @click="onclick" :style="getStyles"><i :class="icon"></i></button>`,
  computed: {
    getStyles: function () {
      return `background:${this.bg};color:${this.fg};`;
    },
  },
  methods: {
    onclick: function () {
      this.$emit("onclick");
    },
  },
};

const TemplateCode = {
  props: ["language"],
  template: `<div class="template-code">
        <div class="title title-language">
            <span class="text">{{language}}</span>
            <button class="copy-button" @click="onCopyToClipboard">copy</button>
        </div>
        <div class="preview-code">
            <pre class="format-code">
                <code :class="[language]" ref="code"><slot></slot></code>
            </pre>
        </div>
    </div>`,
  methods: {
    onCopyToClipboard: function () {
      let rangeCopy = document.createRange();
      rangeCopy.selectNode(this.$refs.code);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(rangeCopy);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      this.$emit("copy-click");
    },
  },
};
