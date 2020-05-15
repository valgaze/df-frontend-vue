<template>
  <section>
    <div
      class="nes-dialog"
      id="dialog-settings"
      :class="{ 'is-dark': darkmode }"
    >
      <form method="dialog" class="settings" name="builder">
        <p class="title">Request Builder</p>

        <div>
          Type
          <label>
            <input
              type="radio"
              class="nes-radio"
              name="answer"
              value="yes"
              v-model="isEvent"
              :class="{ 'is-dark': darkmode }"
            />
            <span>Event</span>
          </label>

          <label>
            <input
              type="radio"
              class="nes-radio"
              value="no"
              name="answer"
              v-model="isEvent"
              :class="{ 'is-dark': darkmode }"
            />
            <span>Text</span>
          </label>
        </div>

        <label v-show="codeActive">
          <input
            type="checkbox"
            class="nes-checkbox"
            v-model="transformgrpc"
            :class="{ 'is-dark': darkmode }"
          />
          <span
            >Transform JSON (<span class="nes-text is-error"
              >in snippet below</span
            > </span
          >)
        </label>

        <label>
          <input
            type="checkbox"
            class="nes-checkbox"
            v-model="enforceStrictJSON"
            :class="{ 'is-dark': darkmode }"
          />
          <span>Enforce Valid JSON (keys need quotes)</span>
        </label>

        <div class="nes-container with-title" :class="{ 'is-dark': darkmode }">
          <h3 class="title">{{ eventActive ? "Event" : "Text" }}</h3>

          <div class="code" v-show="codeActive">
            <label for="textarea_field"
              >Request (JSON)
              {{ transformgrpc ? "[JSON transformed to Protostruct]" : "" }}
            </label>
            <textarea
              v-model="requestBlock"
              ref="json_field"
              class="json nes-textarea"
            >
            </textarea>
          </div>

          <div class="content-wrap" v-show="!codeActive">
            <div class="nes-field is-inline" v-if="eventActive">
              <label for="inline_field">Event name</label>
              <input
                type="text"
                class="nes-input"
                placeholder="Welcome"
                v-model="eventName"
              />
            </div>

            <div class="nes-field is-inline" v-if="!eventActive">
              <label for="inline_field">Message</label>
              <input
                type="text"
                class="nes-input"
                placeholder="hi bot"
                v-model="textMessage"
              />
            </div>
            <div class="nes-field is-inline separator" v-if="eventActive">
              <label for="inline_field">Event Parameters (JSON)</label>
              <textarea
                class="nes-textarea"
                placeholder='{a:1,b:"hi",c:[3,4,5]}'
                v-model="eventParameters"
                ref="eventParametersRef"
              ></textarea>
            </div>

            <div class="nes-field is-inline">
              <label for="inline_field"
                ><a
                  href="https://cloud.google.com/dialogflow/docs/reference/language"
                  target="_blank"
                  >Language Code</a
                ></label
              >
              <div class="nes-select">
                {{ activeLanguage }}
                <select required id="default_select" v-model="activeLanguage">
                  <option value="" disabled selected hidden>Select...</option>
                  <option
                    v-for="(language, idx) in languageCodes"
                    :value="language"
                    :key="idx"
                    >{{ language }}</option
                  >
                </select>
              </div>
            </div>

            <div class="nes-field is-inline separator">
              <label for="inline_field">Request Data (JSON)</label>
              <textarea
                class="nes-textarea"
                placeholder='{a:1,b:"hi",c:[3,4,5]}'
                v-model="requestData"
                ref="requestDataRef"
              ></textarea>
            </div>
            <div class="nes-field is-inline separator">
              <label for="inline_field" @click="genSession">Session</label>
              <input
                type="text"
                class="nes-input"
                placeholder="123456789"
                v-model="session"
              />
            </div>
          </div>

          <menu class="dialog-menu">
            <button @click="copy" class="nes-btn is-primary" v-if="!codeActive">
              Copy
            </button>
            <button
              @click="codeActive = false"
              class="nes-btn is-warning"
              v-if="codeActive"
            >
              Back
            </button>
            <button @click="send" class="nes-btn is-primary">
              Send
            </button>
          </menu>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
// todo "live" update of animate prop change, stop animating or start animating

