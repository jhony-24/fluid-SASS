Vue.component('detail-section', {
    template: `<div class="detail-section">
    <slot name="header"></slot>
    <slot name="body"></slot>
    </div>`
});

Vue.component('strong-link', {
    props: ['to', 'text', 'selectedColor'],
    template: `<a :href="to" class="strong-link" @click="onClick" :style="{color:selectedColor}">
        {{text}} <i class="fa fa-chevron-down "></i>
    </a>`,
    methods: {
        onClick: function () {
            this.$emit("onclick");
        }
    }
})

Vue.component('text-smooth', {
    props: ['text'],
    template: `<p class="text-smooth">{{text}}</p>`
});

Vue.component('paragraph-detail', {
    props: ['title', 'detail', 'id'],
    template: `<div class="paragraph" :id="id">
    <div class="p-title"><span class="sp">{{title}}</span></div>
    <div class="p-detail">{{detail}}</div>
    </div>`
});

//self app
const Square = {
    props: {
        nameAnimation: {
            type: String,
            default: 'default'
        }
    },
    template: `<div :class="{ square : true , [nameAnimation] : true }"></div>`
}

const TypeAnimation = {
    props: ["text"],
    template: `<span class="type-animation" @click="onClick">{{text}}</span>`,
    methods: {
        onClick: function () {
            this.$emit("onclick", this.text);
        }
    }
}