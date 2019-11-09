<template>
  <div>
    <h1>Resources / Credits</h1>
    <p>The following websites were used as resources for this project.</p>
    <ul>
      <li>
        https://thehistoryofbyzantium.com/
        <ul>
          <li>A great resource covering the entire history of the Byzantine Empire in great detail</li>
        </ul>
      </li>
      <li>
        http://www.ict.griffith.edu.au/wiseman/Roman/19Maps.html
        <ul>
          <li>A detailed description of the Roman Empire in 19 maps</li>
        </ul>
      </li>
      <li>
        http://www.thelatinlibrary.com/imperialism/notes/byzantinechron.html
        <ul>
          <li>A chronological high-level overview of the Byzantine Empire</li>
        </ul>
      </li>
      <li>
        https://www.keene.edu/campus/maps/tool/
        <ul>
          <li>Tool used to generate polygon shapes on the map</li>
        </ul>
      </li>
    </ul>
    <slot>Test</slot>
  </div>
</template>

<style lang="scss" scoped>
li {
  padding: 3px 0;
}
</style>