const requestTemplate = `{
	"session": "1234567890987",
	"queryInput": {
		"text": {
			"text": "yes",
			"languageCode": "en-us"
		}
	},
	"queryParams": {
		"payload": {}
	}
}`;
export default {
  name: "request",
  mounted() {},
  computed: {},
  watch: {
    codeActive() {},
    eventParameters(newVal) {
      if (this.enforceStrictJSON) {
        this.verifyJSON(newVal, this.$refs.eventParametersRef);
      }
    },
    requestData(newVal) {
      if (this.enforceStrictJSON) {
        this.verifyJSON(newVal, this.$refs.requestDataRef);
      }
    },
    grpc(newVal) {
      this.transformgrpc = Boolean(newVal);
    },
    transformgrpc(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.requestBlock = JSON.stringify(this.buildReq(), undefined, 4);
      }
    },
    defaultSession(newVal) {
      if (newVal) {
        this.session = newVal;
      }
    },
    isEvent(newVal) {
      if (newVal === "no") {
        this.eventActive = false;
        this.textActive = true;
      } else {
        this.eventActive = true;
      }
    },
    selectedCode: {
      immediate: true,
      handler: function(val) {
        this.activeLanguage = val;
      },
    },
  },

  data() {
    return {
      enforceStrictJSON: true,
      textActive: false,
      eventName: "",
      eventParameters: JSON.stringify({ a: 1, b: 2 }),
      requestData: JSON.stringify({ a: 1, b: 2 }),
      textMessage: "",
      activeLanguage: this.selectedCode,
      eventActive: false,
      isEvent: "no",
      transformgrpc: this.grpc,
      codeActive: false,
      requestBlock: requestTemplate,
      session: this.defaultSession,
    };
  },
  methods: {
    send() {
      const req = this.buildReq();
      this.$emit("boom", { request: req });
    },
    verifyJSON(value, ref) {
      // Carol Skelly's wonderful zero-dependency JSON linter: https://medium.com/wdstack/vue-json-lint-4d665671e993
      // reset error
      let jsonerror = "";
      let jsonValue = "";
      try {
        // try to parse
        jsonValue = JSON.parse(value);
      } catch (e) {
        jsonerror = JSON.stringify(e.message);
        var textarea = ref;
        if (jsonerror.indexOf("position") > -1) {
          // highlight error position
          var positionStr = jsonerror.lastIndexOf("position") + 8;
          var posi = parseInt(
            jsonerror.substr(positionStr, jsonerror.lastIndexOf('"'))
          );
          if (posi >= 0) {
            textarea.setSelectionRange(posi, posi + 1);
          }
        }
        return "";
      }
      // we may want to think about this
      return JSON.stringify(jsonValue, null, 2);
    },
    _json2proto(input) {
      // TODO: replace w/ pb-util w/ lib
      return input;
    },
    genSession() {
      // TODO: replace w/ lib
      this.session = String(Math.random()).slice(2);
    },

    _buildEvent() {
      const payload = {
        kind: "event",
        content: {
          name: this.eventName,
          parameters: this.eventParameters
            ? JSON.parse(this.eventParameters)
            : {},
          languageCode: this.activeLanguage,
        },
        requestData: this.requestData ? JSON.parse(this.requestData) : {},
        flags: {
          transformgrpc: this.transformgrpc,
        },
      };
      return payload;
    },
    _buildTxt() {
      const payload = {
        kind: "text",
        content: this.textMessage,
        requestData: this.requestData ? JSON.parse(this.requestData) : {},
        flags: {
          transformgrpc: this.transformgrpc,
        },
      };
      return payload;
    },
    buildReq() {
      let req = {};
      if (this.eventActive) {
        req = this.client.buildRequest(this._buildEvent());
      } else {
        req = this.client.buildRequest(this._buildTxt());
      }
      return req;
    },
    copy() {
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      // TODO: Thought this was fixed w/ v-show...
      if (isSafari) {
        alert(
          `There's some bug affecting only safari when switching elements in a modal. Just select all on the next prompt`
        );
        prompt(
          "Select all to copy/paste request data",
          JSON.stringify(this.buildReq(), undefined, 4)
        );
      } else {
        this.codeActive = true;
        this.requestBlock = JSON.stringify(this.buildReq(), undefined, 4);
      }
    },
  },
  props: {
    client: {},
    selectedCode: {
      type: String,
      default: () => "en-US",
    },
    defaultSession: {
      type: String,
    },
    msg: {
      type: String,
      default: () => "DF-CHEATCODES",
    },
    darkmode: {
      type: Boolean,
      default: () => false,
    },
    animate: {
      type: Boolean,
      default: () => true,
    },
    grpc: {
      type: Boolean,
      default: () => true,
    },
    languageCodes: {
      type: Array,
      default: () => [
        "zh-HK",
        "zh-CN",
        "zh-TW",
        "da",
        "nl",
        "en",
        "en-AU",
        "en-CA",
        "en-GB",
        "en-IN",
        "en-US",
        "fr",
        "fr-CA",
        "fr-FR",
        "de",
        "hi",
        "id",
        "it",
        "ja",
        "ko",
        "no",
        "pl",
        "pt-BR",
        "pt",
        "ru",
        "es",
        "es-419",
        "es-ES",
        "sv",
        "th",
        "tr",
        "uk",
      ],
    },
  },
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
}
.separator {
  margin-top: 2%;
}

.json {
  height: 17rem;
}
</style>
