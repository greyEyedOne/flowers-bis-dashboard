<template>
  <div>
    <ol>
      <li>
        <h2>Progress Made</h2>
        <h3>Completed Features</h3>
        <ul class="list-style-type-none">
          <li>✅ Basic Nuxt 3 setup with TypeScript</li>
          <li>✅ Chart.js bar chart rendering</li>
          <li>Q3 data handled with the ability to switch the question</li>
          <li>
            ✅ Company size and Industry multi-select filter with checkboxes
          </li>
          <li>✅ Data aggregation logic using pandas-js + custom functions</li>
        </ul>
        <h3>Partially Working</h3>
        ⚠️ Chart re-renders with filter changes but has flickering bug ⚠️
        Multi-select for Quarter is absent
        <h3>Not Started</h3>
        <ul class="list-style-type-none">
          <li>❌ Quarter multi-select filtering</li>
          <li>❌ Loading states and error handling</li>
          <li>❌ Responsive design optimization</li>
          <li></li>
        </ul>
        <h3>Time Spent</h3>
        <ol>
          <li>
            Hours 1-3: Nuxt setup + TypeScript + data binding (took longer due
            to pandas-js quirks). Chart.js integration (~45 min with AI
            assistance)
          </li>
          <li>Hour 4: Chart component with static data</li>
          <li>Hour 5: Data processing with AI</li>
          <li>Hour 6: Bug fixing + documentation</li>
        </ol>
      </li>
      <li>
        <h2>Prioritization Decisions</h2>
        <h3>Why I chose Q3 data:</h3>
        <p>
          In general, data in all 3 questions has there were issues what means
          if I solve one if I solve one, I can solve the rest. I chose Q3
          because it's interesting for me to see the dark side of a product.
          It's a kind of way to be more familiar with it, to see that
          constraints and trade-offs. And it's way to grow.
        </p>
        <h3>What you focused on first and why</h3>
        <p>
          Firstly I tried to check the solution from the task but I met many
          issues and was forced to change my way. Then I started to build
          useHubspotData.ts composable. When I've got the first data entry what
          I needed I was happy and moved forward with enthusiasm.
        </p>
        <h3>Trade-offs you made given time constraints</h3>
        <ul>
          <li>
            It's definitely design. As a Software Engineer with Frontend focus I
            wanted to create user-friendly interface.
          </li>
          <li>
            Also I invested less time to reading documentation and more to
            interaction with AI (as I describe it below, I'm not sure it was a
            good decision).
          </li>
          <li>I didn't complete the code refactoring</li>
          <li>Create code documentation (comments etc.)</li>
        </ul>
      </li>
      <li>
        <h2>Next Steps</h2>
        <p>
          Concrete next features you'd implement How you'd improve what you
          built What you'd refactor
        </p>
        <ul>
          <li>move tipes to separate file and make them general</li>
          <li>to find another library instead of experimental pandas-js</li>
          <li>
            take care about UI, responsiveness and mobile/tablets implementation
          </li>
        </ul>
      </li>
      <li>
        <h2>Challenges & Solutions</h2>
        <h3>
          Technical blockers you encountered and how you solved them (or didn't)
        </h3>
        <ul>
          <li>
            Importing/serving data.json was tricky, so I wasted a lot of time
            here.
            <p>
              <b>Temporary solution:</b> import hubspotData from
              "../../server/api/data.json";
            </p>
          </li>
          <li>
            pandas-js lacks several Pandas (Python) methods. Unfortunately I
            didn't see it fast and lost some time.
            <p><b>Solution:</b> created custom function instead with AI</p>
          </li>
          <li>
            TypeScript implementation
            <p>
              <b>Temporary solution:</b> use interfaces in each file separately
            </p>
          </li>
        </ul>
        <h3>What you learned</h3>
        <ul>
          <li>
            I've learned next time I'd like to do a small steps one by one, I'll
            use static data first and will test the code with it and only later
            I'll use import or something else (if I couldn't perform it fast)
          </li>
          <li>
            I have to invest more time to plan my time when create a new
            features
          </li>
          <li>
            AI assistant is good only when I know exactly what I want. It's not
            so good idea to copy the whole code snippets what it does from the
            scratch
          </li>
        </ul>
      </li>
      <li>
        <h2>Technical Decisions</h2>
        <h3>Component architecture choices</h3>
        <p>
          Separation of concerns. The /index page orchestrates state and passes
          it down. FilterPanel.vue owns only the multi-select UI (via v-model).
          ChartComponent.vue is a thin renderer: it creates a Chart.js instance
          on mount and updates it via a watch when the config changes. Data
          transformation in a composable. useHubspotData.ts converts raw rows
          into { labels, values, title, subtitle } and assembles the Chart.js
          config—keeping aggregation separate from the UI. SSR-safe charting.
          Chart.js is loaded with await import('chart.js/auto') inside onMounted
          to avoid SSR errors and unnecessary server bundles. Why this way? Fast
          MVP with clear boundaries—filters ↔ transform ↔ render—so the data
          source or charting library can be swapped without rewriting the UI.
        </p>
        <h3>State management approach</h3>
        <p>
          Local state + Composition API. Filters are stored as ref
          &lt;FilterState&gt; in index.vue; the chart config is a computed value
          derived from filters and the selected question. FilterPanel
          communicates with the page via v-model (emitting update:modelValue).
          No global store (yet). Pinia was intentionally skipped: small scope,
          single page, speed mattered. Trade-offs. Simple and transparent for a
          small scope; downside is no cross-page sync/persistence. Next: move
          filters and the selected question into Pinia to share between / and
          /about and persist to localStorage.
        </p>
        <h3>Libraries used and alternatives considered</h3>
        <p>
          I used pandas-js, Chart.js as it was required in the task description.
          Nuxt 4 was installed when I performen task tutorial steps. I desided
          to use it, because the difference in not critical. Vue 3 — Composition
          API
        </p>
      </li>
    </ol>
  </div>
</template>

<style>
:root {
  font-family: "Courier New", Courier, monospace;
}
ul.list-style-type-none {
  list-style-type: none;
}
</style>
