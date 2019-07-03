<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="toggleDark">
          <v-list-tile-action>
            <v-icon>
              {{ this.$store.state.dark ? 'wb_sunny' : 'wb_cloudy' }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              v-text="this.$store.state.dark ? 'Light Mode' : 'Dark Mode'"
            />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title>Ctrl, Alt, Delete</v-toolbar-title>
    </v-toolbar>
  </v-content>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'fas fa-newspaper',
          title: 'News',
          to: '/'
        },
        {
          icon: 'fas fa-bullhorn',
          title: 'Politics',
          to: '/politics'
        },
        {
          icon: 'fas fa-handshake',
          title: 'Business',
          to: '/business'
        },
        {
          icon: 'fas fa-flask',
          title: 'Science',
          to: '/science'
        },
        {
          icon: 'fas fa-film',
          title: 'Culture',
          to: '/culture'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      toggleDark: 'toggleDark'
    })
  }
}
</script>
