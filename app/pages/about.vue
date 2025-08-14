<template>
  <div>
    <ol>
      <li>
        <h2>Progress Made</h2>
        <h3>Completed Features</h3>
        <ul class="list-style-type-none">
          <li>✅ Basic Nuxt 3 setup with TypeScript</li>
          <li>✅ Chart.js bar chart displaying</li>
          <li>
            ✅ Q3 data handled with opportunity to simply change the quetion
          </li>
          <li>✅ Company size multi-select filter with checkboxes</li>
          <li>✅ Data aggregation logic using pandas-js + custom functions</li>
        </ul>
        <h3>Partially Working</h3>
        <!-- - ⚠️ Chart re-renders with filter changes but has flickering bug
            - ⚠️ Multi-select shows selected count but not individual selections -->
        <h3>Not Started</h3>
        <ul class="list-style-type-none">
          <li>❌ Industry and quarter multi-select filtering</li>
          <li>❌ Loading states and error handling</li>
          <li>❌ Responsive design optimization</li>
          <li></li>
        </ul>
        <h3>Time Spent</h3>
        <ol>
          <li>
            **Hour 1-3**: Nuxt setup + simple TS implementation + data bounding
            (more than 1 hr, there was issues with pandas-js functions) Chart.js
            integration (45 minutes with AI assistance)
          </li>
          <li>**Hour 4**: Chart component with static data</li>
          <li>**Hour 5**: Data processing with AI</li>
          <li>**Hour 6**: Bug fixing + documentation</li>
        </ol>
      </li>
      <li>
        <h2>Prioritization Decisions</h2>
        <h3>Why I chose Q3 data:</h3>
        <p>
          In general, data in all 3 questions has thee same structure what means
          if I solve one I solved. it all. I chose Q3 because it's interesting
          for me to see the "dark side" of a product. It's a kind of way to be
          more familiar with it, to see that boundaries and restrictions. And
          it's way to grow.
        </p>
        <h3>What you focused on first and why</h3>
        <p>
          Firstly I tried to check the solution from the task but I met many
          issues and was forsed to change my way. Then I started to build
          useHubspotData.ts composable. When I've got the first data entry what
          I neeeded I was happy and moved forward with enthusiasm.
        </p>
        <h3>Trade-offs you made given time constraints</h3>
        <ul>
          <li>
            It's definitely design. As a Softtware Engineer with Frontend focus
            I wanted to create user-friendly interface.
          </li>
          <li>
            Also I invested less time to reading documentation and more to
            intetraction with AI (as I describe it below, I'm no sure it was a
            good decision).
          </li>
          <li>I didn't complete the code refactoring</li>
        </ul>
      </li>
      <li>
        <h2>Next Steps</h2>
        <p>
          Concrete next features you'd implement How you'd improve what you
          built What you'd refactor
        </p>
        <ul>
          <li>to move tipes to separate file and make them general</li>
          <li>to find another lybrary instead of expeerimental pandas-js</li>
          <li>
            take care about UI, adaptivity and mobile/tablets implementation
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
            It was hard to import data.json file, so I wasted a lot of time
            here.
            <p>
              <b>Temporary solution:</b> import hubspotData from
              "../../server/api/data.json";
            </p>
          </li>
          <li>
            pandas-js hasn't some pandas (Python) methods. Unfortunately I
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
            I've learned next time I'd like to do a small stemp one by one, I'll
            use stattic data first and will test the code with it and only later
            I'll use import or something else (if I couldn't perform it fast)
          </li>
          <li>
            I have to invest more time to plan my time when create a new
            features
          </li>
          <li>
            AI assisant is good only when I know exactly what I want. It's not
            so good idea to copy the whole code snippets what it does from the
            scratch
          </li>
        </ul>
      </li>
      <li>
        <h2>Technical Decisions</h2>
        <h3>Component architecture choices</h3>
        <p></p>
        <h3>State management approach</h3>
        <p></p>
        <h3>Libraries used and alternatives considered</h3>
        <p>
          I used pandas-js, chart-js as it was required in the task description.
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
